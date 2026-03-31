"use client";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { Body, BodyBold, BodyLarge, Label } from "@/shared/ui/typography";
import { typo } from "@/shared/ui/typography";

/*=============================================== */
/*                Auth Input Component             */
/*=============================================== */

type AuthInputComponentProps = {
  title: string;
  placeholder: string;
  type?: "email" | "password" | "name" | "text";
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  suffix?: React.ReactNode;
  value?: string;
};

export function AuthInputComponent({
  title,
  placeholder,
  type = "email",
  onChange,
  suffix,
  value,
}: AuthInputComponentProps) {
  return (
    <div className="flex flex-col justify-between items-left min-w-full gap-[4px]">
      <BodyBold>{title}</BodyBold>
      <AuthInput
        placeholder={placeholder}
        type={type}
        onChange={onChange}
        suffix={suffix}
        value={value}
      />
    </div>
  );
}

/*=============================================== */
/*           Auth OAuth Button Component          */
/*=============================================== */

export function AuthOAuthButton() {
  return (
    <OAuthButton>
      <img src="/assets/google-logo.svg" alt="google logo" />
      <BodyBold>Google로 가입하기</BodyBold>
    </OAuthButton>
  );
}

/*=============================================== */
/*          Auth Submit Button Component          */
/*=============================================== */

type AuthSubmitButtonProps = {
  contents: string;
};
export function AuthSubmitButton({ contents }: AuthSubmitButtonProps) {
  return (
    <SubmitButton type="submit">
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
    <div className="flex flex-row items-center justify-between min-w-full whitespace-nowrap gap-[12px] text-[var(--palette-gray-300)]">
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
    <div className="flex flex-col justify-between items-center gap-[28px]">
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

/* =========== Emotin Styling Components ========= */

/* ===== AuthInputComponenet ====== */
type AuthInputProps = {
  placeholder: string;
  type?: "email" | "password" | "name" | "text";
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  suffix?: React.ReactNode;
  value?: string;
};

function AuthInput({
  placeholder,
  type = "email",
  onChange,
  suffix,
  value,
}: AuthInputProps) {
  return (
    <AuthInputWrapper>
      <StyledInput placeholder={placeholder} type={type} onChange={onChange} value={value} />
      {suffix && <SuffixContainer>{suffix}</SuffixContainer>}
    </AuthInputWrapper>
  );
}

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
const SubmitButton = styled.button`
  cursor: pointer;

  width: 100%;
  display: flex;
  padding: 12px 141px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  border-radius: 12px;
  color: white;
  background: var(--color-interactive-primary, #1a1a1a);
  white-space: nowrap;
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
  /* top: 4px;
  left: 4px; */
  top: 2px;
  left: 2px;
  /* width: calc(50% - 4px);
  height: calc(100% - 4px); */
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
