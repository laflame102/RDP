"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { LoginForm } from "./components/LoginForm";
import { useLogin } from "@/hooks/useAuth";

interface LoginFormData {
  email: string;
  password: string;
}

export default function Login() {
  const router = useRouter();
  const login = useLogin();

  const handleLogin = async (data: LoginFormData) => {
    try {
      await login.mutateAsync(data);

      router.push("/");
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <LoginForm
          onSubmit={handleLogin}
          isLoading={login.isPending}
          error={login.error?.message}
        />
      </div>
    </div>
  );
}
