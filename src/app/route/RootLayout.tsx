/* 모든 라우터를 감싸는 루트 레이아웃 */

import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return <Outlet />;
}
