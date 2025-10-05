import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DVDScreensaver from "@/components/DVDScreensaver";
import SchedulePanel from "@/components/SchedulePanel";

export default function Home() {
  return (
    <div className="flex h-screen w-screen flex-col items-start bg-[var(--color-surface-base)]">
      {/* Header */}
      <Header />

      {/* Main container */}
      <div className="flex min-h-0 w-full flex-1 items-start">
        {/* Left canvas - DVD Screensaver (stays dark in both themes) */}
        <div className="h-full flex-1">
          <DVDScreensaver />
        </div>

        {/* Right panel - Schedule */}
        <SchedulePanel />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}