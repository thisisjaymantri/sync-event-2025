import Image from "next/image";

export default function Footer() {
  return (
    <div className="relative box-border flex h-[32px] w-full shrink-0 items-center justify-between px-[12px]">
      {/* Border */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 border-t border-[rgba(255,255,255,0.1)]"
      />

      {/* Left section */}
      <div className="z-10 flex h-[24px] shrink-0 items-center gap-[48px] whitespace-pre text-nowrap font-['Suisse_Intl',_sans-serif] text-[12px] leading-normal">
        <div className="flex shrink-0 items-center gap-[4px]">
          <p className="text-[rgba(255,255,255,0.7)]">BTC/USD</p>
          <p className="text-[rgba(255,255,255,0.5)]">$200,020.48</p>
        </div>
        <p className="text-[rgba(255,255,255,0.5)]">Sync &apos;25</p>
        <p className="text-[rgba(255,255,255,0.5)]">Los Angeles, CA</p>
      </div>

      {/* Right section */}
      <div className="z-10 flex shrink-0 items-center gap-[24px]">
        {/* Theme toggle */}
        <div className="box-border flex shrink-0 items-center gap-0 rounded-[4px] bg-[rgba(255,255,255,0.04)] p-[2px]">
          <div className="relative size-[16px] shrink-0 rounded-[3.2px] opacity-50">
            <Image
              src="/icons/sun.svg"
              alt="Light theme"
              fill
              className="object-contain"
            />
          </div>
          <div className="relative size-[16px] shrink-0 rounded-[3.2px] bg-black">
            <Image
              src="/icons/moon.svg"
              alt="Dark theme"
              fill
              className="object-contain"
            />
          </div>
          <div className="relative size-[16px] shrink-0 rounded-[3.2px] opacity-50">
            <Image
              src="/icons/theme.svg"
              alt="System theme"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Mute button */}
        <div className="relative size-[16px] shrink-0 opacity-50">
          <Image
            src="/icons/mute.svg"
            alt="Mute"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}
