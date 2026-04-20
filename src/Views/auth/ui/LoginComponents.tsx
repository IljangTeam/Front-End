"use client";
import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { Body, BodyBold, BodyLarge, Label } from "@/shared/ui/typography";
import { typo } from "@/shared/ui/typography";

import { LOGIN_GOOGLE } from "./auth.constant";

/*=============================================== */
/*                Auth Input Component             */
/*=============================================== */

type AuthInputComponentProps = {
  title: string;
  placeholder: string;
  suffix?: React.ReactNode;
  error?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "prefix">;

export const AuthInputComponent = React.forwardRef<
  HTMLInputElement,
  AuthInputComponentProps
>(({ title, placeholder, suffix, error, ...rest }, ref) => {
  return (
    <div className="flex flex-col justify-between items-left min-w-full gap-1">
      <BodyBold>{title}</BodyBold>
      <AuthInput
        placeholder={placeholder}
        suffix={suffix}
        ref={ref}
        {...rest}
      />
      {error && (
        <span className="text-red-500 text-[11px] font-medium">{error}</span>
      )}
    </div>
  );
});
AuthInputComponent.displayName = "AuthInputComponent";

/*=============================================== */
/*           Auth OAuth Button Component          */
/*=============================================== */

export function AuthOAuthButton() {
  return (
    <OAuthButton>
      <img src="/assets/google-logo.svg" alt="google logo" />
      <BodyBold>{LOGIN_GOOGLE}</BodyBold>
    </OAuthButton>
  );
}

/*=============================================== */
/*          Auth Submit Button Component          */
/*=============================================== */

type AuthSubmitButtonProps = {
  contents: string;
  isValid?: boolean;
};
export function AuthSubmitButton({
  contents,
  isValid = true,
}: AuthSubmitButtonProps) {
  return (
    <SubmitButton type="submit" $isValid={isValid}>
      <BodyLarge>{contents}</BodyLarge>
    </SubmitButton>
  );
}

/*=============================================== */
/*          Auth Method Select Component          */
/*=============================================== */

type AuthMethodProps = {
  state: "login" | "signup";
  onToggle: (state: "login" | "signup") => void;
};

type ButtonTypo = {
  contents: string;
  state: boolean;
};
const ButtonTypo = ({ contents, state }: ButtonTypo) => {
  return <Typo state={state}>{contents}</Typo>;
};

const Typo = styled.span<{ state: boolean }>`
  ${({ state }) => [
    state ? typo["body-bold"] : typo.body,
    state
      ? css`
          color: var(--color-interactive-primary);
        `
      : css`
          color: var(--color-text-secondary);
        `,
  ]}
`;

const OrBar = () => {
  return (
    <div className="flex flex-row items-center justify-between min-w-full whitespace-nowrap gap-3 text-[var(--palette-gray-300)]">
      <BarLine />
      <Label>또는</Label>
      <BarLine />
    </div>
  );
};

const BarLine = styled.div`
  height: 1px;
  width: 100%;
  flex: 1 0 0;
  background: var(--palette-gray-100);
`;

export function AuthMethod({ state, onToggle }: AuthMethodProps) {
  return (
    <div className="flex flex-col justify-between items-center gap-7">
      <Container>
        <SliderIndicator active={state === "signup"} />
        <ToggleButton onClick={() => onToggle("login")}>
          <ButtonTypo contents="로그인" state={state === "login"} />
        </ToggleButton>
        <ToggleButton onClick={() => onToggle("signup")}>
          <ButtonTypo contents="회원가입" state={state === "signup"} />
        </ToggleButton>
      </Container>
      <AuthOAuthButton />
      <OrBar />
    </div>
  );
}

/* =========== Emotion Styling Components ========= */

/* ===== AuthInputComponent ====== */
type AuthInputProps = {
  placeholder: string;
  suffix?: React.ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement>;

const AuthInput = React.forwardRef<HTMLInputElement, AuthInputProps>(
  ({ placeholder, suffix, ...rest }, ref) => {
    return (
      <AuthInputWrapper>
        <StyledInput placeholder={placeholder} ref={ref} {...rest} />
        {suffix && <SuffixContainer>{suffix}</SuffixContainer>}
      </AuthInputWrapper>
    );
  },
);
AuthInput.displayName = "AuthInput";

const AuthInputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`;

const StyledInput = styled.input`
  display: flex;
  height: 45.667px;
  padding: 11px 14px;
  padding-right: 48px;
  align-items: center;
  flex-shrink: 0;
  align-self: stretch;

  width: 100%;

  border-radius: 10px;
  border: 1.333px solid var(--color-border-default, #e8e6ed);
  background: var(--color-bg-default, #f7f6fa);

  &:focus {
    outline: none;
  }

  caret-color: var(--color-text-accent);
`;

const SuffixContainer = styled.div`
  cursor: pointer;
  position: absolute;
  right: 14px;
  display: flex;
  align-items: center;
`;

/* ===== AuthOAuthButton ====== */
const OAuthButton = styled.button`
  cursor: pointer;

  display: flex;
  flex-direction: row;

  justify-content: center;
  align-items: center;
  align-self: stretch;

  width: 100%;
  padding: 12px;
  gap: 10px;

  border-radius: 12px;
  border: 1.333px solid var(--color-border-default);
  background: #fff;
`;

/* ===== AuthSubmitButton ====== */
const SubmitButton = styled.button<{ $isValid: boolean }>`
  width: 100%;
  display: flex;
  padding: 12px 141px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  border-radius: 12px;
  color: white;
  white-space: nowrap;

  cursor: ${({ $isValid }) => ($isValid ? "pointer" : "not-allowed")};
  background: ${({ $isValid }) =>
    $isValid
      ? "var(--color-interactive-primary, #1a1a1a)"
      : "var(--palette-gray-500)"};
`;

/* ===== AuthMethod ====== */
const Container = styled.div`
  position: relative;
  display: flex;

  width: 100%;
  height: 45px;
  padding: 4px;
  align-items: center;
  align-self: stretch;

  border-radius: 12px;
  background: var(--color-bg-default);
`;

const SliderIndicator = styled.div<{ active: boolean }>`
  position: absolute;
  top: 2px;
  left: 2px;
  width: 50%;
  height: calc(100% - 4px);

  border-radius: 9px;
  background: #fff;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.08);

  transform: ${({ active }) =>
    active ? "translateX(calc(100% - 4px))" : "translateX(0)"};
  transition: transform 0.25s ease;
`;

const ToggleButton = styled.button`
  cursor: pointer;
  position: relative;
  z-index: 1;

  display: flex;
  padding: 8px 73px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex: 1 0 0;

  border-radius: 9px;
  background: transparent;

  white-space: nowrap;
`;
