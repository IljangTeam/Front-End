import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
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
import AuthView from "../ui/AuthView";
import { AuthMethod } from "../ui/LoginComponents";

/* ================================================================
 * AuthView
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
 * AuthMethod
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
