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
    <div 
      className="relative box-border flex h-[68px] w-full items-center justify-between px-[24px] py-0"
      style={state === "Complete" ? { opacity: 0.5 } : undefined}
    >
      {/* Border separator */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 border-b-[0.5px] border-[var(--color-border-tertiary)]"
      />

      {/* Time (Leading section) */}
      <div className="relative z-10 flex shrink-0 items-center justify-center gap-[8px]">
        {/* Active indicator dot */}
        {state === "Active" && (
          <div className="absolute left-[-16px] top-[14px] size-[8px] rounded-[2px] bg-[var(--active-indicator)]" />
        )}
        <p className="whitespace-pre text-nowrap font-['Suisse_Intl',_sans-serif] text-[20px] leading-[30px] tracking-[-0.6px] text-[var(--color-text-primary)]">
          {time}
        </p>
      </div>

      {/* Event name (Trailing section) */}
      <div className="flex shrink-0 items-center justify-center gap-[4px]">
        <p className="whitespace-pre text-nowrap font-['Suisse_Intl',_sans-serif] text-[20px] leading-[30px] tracking-[-0.6px] text-[var(--color-text-primary)]">
          {event}
        </p>
      </div>
    </div>
  );
}