/* ===== LoginComponent ===== */
export const LOGIN_GOOGLE = "Google로 가입하기";

/* ===== LoginView ===== */
export const LOGIN_INPUT_CONTENTS = {
  email: {
    title: "이메일",
    placeholder: "example@email.com",
  },
  password: {
    title: "비밀번호",
    placeholder: "비밀번호 입력",
  },
};
export const LOGIN_FIND_PASSWORD = "비밀번호를 잊으셨나요?";
export const LOGIN_SUBMIT_BUTTON = "이메일로 로그인";

/* ===== SignUpView ===== */
export const SIGNUP_INPUT_CONTENS = {
  name: {
    title: "이름",
    placeholder: "홍길동",
  },
  email: LOGIN_INPUT_CONTENTS.email,
  password: LOGIN_INPUT_CONTENTS.password,
  passwordConfirm: {
    title: "비밀번호 확인",
    placeholder: "비밀번호를 한 번 더 입력해주세요",
  },
};
export const SIGNUP_SUBMIT_BUTTON = LOGIN_SUBMIT_BUTTON;
export const SIGNUP_CAPTION = `가입 시 각할모의 이용약관과 개인정보처리방침에 동의하는 것으로
            간주됩니다.`;
