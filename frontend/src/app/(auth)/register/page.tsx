"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { RegisterForm } from "./components/RegisterForm";
import { useRegister } from "@/hooks/useAuth";
import { RegisterFormData } from "@/types/auth";

export default function Register() {
  const router = useRouter();
  const register = useRegister();

  const handleRegister = async (data: RegisterFormData) => {
    try {
      await register.mutateAsync(data);

      router.push("/");
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="relative w-full max-w-md">
        <RegisterForm
          onSubmit={handleRegister}
          isLoading={register.isPending}
          error={register.error?.message}
        />
      </div>
    </div>
  );
}
