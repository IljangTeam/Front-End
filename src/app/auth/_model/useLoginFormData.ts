// features/auth/_model/useLoginFormData.ts
"use client";

import { useState, FormEvent } from "react";

interface LoginFormData {
  email: string;
  password: string;
}

export function useLoginFormData() {
  const [form, setForm] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const updateEmail = (value: string) => {
    setForm((prev) => ({ ...prev, email: value }));
  };

  const updatePassword = (value: string) => {
    setForm((prev) => ({ ...prev, password: value }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.email && form.password) {
      console.log(`이메일: ${form.email}, 비밀번호: ${form.password}`);
    }
  };

  const isValid = Boolean(form.email && form.password);

  return {
    form,
    updateEmail,
    updatePassword,
    handleSubmit,
    isValid,
    showPassword,
    togglePasswordVisibility,
  };
}
