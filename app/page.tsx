"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DVDScreensaver from "@/components/DVDScreensaver";
import SchedulePanel from "@/components/SchedulePanel";

export default function Home() {
  const [isPanelOpen, setIsPanelOpen] = useState(true);

  return (
    <div className="flex h-screen w-screen flex-col items-start">
      {/* Header */}
      <Header 
        onTogglePanel={() => setIsPanelOpen(!isPanelOpen)}
        isPanelOpen={isPanelOpen}
      />

      {/* Main container */}
      <div className="flex min-h-0 w-full flex-1 items-start">
        {/* Left canvas - DVD Screensaver */}
        <div className="h-full flex-1">
          <DVDScreensaver />
        </div>

        {/* Right panel - Schedule with slide animation and dynamic width */}
        <div
          className={`h-full overflow-hidden transition-all duration-300 ease-in-out ${
            isPanelOpen ? "w-[420px]" : "w-0"
          }`}
        >
          <div className="h-full w-[420px]">
            <SchedulePanel />
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}