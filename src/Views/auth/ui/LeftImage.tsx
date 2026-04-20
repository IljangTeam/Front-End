export default function LeftImage() {
  return (
    <div
      className="relative min-w-120 w-full min-h-[605.667px] h-full rounded-3xl bg-gray-300 bg-center bg-cover bg-no-repeat"
      style={{ backgroundImage: "url(/assets/auth-background.png)" }}
    >
      {/* 서비스 svg logo */}
      <img
        src="/assets/logo-white.svg"
        alt="서비스 로고"
        style={{ position: "absolute", top: "32.25px", left: "32.75px" }}
      />
    </div>
  );
}
