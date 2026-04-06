"use client";

import { useState } from "react";

// ===== hook =====
import { useLoginFormData } from "../model/useLoginFormData";

// ===== ui components =====
import {
  AuthInputComponent as LoginInput,
  AuthSubmitButton as SubmitButton,
} from "./LoginComponents";

export default function LoginView() {
  const {
    form,
    updateEmail,
    updatePassword,
    handleSubmit,
    isValid,
    showPassword,
    togglePasswordVisibility,
  } = useLoginFormData();

  return (
    <div className="flex flex-col justify-center items-center min-w-[374.667px]">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-between items-center min-w-full gap-3"
      >
        <LoginInput
          title="이메일"
          placeholder="example@email.com"
          onChange={(e) => updateEmail(e.target.value)}
          value={form.email === "" ? undefined : form.email}
        />
        <LoginInput
          title="비밀번호"
          placeholder="비밀번호 입력"
          type={showPassword ? "text" : "password"}
          onChange={(e) => updatePassword(e.target.value)}
          value={form.password === "" ? undefined : form.password}
          suffix={
            <button type="button" onClick={togglePasswordVisibility}>
              {showPassword ? (
                "숨기기"
              ) : (
                <img src="/assets/password-hide.svg" alt="비밀번호 보기" />
              )}
            </button>
          }
        />
        <span className="text-[var(--color-text-tertiary)] text-right font-['Pretendard_Variable'] text-[12px] right font-medium leading-[18px] underline w-full cursor-pointer">
          비밀번호를 잊으셨나요?
        </span>

        <SubmitButton contents="이메일로 로그인" />
      </form>
    </div>
  );
}
