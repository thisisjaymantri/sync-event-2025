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

  // Separate schedule into completed and non-completed events
  const completedEvents = scheduleData.filter((item) => item.status === "Complete");
  const nonCompletedEvents = scheduleData.filter((item) => item.status !== "Complete");
  
  // Show only last 3 completed events if > 3
  const shouldShowFade = completedEvents.length > 3;
  const visibleCompletedEvents = shouldShowFade 
    ? completedEvents.slice(-3) 
    : completedEvents;

  return (
    <div className="relative flex h-full w-[420px] shrink-0 flex-col items-start overflow-clip">
      <div className="flex w-full shrink-0 flex-col items-start overflow-clip">
        {/* Completed events (last 3 if > 3) */}
        {visibleCompletedEvents.map((item, index) => (
          <ListItem
            key={`complete-${index}`}
            time={item.time}
            event={item.event}
            status={item.status}
            last={false}
          />
        ))}

        {/* Active and Upcoming events */}
        {nonCompletedEvents.map((item, index) => (
          <ListItem
            key={`active-upcoming-${index}`}
            time={item.time}
            event={item.event}
            status={item.status}
            last={index === nonCompletedEvents.length - 1}
          />
        ))}
      </div>

      {/* Gradient fade overlay (only if > 3 completed events) */}
      {shouldShowFade && (
        <div
          className="pointer-events-none absolute left-0 top-0 h-[72px] w-[420px] bg-gradient-to-t from-transparent to-[var(--color-surface-base)]"
          aria-hidden="true"
        />
      )}

      {/* Debug indicator (optional - remove in production) */}
      {process.env.NODE_ENV === "development" && (
        <div className="absolute bottom-2 right-2 z-10 rounded bg-black/50 px-2 py-1 text-[10px] text-white">
          {source}
        </div>
      )}
    </div>
  );
}