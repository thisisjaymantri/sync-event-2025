import Image from "next/image";

export default function Header() {
  return (
    <div className="relative box-border flex h-[32px] w-full shrink-0 items-center justify-between px-[12px] py-[4px]">
      {/* Border */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 border-b border-[rgba(255,255,255,0.1)]"
      />

      {/* Left section */}
      <div className="z-10 flex h-[24px] shrink-0 items-center gap-[24px]">
        {/* Lightspark Logo */}
        <div className="relative h-[16px] w-[25.375px] shrink-0">
          <Image
            src="/icons/lightspark-logo.svg"
            alt="Lightspark"
            fill
            className="object-contain"
          />
        </div>

        {/* Breadcrumb navigation */}
        <div className="flex shrink-0 items-center gap-[12px] whitespace-pre text-nowrap font-['Suisse_Intl',_sans-serif] text-[12px] leading-normal">
          <p className="text-[rgba(255,255,255,0.5)]">Sync &apos;25</p>
          <p className="text-white">/</p>
          <p className="text-[rgba(255,255,255,0.5)]">Keynote</p>
        </div>
      </div>

      {/* Right section - Sidebar toggle */}
      <div className="relative z-10 size-[16px] shrink-0">
        <Image
          src="/icons/sidebar.svg"
          alt="Toggle sidebar"
          fill
          className="object-contain"
        />
      </div>
    </div>
  );
}
