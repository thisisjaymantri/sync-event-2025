"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Footer() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [btcPrice, setBtcPrice] = useState("$200,020.48");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchBtcPrice = async () => {
      try {
        const response = await fetch("/api/btc-price");
        const data = await response.json();
        setBtcPrice(data.price);
      } catch (error) {
        console.error("Failed to fetch BTC price:", error);
        // Keep fallback price
      }
    };

    // Initial fetch
    fetchBtcPrice();

    // Refresh every 60 seconds
    const interval = setInterval(fetchBtcPrice, 60000);

    return () => clearInterval(interval);
  }, []);

  const iconPath = mounted ? `/icons/${resolvedTheme || "light"}` : "/icons/light";
  const isLight = mounted && resolvedTheme === "light";
  const isDark = mounted && resolvedTheme === "dark";

  return (
    <div className="relative box-border flex h-[32px] w-full shrink-0 items-center justify-between px-[12px] py-0">
      {/* Border */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 border-t border-[var(--color-border-tertiary)]"
      />

      {/* Left section */}
          <div className="z-10 flex h-[24px] shrink-0 items-center gap-[48px] whitespace-pre text-nowrap font-['Suisse_Intl',_sans-serif] text-[12px] leading-normal">
            <div className="flex shrink-0 items-center gap-[4px]">
              <p className="text-[var(--color-text-secondary)]">BTC/USD</p>
              <p className="text-[var(--color-text-tertiary)]">{btcPrice}</p>
            </div>
        <p className="text-[var(--color-text-tertiary)]">Sync &apos;25</p>
        <p className="text-[var(--color-text-tertiary)]">Los Angeles, CA</p>
      </div>

      {/* Right section */}
      <div className="z-10 flex shrink-0 items-center gap-[24px]">
        {/* Theme toggle */}
        <div className="box-border flex shrink-0 items-center gap-0 rounded-[4px] bg-[var(--color-surface-sunken)] p-[2px]">
          <button
            onClick={() => setTheme("light")}
            className="relative size-[16px] shrink-0 rounded-[3.2px] transition-colors"
            style={mounted ? { background: isLight ? "var(--color-theme-toggle-active-bg)" : "transparent" } : undefined}
            aria-label="Light theme"
          >
            <div className="absolute left-1/2 top-1/2 size-[12px] -translate-x-1/2 -translate-y-1/2">
              <Image
                src={`${iconPath}/sun.svg`}
                alt="Light theme"
                fill
                className="object-contain"
              />
            </div>
          </button>
          <button
            onClick={() => setTheme("dark")}
            className="relative size-[16px] shrink-0 rounded-[3.2px] transition-colors"
            style={mounted ? { background: isDark ? "var(--color-theme-toggle-active-bg)" : "transparent" } : undefined}
            aria-label="Dark theme"
          >
            <div className="absolute left-1/2 top-1/2 size-[12px] -translate-x-1/2 -translate-y-1/2">
              <Image
                src={`${iconPath}/moon.svg`}
                alt="Dark theme"
                fill
                className="object-contain"
              />
            </div>
          </button>
        </div>

        {/* Mute button */}
        <div className="relative size-[16px] shrink-0 opacity-50">
          <Image
            src={`${iconPath}/mute.svg`}
            alt="Mute"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}