import { scheduleData } from "@/lib/schedule-data";
import ListItem from "./ListItem";

export default function SchedulePanel() {
  return (
    <div className="flex h-full w-[420px] shrink-0 flex-col items-start overflow-clip bg-[var(--color-surface-base)]">
      <div className="flex w-full shrink-0 flex-col items-start overflow-clip">
            {scheduleData.map((item, index) => (
              <ListItem
                key={index}
                time={item.time}
                event={item.event}
                status={item.status}
              />
            ))}
      </div>
    </div>
  );
}