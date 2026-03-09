// 계정 삭제 View

/** 계정 삭제 페이지 — 화면 중앙 정렬 레이아웃 */
export default function DeleteAccountView() {
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
      {/* 계정 삭제 컨텐츠 영역 */}
      <h1>계정 삭제</h1>
    </div>
  );
}
