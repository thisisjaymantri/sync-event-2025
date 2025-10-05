export interface ScheduleItem {
  time: string;
  event: string;
  state?: "Default" | "Active" | "Complete";
}

export const scheduleData: ScheduleItem[] = [
  { time: "9:30 am", event: "Welcome", state: "Active" },
  { time: "10:00 am", event: "Opening keynote" },
  { time: "10:30 am", event: "Product spotlight" },
  { time: "11:15 am", event: "Break" },
  { time: "11:45 am", event: "Fireside chat" },
  { time: "12:15 pm", event: "Lunch" },
  { time: "2:00 pm", event: "Open networks" },
  { time: "2:20 pm", event: "Spark update" },
  { time: "2:40 pm", event: "Break" },
  { time: "3:00 pm", event: "Working sessions" },
  { time: "4:30 pm", event: "Closing" },
  { time: "5:30 pm", event: "Happy hour" },
  { time: "6:30 pm", event: "Dinner" },
];
