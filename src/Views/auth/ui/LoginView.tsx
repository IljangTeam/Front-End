"use client";

// ===== hook =====
import { useLoginFormData } from "../model/useLoginFormData";

// ===== ui components =====
import {
  AuthInputComponent as LoginInput,
  AuthSubmitButton as SubmitButton,
} from "./LoginComponents";
import {
  LOGIN_INPUT_CONTENTS,
  LOGIN_FIND_PASSWORD,
  LOGIN_SUBMIT_BUTTON,
} from "./auth.constant";

export default function LoginView() {
  const {
    register,
    handleSubmit,
    errors,
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
          title={LOGIN_INPUT_CONTENTS.email.title}
          placeholder={LOGIN_INPUT_CONTENTS.email.placeholder}
          type="email"
          {...register("email", {
            required: "이메일을 입력해주세요",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "올바른 이메일 형식을 입력해주세요",
            },
          })}
          error={errors.email?.message}
        />
        <LoginInput
          title={LOGIN_INPUT_CONTENTS.password.title}
          placeholder={LOGIN_INPUT_CONTENTS.password.placeholder}
          type={showPassword ? "text" : "password"}
          {...register("password", {
            required: "비밀번호를 입력해주세요",
            minLength: {
              value: 8,
              message: "비밀번호는 8자 이상이어야 합니다",
            },
          })}
          error={errors.password?.message}
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
        <span className="text-(--color-text-tertiary) text-right font-['Pretendard_Variable'] text-[12px] right font-medium leading-4.5 underline w-full cursor-pointer">
          {LOGIN_FIND_PASSWORD}
        </span>

        <SubmitButton contents={LOGIN_SUBMIT_BUTTON} isValid={isValid} />
      </form>
    </div>
  );
}
