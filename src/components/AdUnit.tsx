"use client";

import { useEffect, useRef } from "react";

// ============================================
// REPLACE THIS WITH YOUR ADSENSE PUBLISHER ID
// Get it from: https://adsense.google.com
// ============================================
const ADSENSE_PUB_ID = "ca-pub-3732137874384170";

type AdFormat = "horizontal" | "vertical" | "rectangle" | "auto";

const formatStyles: Record<AdFormat, { width: string; height: string }> = {
  horizontal: { width: "100%", height: "90px" },
  vertical: { width: "160px", height: "600px" },
  rectangle: { width: "336px", height: "280px" },
  auto: { width: "100%", height: "auto" },
};

export default function AdUnit({
  format = "auto",
  className = "",
}: {
  format?: AdFormat;
  className?: string;
}) {
  const adRef = useRef<HTMLDivElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (ADSENSE_PUB_ID.includes("XXXX")) return; // Skip if not configured
    if (pushed.current) return;
    pushed.current = true;

    try {
      const w = window as unknown as { adsbygoogle: unknown[] };
      (w.adsbygoogle = w.adsbygoogle || []).push({});
    } catch {
      // AdSense not loaded
    }
  }, []);

  // Don't render anything if AdSense isn't configured yet
  if (ADSENSE_PUB_ID.includes("XXXX")) {
    return null;
  }

  const style = formatStyles[format];

  return (
    <div className={`flex justify-center ${className}`} ref={adRef}>
      <ins
        className="adsbygoogle"
        style={{
          display: "block",
          width: style.width,
          height: style.height,
          minHeight: format === "auto" ? "90px" : undefined,
        }}
        data-ad-client={ADSENSE_PUB_ID}
        data-ad-slot="" // AdSense will auto-assign
        data-ad-format={format === "auto" ? "auto" : undefined}
        data-full-width-responsive={format === "auto" ? "true" : undefined}
      />
    </div>
  );
}
