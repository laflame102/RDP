import SignIn from "@/components/icons/SignIn";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { LoginData } from "@/types/auth";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";

interface LoginFormProps {
  onSubmit: (data: LoginData) => void;
  isLoading?: boolean;
  error?: string;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  isLoading = false,
  error,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginData>({
    mode: "onChange",
  });

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <SignIn />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600">
            Sign in to your Recipe Discovery Platform account
          </p>
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
            placeholder="Enter your password"
            error={errors.password?.message}
            autoComplete="current-password"
            required
          />

          <Button
            type="button"
            isLoading={isLoading}
            disabled={!isValid}
            className="w-full"
            onClick={handleSubmit(onSubmit)}
          >
            Sign In
          </Button>
        </div>

        <div className="mt-8 text-center flex items-center justify-center gap-1">
          <p className="text-gray-600">Don&apos;t have an account?</p>
          <Link
            href="/register"
            className="text-orange-600 hover:text-orange-700"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};
