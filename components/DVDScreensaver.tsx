"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function DVDScreensaver() {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);

  // Position and velocity state
  const positionRef = useRef({ x: 100, y: 100 });
  // Random initial velocities for unpredictable movement
  const velocityRef = useRef({ 
    dx: 0.5 + Math.random() * 0.6, // Random between 0.5-1.1
    dy: 0.5 + Math.random() * 0.6  // Random between 0.5-1.1
  });
  const [currentColor, setCurrentColor] = useState("#FF0000"); // Start with red
  
  // RGB color palette
  const colors = ["#FF0000", "#00FF00", "#0000FF"]; // Red, Green, Blue
  const colorIndexRef = useRef(0);

  // Logo dimensions
  const LOGO_WIDTH = 268.612;
  const LOGO_HEIGHT = 96;

  useEffect(() => {
    const container = containerRef.current;
    const logo = logoRef.current;

    if (!container || !logo) return;

    const animate = () => {
      const containerRect = container.getBoundingClientRect();
      const containerWidth = containerRect.width;
      const containerHeight = containerRect.height;

      // Update position
      positionRef.current.x += velocityRef.current.dx;
      positionRef.current.y += velocityRef.current.dy;

      // Check horizontal boundaries
      if (
        positionRef.current.x <= 0 ||
        positionRef.current.x >= containerWidth - LOGO_WIDTH
      ) {
        velocityRef.current.dx *= -1;
        // Add slight randomness to velocity on bounce for unpredictability
        velocityRef.current.dx += (Math.random() - 0.5) * 0.2;
        velocityRef.current.dx = Math.max(0.5, Math.min(1.1, Math.abs(velocityRef.current.dx))) * Math.sign(velocityRef.current.dx);
        // Cycle to next color: Red -> Green -> Blue -> Red
        colorIndexRef.current = (colorIndexRef.current + 1) % colors.length;
        setCurrentColor(colors[colorIndexRef.current]);
        // Clamp position to prevent getting stuck
        positionRef.current.x = Math.max(
          0,
          Math.min(positionRef.current.x, containerWidth - LOGO_WIDTH)
        );
      }

      // Check vertical boundaries
      if (
        positionRef.current.y <= 0 ||
        positionRef.current.y >= containerHeight - LOGO_HEIGHT
      ) {
        velocityRef.current.dy *= -1;
        // Add slight randomness to velocity on bounce
        velocityRef.current.dy += (Math.random() - 0.5) * 0.2;
        velocityRef.current.dy = Math.max(0.5, Math.min(1.1, Math.abs(velocityRef.current.dy))) * Math.sign(velocityRef.current.dy);
        // Cycle to next color
        colorIndexRef.current = (colorIndexRef.current + 1) % colors.length;
        setCurrentColor(colors[colorIndexRef.current]);
        // Clamp position to prevent getting stuck
        positionRef.current.y = Math.max(
          0,
          Math.min(positionRef.current.y, containerHeight - LOGO_HEIGHT)
        );
      }

      // Apply transformations
      logo.style.transform = `translate(${positionRef.current.x}px, ${positionRef.current.y}px)`;

      // Continue animation
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    animationFrameRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full overflow-hidden bg-[var(--color-surface-primary)]"
    >
      {/* Border right */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 border-r border-[rgba(255,255,255,0.1)]"
      />

      {/* Bouncing logo */}
      <div
        ref={logoRef}
        className="absolute will-change-transform"
        style={{
          width: `${LOGO_WIDTH}px`,
          height: `${LOGO_HEIGHT}px`,
        }}
      >
        {/* SVG with color overlay using mix-blend-mode */}
        <div className="relative h-full w-full">
          <Image
            src="/sync-wordmark.svg"
            alt="Sync '25"
            width={LOGO_WIDTH}
            height={LOGO_HEIGHT}
            className="h-full w-full"
            priority
          />
          {/* Color overlay */}
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: currentColor,
              mixBlendMode: "multiply",
              opacity: 0.85,
            }}
          />
        </div>
      </div>
    </div>
  );
}
