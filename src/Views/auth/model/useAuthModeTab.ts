// features/auth/model/useAuthMode.ts
"use client";

import { useState } from "react";

export type AuthMode = "login" | "signup";

export function useAuthMode(defaultMode: AuthMode = "login") {
  const [mode, setMode] = useState<AuthMode>(defaultMode);

  return {
    mode,
    setMode,
    isLogin: mode === "login",
    isSignup: mode === "signup",
  };
}
