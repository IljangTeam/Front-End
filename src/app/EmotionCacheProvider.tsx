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
      key: "css", // className prefix를 'css'로 설정
      prepend: true, // <head>에서 emotion <style>태그 가장 먼저 배치 설정
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
