export interface ScheduleItem {
  time: string;
  event: string;
  status?: "Upcoming" | "Active" | "Complete";
  last?: boolean;
}

export const scheduleData: ScheduleItem[] = [
  { time: "9:30 AM", event: "Welcome" },
  { time: "10:00 AM", event: "Opening keynote" },
  { time: "10:30 AM", event: "Product spotlight" },
  { time: "11:15 AM", event: "Break" },
  { time: "11:45 AM", event: "Fireside chat" },
  { time: "12:15 PM", event: "Lunch" },
  { time: "2:00 PM", event: "Open networks" },
  { time: "2:20 PM", event: "Spark update" },
  { time: "2:40 PM", event: "Break" },
  { time: "3:00 PM", event: "Working sessions" },
  { time: "4:30 PM", event: "Closing" },
  { time: "5:30 PM", event: "Happy hour" },
  { time: "6:30 PM", event: "Dinner" },
];
