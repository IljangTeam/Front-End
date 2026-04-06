"use client";

/*  Auth View
- LoginView : 로그인 폼 컴포넌트
- SignupView : 회원가입 폼 컴포넌트
*/

// ===== hook =====
import { useAuthMode } from "@/Views/auth/model/useAuthModeTab";

// ===== ui components(SSR) =====
import LeftImage from "@/Views/auth/ui/LeftImage";

// ===== ui components(CSR) =====
import { AuthMethod } from "@/Views/auth/ui/LoginComponents";
import LoginView from "@/Views/auth/ui/LoginView";
import SignupView from "@/Views/auth/ui/SignUpView";

export default function AuthView() {
  const { mode, setMode, isLogin } = useAuthMode();

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-[var(--color-bg-default)] p-[224px_115px]">
      {/* 로그인 및 회원가입 컴포넌트 */}
      <div className="flex flex-row justify-between items-stretch min-h-full p-8 gap-8 bg-white rounded-3xl shadow-[0_2px_16px_0_rgba(0,0,0,0.06)]">
        {/* =========== 좌측 이미지 =========== */}
        <LeftImage />

        {/* =========== loginForm / 우측 로그인 폼 =========== */}
        <div className="flex flex-col justify-between items-stretch min-w-[374.667px] w-full h-full">
          {/* 로그인/회원가입 선택 토글*/}
          <AuthMethod state={mode} onToggle={setMode} />

          {/* 뷰 분기점 */}
          <div className="flex flex-col flex-1 min-w-full">
            {isLogin ? <LoginView /> : <SignupView />}
          </div>
        </div>
      </div>
    </div>
  );
}
