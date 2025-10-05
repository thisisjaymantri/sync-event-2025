interface ListItemProps {
  time?: string;
  event?: string;
  state?: "Default" | "Active" | "Complete";
}

export default function ListItem({
  time = "12:00 am",
  event = "Label",
  state = "Default",
}: ListItemProps) {
  return (
    <div className="relative box-border flex h-[72px] w-full items-center justify-between px-[24px]">
      {/* Border separator */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 border-b-[0.5px] border-[rgba(0,0,0,0.1)]"
      />

      {/* Time (Leading section) */}
      <div className="relative z-10 flex shrink-0 items-center gap-[8px]">
        {/* Active indicator dot */}
        {state === "Active" && (
          <div className="absolute left-[-16px] top-[14px] size-[8px] rounded-[2px] bg-[#09f309]" />
        )}
        <p className="whitespace-pre text-nowrap font-['Suisse_Intl',_sans-serif] text-[24px] leading-[36px] tracking-[-0.72px] text-[#1a1a1a]">
          {time}
        </p>
      </div>

      {/* Event name (Trailing section) */}
      <div className="flex shrink-0 items-center justify-center gap-[4px]">
        <p className="whitespace-pre text-nowrap font-['Suisse_Intl',_sans-serif] text-[24px] leading-[36px] tracking-[-0.72px] text-[#1a1a1a]">
          {event}
        </p>
      </div>
    </div>
  );
}
