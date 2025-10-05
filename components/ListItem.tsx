interface ListItemProps {
  time?: string;
  event?: string;
  status?: "Upcoming" | "Active" | "Complete";
  last?: boolean;
}

export default function ListItem({
  time = "12:00 AM",
  event = "Label",
  status = "Upcoming",
  last = false,
}: ListItemProps) {
  return (
    <div 
      className="relative box-border flex h-[68px] w-full items-center justify-between px-[24px] py-0"
      style={status === "Complete" ? { opacity: 0.5 } : undefined}
    >
      {/* Border separator - hidden on last item */}
      {!last && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 border-b-[0.5px] border-[var(--color-border-tertiary)]"
        />
      )}

      {/* Time (Leading section) */}
      <div className="relative z-10 flex shrink-0 items-center justify-center gap-[8px]">
        {/* Indicator (Active status) */}
        {status === "Active" && (
          <div className="absolute left-[-16px] top-1/2 size-[8px] -translate-y-1/2 rounded-[2px] bg-[var(--active-indicator)]" />
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