import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// ===== 라우터 mock =====
const mockPush = vi.hoisted(() => vi.fn());
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
  }),
}));

// ===== 테스트 대상 컴포넌트 =====
import LoginView from "../ui/LoginView";
import SignupView from "../ui/SignUpView";
import AuthView from "../ui/AuthView";
import { AuthMethod } from "../ui/LoginComponents";

// ===== 공통 상수 =====
const VALID_EMAIL = "test@example.com";
const VALID_PASSWORD = "password123";
const VALID_NAME = "홍길동";

/* ================================================================
 * LoginView
 * ================================================================ */
describe("LoginView", () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  /* ------ 렌더링 테스트 ------ */
  describe("렌더링", () => {
    it("이메일·비밀번호 입력 필드와 제출 버튼이 렌더링된다", () => {
      render(<LoginView />);

      expect(
        screen.getByPlaceholderText("example@email.com"),
      ).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText("비밀번호 입력"),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /이메일로 로그인/i }),
      ).toBeInTheDocument();
    });

    it("'비밀번호를 잊으셨나요?' 텍스트가 렌더링된다", () => {
      render(<LoginView />);
      expect(screen.getByText("비밀번호를 잊으셨나요?")).toBeInTheDocument();
    });
  });

  /* ------ input 입력 테스트 ------ */
  describe("input 입력", () => {
    it("이메일 필드에 값을 입력하면 반영된다", async () => {
      const user = userEvent.setup();
      render(<LoginView />);

      const emailInput = screen.getByPlaceholderText("example@email.com");
      await user.type(emailInput, VALID_EMAIL);

      expect(emailInput).toHaveValue(VALID_EMAIL);
    });

    it("비밀번호 필드에 값을 입력하면 반영된다", async () => {
      const user = userEvent.setup();
      render(<LoginView />);

      const passwordInput = screen.getByPlaceholderText("비밀번호 입력");
      await user.type(passwordInput, VALID_PASSWORD);

      expect(passwordInput).toHaveValue(VALID_PASSWORD);
    });
  });

  /* ------ 클릭 이벤트 테스트 ------ */
  describe("클릭 이벤트", () => {
    it("비밀번호 토글 버튼 클릭 시 type이 password → text로 변경된다", async () => {
      const user = userEvent.setup();
      render(<LoginView />);

      const passwordInput = screen.getByPlaceholderText("비밀번호 입력");
      expect(passwordInput).toHaveAttribute("type", "password");

      const toggleBtn = screen.getByRole("button", { name: /비밀번호 보기/i });
      await user.click(toggleBtn);

      expect(passwordInput).toHaveAttribute("type", "text");
    });

    it("비밀번호 토글 버튼을 두 번 클릭하면 type이 원상복귀된다", async () => {
      const user = userEvent.setup();
      render(<LoginView />);

      const passwordInput = screen.getByPlaceholderText("비밀번호 입력");
      const toggleBtn = screen.getByRole("button", { name: /비밀번호 보기/i });

      await user.click(toggleBtn);
      expect(passwordInput).toHaveAttribute("type", "text");

      await user.click(screen.getByRole("button", { name: /숨기기/i }));
      expect(passwordInput).toHaveAttribute("type", "password");
    });
  });

  /* ------ 라우터 이동 테스트 ------ */
  describe("라우터 이동", () => {
    it("유효한 값으로 제출 시 router.push('/')가 호출된다", async () => {
      const user = userEvent.setup();
      render(<LoginView />);

      await user.type(
        screen.getByPlaceholderText("example@email.com"),
        VALID_EMAIL,
      );
      await user.type(
        screen.getByPlaceholderText("비밀번호 입력"),
        VALID_PASSWORD,
      );
      await user.click(
        screen.getByRole("button", { name: /이메일로 로그인/i }),
      );

      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith("/");
      });
    });
  });

  /* ------ react-hook-form 상태 테스트 ------ */
  describe("react-hook-form 유효성 검사", () => {
    it("이메일 형식이 잘못되면 에러 메시지가 표시된다", async () => {
      const user = userEvent.setup();
      render(<LoginView />);

      await user.type(
        screen.getByPlaceholderText("example@email.com"),
        "invalid-email",
      );
      await user.tab();

      await waitFor(() => {
        expect(
          screen.getByText("올바른 이메일 형식을 입력해주세요"),
        ).toBeInTheDocument();
      });
    });

    it("비밀번호가 8자 미만이면 에러 메시지가 표시된다", async () => {
      const user = userEvent.setup();
      render(<LoginView />);

      await user.type(screen.getByPlaceholderText("비밀번호 입력"), "short");
      await user.tab();

      await waitFor(() => {
        expect(
          screen.getByText("비밀번호는 8자 이상이어야 합니다"),
        ).toBeInTheDocument();
      });
    });

    it("모든 필드가 비어있으면 제출 후 에러 메시지가 표시된다", async () => {
      const user = userEvent.setup();
      render(<LoginView />);

      await user.click(
        screen.getByRole("button", { name: /이메일로 로그인/i }),
      );

      await waitFor(() => {
        expect(screen.getByText("이메일을 입력해주세요")).toBeInTheDocument();
        expect(
          screen.getByText("비밀번호를 입력해주세요"),
        ).toBeInTheDocument();
      });

      expect(mockPush).not.toHaveBeenCalled();
    });
  });
});

/* ================================================================
 * SignupView
 * ================================================================ */
describe("SignupView", () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  /* ------ 렌더링 테스트 ------ */
  describe("렌더링", () => {
    it("이름·이메일·비밀번호·비밀번호 확인 입력 필드와 제출 버튼이 렌더링된다", () => {
      render(<SignupView />);

      expect(screen.getByPlaceholderText("홍길동")).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText("example@email.com"),
      ).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText("비밀번호 입력"),
      ).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText("비밀번호를 한 번 더 입력해주세요"),
      ).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /이메일로 로그인/i })).toBeInTheDocument();
    });

    it("이용약관 안내 문구가 렌더링된다", () => {
      render(<SignupView />);
      expect(screen.getByText(/이용약관/)).toBeInTheDocument();
    });
  });

  /* ------ input 입력 테스트 ------ */
  describe("input 입력", () => {
    it("각 필드에 값을 입력하면 반영된다", async () => {
      const user = userEvent.setup();
      render(<SignupView />);

      const nameInput = screen.getByPlaceholderText("홍길동");
      const emailInput = screen.getByPlaceholderText("example@email.com");
      const passwordInput = screen.getByPlaceholderText("비밀번호 입력");
      const confirmInput = screen.getByPlaceholderText(
        "비밀번호를 한 번 더 입력해주세요",
      );

      await user.type(nameInput, VALID_NAME);
      await user.type(emailInput, VALID_EMAIL);
      await user.type(passwordInput, VALID_PASSWORD);
      await user.type(confirmInput, VALID_PASSWORD);

      expect(nameInput).toHaveValue(VALID_NAME);
      expect(emailInput).toHaveValue(VALID_EMAIL);
      expect(passwordInput).toHaveValue(VALID_PASSWORD);
      expect(confirmInput).toHaveValue(VALID_PASSWORD);
    });
  });

  /* ------ 클릭 이벤트 테스트 ------ */
  describe("클릭 이벤트", () => {
    it("비밀번호 토글 버튼 클릭 시 비밀번호 필드 type이 전환된다", async () => {
      const user = userEvent.setup();
      render(<SignupView />);

      const passwordInput = screen.getByPlaceholderText("비밀번호 입력");
      expect(passwordInput).toHaveAttribute("type", "password");

      await user.click(screen.getByRole("button", { name: /비밀번호 보기/i }));
      expect(passwordInput).toHaveAttribute("type", "text");
    });
  });

  /* ------ 라우터 이동 테스트 ------ */
  describe("라우터 이동", () => {
    it("모든 필드가 유효하고 비밀번호가 일치하면 router.push('/')가 호출된다", async () => {
      const user = userEvent.setup();
      render(<SignupView />);

      await user.type(screen.getByPlaceholderText("홍길동"), VALID_NAME);
      await user.type(
        screen.getByPlaceholderText("example@email.com"),
        VALID_EMAIL,
      );
      await user.type(
        screen.getByPlaceholderText("비밀번호 입력"),
        VALID_PASSWORD,
      );
      await user.type(
        screen.getByPlaceholderText("비밀번호를 한 번 더 입력해주세요"),
        VALID_PASSWORD,
      );
      await user.click(
        screen.getByRole("button", { name: /이메일로 로그인/i }),
      );

      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith("/");
      });
    });

    it("폼이 유효하지 않으면 router.push가 호출되지 않는다", async () => {
      const user = userEvent.setup();
      render(<SignupView />);

      await user.click(
        screen.getByRole("button", { name: /이메일로 로그인/i }),
      );

      await waitFor(() => {
        expect(mockPush).not.toHaveBeenCalled();
      });
    });
  });

  /* ------ react-hook-form 상태 테스트 ------ */
  describe("react-hook-form 유효성 검사", () => {
    it("비밀번호가 일치하지 않으면 에러 메시지가 표시된다", async () => {
      const user = userEvent.setup();
      render(<SignupView />);

      await user.type(
        screen.getByPlaceholderText("비밀번호 입력"),
        VALID_PASSWORD,
      );
      await user.type(
        screen.getByPlaceholderText("비밀번호를 한 번 더 입력해주세요"),
        "differentPassword",
      );
      await user.tab();

      await waitFor(() => {
        expect(
          screen.getByText("비밀번호가 일치하지 않습니다"),
        ).toBeInTheDocument();
      });
    });

    it("이름 필드가 비어있으면 에러 메시지가 표시된다", async () => {
      const user = userEvent.setup();
      render(<SignupView />);

      const nameInput = screen.getByPlaceholderText("홍길동");
      await user.click(nameInput);
      await user.tab();

      await waitFor(() => {
        expect(
          screen.getByText("이름을 입력해주세요"),
        ).toBeInTheDocument();
      });
    });

    it("이메일 형식이 잘못되면 에러 메시지가 표시된다", async () => {
      const user = userEvent.setup();
      render(<SignupView />);

      await user.type(
        screen.getByPlaceholderText("example@email.com"),
        "not-an-email",
      );
      await user.tab();

      await waitFor(() => {
        expect(
          screen.getByText("올바른 이메일 형식을 입력해주세요"),
        ).toBeInTheDocument();
      });
    });

    it("비밀번호가 8자 미만이면 에러 메시지가 표시된다", async () => {
      const user = userEvent.setup();
      render(<SignupView />);

      await user.type(screen.getByPlaceholderText("비밀번호 입력"), "short");
      await user.tab();

      await waitFor(() => {
        expect(
          screen.getByText("비밀번호는 8자 이상이어야 합니다"),
        ).toBeInTheDocument();
      });
    });
  });
});

/* ================================================================
 * AuthView — 탭 전환 (AuthMethod)
 * ================================================================ */
describe("AuthView", () => {
  /* ------ 렌더링 테스트 ------ */
  describe("렌더링", () => {
    it("초기 상태에서 LoginView가 렌더링된다", () => {
      render(<AuthView />);
      expect(
        screen.getByPlaceholderText("example@email.com"),
      ).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText("비밀번호 입력"),
      ).toBeInTheDocument();
    });

    it("'로그인'·'회원가입' 토글 버튼이 렌더링된다", () => {
      render(<AuthView />);
      expect(
        screen.getByRole("button", { name: "로그인" }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "회원가입" }),
      ).toBeInTheDocument();
    });
  });

  /* ------ 클릭 이벤트 테스트 ------ */
  describe("클릭 이벤트 — 탭 전환", () => {
    it("'회원가입' 버튼 클릭 시 SignupView로 전환된다", async () => {
      const user = userEvent.setup();
      render(<AuthView />);

      await user.click(screen.getByRole("button", { name: "회원가입" }));

      expect(screen.getByPlaceholderText("홍길동")).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText("비밀번호를 한 번 더 입력해주세요"),
      ).toBeInTheDocument();
    });

    it("'회원가입' → '로그인' 버튼 클릭 시 LoginView로 복귀된다", async () => {
      const user = userEvent.setup();
      render(<AuthView />);

      await user.click(screen.getByRole("button", { name: "회원가입" }));
      await user.click(screen.getByRole("button", { name: "로그인" }));

      expect(
        screen.getByPlaceholderText("example@email.com"),
      ).toBeInTheDocument();
      expect(
        screen.queryByPlaceholderText("홍길동"),
      ).not.toBeInTheDocument();
    });
  });
});

/* ================================================================
 * AuthMethod — 독립 컴포넌트 테스트
 * ================================================================ */
describe("AuthMethod 컴포넌트", () => {
  it("onToggle('signup')이 '회원가입' 버튼 클릭 시 호출된다", async () => {
    const user = userEvent.setup();
    const onToggle = vi.fn();
    render(<AuthMethod state="login" onToggle={onToggle} />);

    await user.click(screen.getByRole("button", { name: "회원가입" }));

    expect(onToggle).toHaveBeenCalledWith("signup");
  });

  it("onToggle('login')이 '로그인' 버튼 클릭 시 호출된다", async () => {
    const user = userEvent.setup();
    const onToggle = vi.fn();
    render(<AuthMethod state="signup" onToggle={onToggle} />);

    await user.click(screen.getByRole("button", { name: "로그인" }));

    expect(onToggle).toHaveBeenCalledWith("login");
  });
});
