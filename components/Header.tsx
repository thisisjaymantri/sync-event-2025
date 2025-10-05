"use client";

import { useState } from "react";
import ThemedIcon from "./ThemedIcon";

interface HeaderProps {
  onTogglePanel: () => void;
  isPanelOpen: boolean;
}

export default function Header({ onTogglePanel, isPanelOpen }: HeaderProps) {
  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative box-border flex h-[32px] w-full shrink-0 items-center justify-between px-[12px] py-[4px]">
      {/* Border */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 border-b-[0.5px] border-[var(--color-border-tertiary)]"
      />

      {/* Left section */}
      <div className="z-10 flex h-[24px] shrink-0 items-center gap-[24px]">
        {/* Lightspark Logo */}
        <ThemedIcon
          src="/lightspark-logomark.svg"
          alt="Lightspark"
          width={25}
          height={16}
          className="icon-primary"
        />

        {/* Event title */}
        <div className="flex shrink-0 items-center gap-[12px] whitespace-pre text-nowrap font-['Suisse_Intl',_sans-serif] text-[12px] leading-normal">
          <p className="text-[var(--color-text-secondary)]">Sync &apos;25</p>
        </div>
      </div>

      {/* Right section - Sidebar toggle button */}
      <button
        onClick={onTogglePanel}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => {
          setIsPressed(false);
          setIsHovered(false);
        }}
        onMouseEnter={() => setIsHovered(true)}
        className="z-10 flex size-[20px] shrink-0 items-center justify-center rounded-[2px] transition-colors"
        style={{
          backgroundColor: isPressed
            ? "var(--color-surface-pressed)"
            : isHovered
            ? "var(--color-surface-hover)"
            : "transparent",
        }}
        aria-label={isPanelOpen ? "Hide schedule" : "Show schedule"}
      >
        <ThemedIcon
          src="/icons/IconSidebarSimpleRightSquare.svg"
          alt=""
          width={16}
          height={16}
          className="icon-primary"
        />
      </button>
    </div>
  );
}