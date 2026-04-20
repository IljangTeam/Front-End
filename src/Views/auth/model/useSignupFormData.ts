"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

export interface SignupFormData {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export function useSignupFormData() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<SignupFormData>({ mode: "onTouched" });

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const onSubmit = (data: SignupFormData) => {
    console.log(
      `이름: ${data.name}, 이메일: ${data.email}, 비밀번호: ${data.password}`,
    );
    router.push("/");
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    watch,
    errors,
    isValid,
    showPassword,
    togglePasswordVisibility,
  };
}
