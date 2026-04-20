"use client";

import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const drift1 = keyframes`
  0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.9; }
  25%      { transform: translate(80px, -120px) scale(1.2); opacity: 0.8; }
  50%      { transform: translate(-50px, 40px) scale(0.85); opacity: 0.45; }
  75%      { transform: translate(40px, -80px) scale(1.1); opacity: 0.7; }
`;

const drift2 = keyframes`
  0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.6; }
  25%      { transform: translate(-70px, -100px) scale(0.85); opacity: 0.75; }
  50%      { transform: translate(90px, 50px) scale(1.3); opacity: 0.4; }
  75%      { transform: translate(-30px, -130px) scale(0.9); opacity: 0.65; }
`;

const drift3 = keyframes`
  0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.9; }
  25%      { transform: translate(60px, -140px) scale(1.15); opacity: 0.8; }
  50%      { transform: translate(-95px, 30px) scale(0.8); opacity: 0.45; }
  75%      { transform: translate(50px, -90px) scale(1.1); opacity: 0.7; }
`;

const drift4 = keyframes`
  0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.9; }
  25%      { transform: translate(-60px, -110px) scale(1.2); opacity: 0.45; }
  50%      { transform: translate(70px, 40px) scale(0.8); opacity: 0.75; }
  75%      { transform: translate(-40px, -150px) scale(1.15); opacity: 0.5; }
`;

const Orb = styled.div<{
  $color: string;
  $size: number;
  $bottom: string;
  $left: string;
  $animation: ReturnType<typeof keyframes>;
  $duration: number;
}>`
  position: absolute;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  bottom: ${({ $bottom }) => $bottom};
  left: ${({ $left }) => $left};
  border-radius: 50%;
  background: ${({ $color }) => $color};
  filter: blur(90px);
  animation: ${({ $animation }) => $animation} ${({ $duration }) => $duration}s ease-in-out infinite;
  will-change: transform;
`;

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* 연한 하늘색 — 좌하단 */}
      <Orb
        $color="#C4E4F7"
        $size={420}
        $bottom="-8%"
        $left="-5%"
        $animation={drift1}
        $duration={8}
      />
      {/* 연보라 — 중앙 하단 */}
      <Orb
        $color="#D5CCF0"
        $size={480}
        $bottom="-25%"
        $left="20%"
        $animation={drift2}
        $duration={6}
      />
      {/* 핑크/코랄 — 우하단 */}
      <Orb
        $color="#FFD4EB"
        $size={400}
        $bottom="-15%"
        $left="60%"
        $animation={drift3}
        $duration={7}
      />
      {/* 연한 살구색 — 우하단 (은은하게) */}
      <Orb
        $color="#F8D8C8"
        $size={320}
        $bottom="-10%"
        $left="85%"
        $animation={drift4}
        $duration={9}
      />
    </div>
  );
}
