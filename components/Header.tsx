"use client";

import ThemedIcon from "./ThemedIcon";

export default function Header() {
  return (
    <div className="relative box-border flex h-[32px] w-full shrink-0 items-center justify-between px-[12px] py-[4px]">
      {/* Border */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 border-b border-[var(--color-border-tertiary)]"
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

      {/* Right section - Sidebar toggle */}
      <ThemedIcon
        src="/icons/IconSidebarSimpleRightSquare.svg"
        alt="Toggle sidebar"
        width={16}
        height={16}
        className="icon-primary z-10"
      />
    </div>
  );
}