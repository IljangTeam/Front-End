"use client";

import { useState } from "react";

// ===== hook =====
import { useSignupFormData } from "../model/useSignupFormData";
// ===== ui components =====
import {
  AuthInputComponent as LoginInput,
  AuthSubmitButton as SubmitButton,
} from "./LoginComponents";

type SignupFormData = {
  name: string;
  email: string;
  password: string;
};

export default function SignupView() {
  const {
    form,
    updateName,
    updateEmail,
    updatePassword,
    updatePasswordConfirm,
    handleSubmit,
    showPassword,
    togglePasswordVisibility,
  } = useSignupFormData();

  return (
    <div className="flex flex-col justify-center items-center min-w-[374.667px]">
      {/* auth input, submit wrapper */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-between items-center min-w-full gap-[24px]"
      >
        <div className="flex flex-col items-center w-full h-full gap-[12px]">
          <LoginInput
            title="이름"
            placeholder="홍길동"
            type="text"
            onChange={(e) => updateName(e.target.value)}
            value={form.name === "" ? undefined : form.name}
          />
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
          <LoginInput
            title="비밀번호 확인"
            placeholder="비밀번호를 한 번 더 입력해주세요"
            type="password"
            onChange={(e) => updatePasswordConfirm(e.target.value)}
          />
        </div>

        <div className="flex flex-col w-full gap-[12px]">
          <SubmitButton contents="이메일로 가입하기" />
          <span className="text-[var(--color-text-tertiary)] font-['Pretendard_Variable'] text-center text-[11px] font-normal leading-[17.6px] underline">
            가입 시 각할모의 이용약관과 개인정보처리방침에 동의하는 것으로
            간주됩니다.
          </span>
        </div>
      </form>
    </div>
  );
}
