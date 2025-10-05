"use client";

import { useEffect, useState } from "react";
import { scheduleData as fallbackData } from "@/lib/schedule-data";
import ListItem from "./ListItem";

interface ScheduleItem {
  time: string;
  event: string;
  status?: "Upcoming" | "Active" | "Complete";
}

export default function SchedulePanel() {
  const [scheduleData, setScheduleData] = useState<ScheduleItem[]>(fallbackData);
  const [source, setSource] = useState<string>("loading");

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await fetch("/api/schedule");
        const result = await response.json();
        setScheduleData(result.data);
        setSource(result.source);
      } catch (error) {
        console.error("Failed to fetch schedule:", error);
        // Keep using fallback data
        setSource("local-error");
      }
    };

    // Initial fetch
    fetchSchedule();

    // Refresh every 30 seconds
    const interval = setInterval(fetchSchedule, 30000);

    return () => clearInterval(interval);
  }, []);

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
      {/* Debug indicator (optional - remove in production) */}
      {process.env.NODE_ENV === "development" && (
        <div className="absolute bottom-2 right-2 rounded bg-black/50 px-2 py-1 text-[10px] text-white">
          {source}
        </div>
      )}
    </div>
  );
}