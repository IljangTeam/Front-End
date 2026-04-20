"use client";

// ===== hook =====
import { useSignupFormData } from "../model/useSignupFormData";
// ===== ui components =====
import {
  AuthInputComponent as LoginInput,
  AuthSubmitButton as SubmitButton,
} from "./LoginComponents";
import {
  SIGNUP_INPUT_CONTENS,
  SIGNUP_SUBMIT_BUTTON,
  SIGNUP_CAPTION,
} from "./auth.constant";

export default function SignupView() {
  const {
    register,
    handleSubmit,
    watch,
    errors,
    showPassword,
    togglePasswordVisibility,
  } = useSignupFormData();

  return (
    <div className="flex flex-col justify-center items-center min-w-[374.667px]">
      {/* auth input, submit wrapper */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-between items-center min-w-full gap-6"
      >
        <div className="flex flex-col items-center w-full h-full gap-3">
          <LoginInput
            title={SIGNUP_INPUT_CONTENS.name.title}
            placeholder={SIGNUP_INPUT_CONTENS.name.placeholder}
            type="text"
            {...register("name", {
              required: "이름을 입력해주세요",
            })}
            error={errors.name?.message}
          />
          <LoginInput
            title={SIGNUP_INPUT_CONTENS.email.title}
            placeholder={SIGNUP_INPUT_CONTENS.email.placeholder}
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
            title={SIGNUP_INPUT_CONTENS.password.title}
            placeholder={SIGNUP_INPUT_CONTENS.password.placeholder}
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
          <LoginInput
            title={SIGNUP_INPUT_CONTENS.passwordConfirm.title}
            placeholder={SIGNUP_INPUT_CONTENS.passwordConfirm.placeholder}
            type="password"
            {...register("passwordConfirm", {
              required: "비밀번호를 한 번 더 입력해주세요",
              validate: (value) =>
                value === watch("password") || "비밀번호가 일치하지 않습니다",
            })}
            error={errors.passwordConfirm?.message}
          />
        </div>

        <div className="flex flex-col w-full gap-4">
          <span className="text-(--color-text-tertiary) font-['Pretendard_Variable'] text-center text-[11px] font-normal leading-[17.6px] underline">
            {SIGNUP_CAPTION}
          </span>
          <SubmitButton contents={SIGNUP_SUBMIT_BUTTON} />
        </div>
      </form>
    </div>
  );
}
