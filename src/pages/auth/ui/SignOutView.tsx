// 로그아웃 View

/** 로그아웃 페이지 — 화면 중앙 정렬 레이아웃 */
export default function SignOutView() {
  return (
    // 전체 화면을 차지하며 콘텐츠를 가운데 정렬
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      {/* 로그아웃 컨텐츠 영역 */}
      <h1>로그아웃</h1>
    </div>
  );
}
