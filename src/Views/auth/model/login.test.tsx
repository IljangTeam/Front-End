import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
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
import { AuthSubmitButton } from "../ui/LoginComponents";

// ===== 공통 상수 =====
const VALID_EMAIL = "test@example.com";
const VALID_PASSWORD = "password123";

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

      await user.click(screen.getByRole("button", { name: /비밀번호 보기/i }));

      expect(passwordInput).toHaveAttribute("type", "text");
    });

    it("비밀번호 토글 버튼을 두 번 클릭하면 type이 원상복귀된다", async () => {
      const user = userEvent.setup();
      render(<LoginView />);

      const passwordInput = screen.getByPlaceholderText("비밀번호 입력");

      await user.click(screen.getByRole("button", { name: /비밀번호 보기/i }));
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

  /* ------ react-hook-form 유효성 검사 테스트 ------ */
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

  /* ------ isValid 연동 동작 테스트 ------ */
  describe("isValid 연동", () => {
    it("폼이 비어있어도 제출 버튼이 disabled 없이 클릭 가능하다", () => {
      render(<LoginView />);
      expect(
        screen.getByRole("button", { name: /이메일로 로그인/i }),
      ).not.toBeDisabled();
    });

    it("폼이 비어있을 때 버튼 클릭 시 validation 에러가 표시된다 (isValid=false여도 제출 트리거)", async () => {
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

    it("이메일만 입력된 상태에서 버튼이 disabled 없이 클릭 가능하다", async () => {
      const user = userEvent.setup();
      render(<LoginView />);

      await user.type(
        screen.getByPlaceholderText("example@email.com"),
        VALID_EMAIL,
      );

      expect(
        screen.getByRole("button", { name: /이메일로 로그인/i }),
      ).not.toBeDisabled();
    });

    it("모든 필드가 유효하게 채워진 후에도 버튼은 disabled 없이 클릭 가능하다", async () => {
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

      expect(
        screen.getByRole("button", { name: /이메일로 로그인/i }),
      ).not.toBeDisabled();
    });
  });
});

/* ================================================================
 * AuthSubmitButton
 * ================================================================ */
describe("AuthSubmitButton", () => {
  /* ------ disabled 속성 테스트 ------ */
  describe("disabled 속성", () => {
    it("isValid=true일 때 disabled 속성을 갖지 않는다", () => {
      render(<AuthSubmitButton contents="제출" isValid={true} />);
      expect(screen.getByRole("button", { name: "제출" })).not.toBeDisabled();
    });

    it("isValid=false일 때도 disabled 속성을 갖지 않는다", () => {
      render(<AuthSubmitButton contents="제출" isValid={false} />);
      expect(screen.getByRole("button", { name: "제출" })).not.toBeDisabled();
    });

    it("isValid를 전달하지 않으면 disabled 속성을 갖지 않는다 (기본값 true)", () => {
      render(<AuthSubmitButton contents="제출" />);
      expect(screen.getByRole("button", { name: "제출" })).not.toBeDisabled();
    });
  });

  /* ------ type 속성 테스트 ------ */
  it("항상 type='submit' 속성을 갖는다", () => {
    render(<AuthSubmitButton contents="제출" isValid={false} />);
    expect(screen.getByRole("button", { name: "제출" })).toHaveAttribute(
      "type",
      "submit",
    );
  });
});
