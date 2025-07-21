import React from "react";
import { useForm } from "react-hook-form";

import Input from "@/components/ui/Input";
import Link from "next/link";
import SignUp from "@/components/icons/SignUp";
import Button from "@/components/ui/Button";
import { RegisterData } from "@/types/auth";

interface RegisterFormProps {
  onSubmit: (data: Omit<RegisterData, "confirmPassword">) => void;
  isLoading?: boolean;
  error?: string;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  onSubmit,
  isLoading = false,
  error,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<RegisterData>({
    mode: "onChange",
  });

  const password = watch("password");

  const handleFormSubmit = (data: RegisterData) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...registerData } = data;
    onSubmit(registerData);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <SignUp />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Create Account
          </h1>
          <p className="text-gray-600">Join the Recipe Discovery Platform</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <div className="flex flex-col gap-6">
          <Input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Please enter a valid email address",
              },
            })}
            type="email"
            label="Email Address"
            placeholder="Enter your email"
            error={errors.email?.message}
            autoComplete="email"
            required
          />

          <Input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            label="Password"
            placeholder="Create a password"
            error={errors.password?.message}
            autoComplete="new-password"
            required
          />

          <Input
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) => {
                if (value !== password) {
                  return "Passwords do not match";
                }
                return true;
              },
            })}
            label="Confirm Password"
            placeholder="Confirm your password"
            error={errors.confirmPassword?.message}
            autoComplete="new-password"
            required
          />

          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Password Requirements:
            </p>
            <ul className="text-xs text-gray-600 space-y-1">
              <li
                className={`flex items-center ${
                  password && password.length >= 6 ? "text-green-600" : ""
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-current mr-2 opacity-60"></span>
                At least 6 characters long
              </li>
              <li
                className={`flex items-center ${
                  password && /(?=.*[a-z])/.test(password)
                    ? "text-green-600"
                    : ""
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-current mr-2 opacity-60"></span>
                One lowercase letter
              </li>
              <li
                className={`flex items-center ${
                  password && /(?=.*[A-Z])/.test(password)
                    ? "text-green-600"
                    : ""
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-current mr-2 opacity-60"></span>
                One uppercase letter
              </li>
              <li
                className={`flex items-center ${
                  password && /(?=.*\d)/.test(password) ? "text-green-600" : ""
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-current mr-2 opacity-60"></span>
                One number
              </li>
            </ul>
          </div>

          <Button
            type="button"
            isLoading={isLoading}
            disabled={!isValid}
            className="w-full"
            onClick={handleSubmit(handleFormSubmit)}
          >
            Create Account
          </Button>
        </div>

        <div className="mt-8 text-center flex items-center justify-center gap-1">
          <p className="text-gray-600">Already have an account?</p>
          <Link href="/login" className="text-orange-600 hover:text-orange-700">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};
