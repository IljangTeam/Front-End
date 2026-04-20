"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

export interface LoginFormData {
  email: string;
  password: string;
}

export function useLoginFormData() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({ mode: "onTouched" });

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const onSubmit = (data: LoginFormData) => {
    console.log(`이메일: ${data.email}, 비밀번호: ${data.password}`);
    router.push("/");
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isValid,
    showPassword,
    togglePasswordVisibility,
  };
}
