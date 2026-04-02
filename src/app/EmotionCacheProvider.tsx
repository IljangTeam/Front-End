// Emotion 캐싱 설정
"use client";

import { useServerInsertedHTML } from "next/navigation";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { useState } from "react";

export default function EmotionCacheProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cache] = useState(() => {
    const cache = createCache({
      key: "em", // className prefix를 'em'로 설정
      /* Emotion 스타일은 @layer 미지정(unlayered)
       → CSS 명세상 레이어 내부 스타일(Tailwind)보다 항상 우선. 
       prepend:false는 동일 specificity의 unlayered 스타일 간 충돌 시 Emotion이 나중에 오도록 하는 추가 안전장치. */
      prepend: false,
    });

    cache.compat = true;
    return cache;
  });

  /* 서버 렌더링 중 생성된 스타일 HTML에 직접 삽입 */
  useServerInsertedHTML(() => {
    return (
      <style
        data-emotion={`${cache.key} ${Object.keys(cache.inserted).join(" ")}`}
        dangerouslySetInnerHTML={{
          __html: Object.values(cache.inserted).join(" "),
        }}
      />
    );
  });

  return <CacheProvider value={cache}>{children}</CacheProvider>;
}
