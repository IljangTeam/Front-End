// features/auth/_model/useSignupFormData.ts
"use client";

import { useState, FormEvent } from "react";

interface SignupFormData {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export function useSignupFormData() {
  const [form, setForm] = useState<SignupFormData>({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const updateName = (value: string) => {
    setForm((prev) => ({ ...prev, name: value }));
  };

  const updateEmail = (value: string) => {
    setForm((prev) => ({ ...prev, email: value }));
  };

  const updatePassword = (value: string) => {
    setForm((prev) => ({ ...prev, password: value }));
  };

  const updatePasswordConfirm = (value: string) => {
    setForm((prev) => ({ ...prev, passwordConfirm: value }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const togglePasswordConfirmVisibility = () => {
    setShowPasswordConfirm((prev) => !prev);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValid) {
      console.log("모든 필드를 입력해주세요.");
      return;
    }

    if (!isPasswordMatch) {
      console.log("비밀번호가 일치하지 않습니다.");
      return;
    }

    console.log(
      `이름: ${form.name}, 이메일: ${form.email}, 비밀번호: ${form.password}`,
    );
    // TODO: API 호출
  };

  const isValid = Boolean(
    form.name && form.email && form.password && form.passwordConfirm,
  );
  const isPasswordMatch = form.password === form.passwordConfirm;

  return {
    form,
    updateName,
    updateEmail,
    updatePassword,
    updatePasswordConfirm,
    handleSubmit,
    isValid,
    isPasswordMatch,
    showPassword,
    showPasswordConfirm,
    togglePasswordVisibility,
    togglePasswordConfirmVisibility,
  };
}
