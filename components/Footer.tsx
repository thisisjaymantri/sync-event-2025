"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import ThemedIcon from "./ThemedIcon";

export default function Footer() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [btcPrice, setBtcPrice] = useState("$200,020.48");
  const [isPriceAnimating, setIsPriceAnimating] = useState(false);

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

  // Trigger animation when price changes
  useEffect(() => {
    if (mounted && btcPrice !== "$200,020.48") {
      setIsPriceAnimating(true);
      const timer = setTimeout(() => setIsPriceAnimating(false), 400);
      return () => clearTimeout(timer);
    }
  }, [btcPrice, mounted]);

  const isLight = mounted && resolvedTheme === "light";
  const isDark = mounted && resolvedTheme === "dark";

  return (
    <div className="relative box-border flex h-[32px] w-full shrink-0 items-center justify-between px-[12px] py-0">
      {/* Border */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 border-t-[0.5px] border-[var(--color-border-tertiary)]"
      />

      {/* Left section */}
          <div className="z-10 flex h-[24px] shrink-0 items-center gap-[48px] whitespace-pre text-nowrap font-['Suisse_Intl',_sans-serif] text-[12px] leading-normal">
            <div className="flex shrink-0 items-center gap-[4px]">
              <p className="text-[var(--color-text-secondary)]">BTC/USD</p>
              <p 
                className={`text-[var(--color-text-tertiary)] transition-opacity duration-200 ${
                  isPriceAnimating ? "opacity-40" : "opacity-100"
                }`}
              >
                {btcPrice}
              </p>
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
                className="relative flex size-[16px] shrink-0 items-center justify-center rounded-[3.2px] transition-colors"
                style={mounted ? { background: isLight ? "var(--color-theme-toggle-active-bg)" : "transparent" } : undefined}
                aria-label="Light theme"
              >
                <ThemedIcon
                  src="/icons/icon-sun.svg"
                  alt="Light theme"
                  width={12}
                  height={12}
                  className="icon-primary"
                />
              </button>
              <button
                onClick={() => setTheme("dark")}
                className="relative flex size-[16px] shrink-0 items-center justify-center rounded-[3.2px] transition-colors"
                style={mounted ? { background: isDark ? "var(--color-theme-toggle-active-bg)" : "transparent" } : undefined}
                aria-label="Dark theme"
              >
                <ThemedIcon
                  src="/icons/icon-moon.svg"
                  alt="Dark theme"
                  width={12}
                  height={12}
                  className="icon-primary"
                />
              </button>
        </div>

            {/* Mute button */}
            <ThemedIcon
              src="/icons/icon-mute.svg"
              alt="Mute"
              width={16}
              height={16}
              className="icon-secondary"
            />
      </div>
    </div>
  );
}