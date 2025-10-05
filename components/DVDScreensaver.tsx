"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function DVDScreensaver() {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);

  // Position and velocity state
  const positionRef = useRef({ x: 100, y: 100 });
  const velocityRef = useRef({ dx: 2, dy: 2 });
  const hueRef = useRef(0); // For RGB color cycling

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
        // Cycle through RGB: Red (0°) -> Green (120°) -> Blue (240°) -> Red
        hueRef.current = (hueRef.current + 120) % 360;
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
        // Cycle through RGB
        hueRef.current = (hueRef.current + 120) % 360;
        // Clamp position to prevent getting stuck
        positionRef.current.y = Math.max(
          0,
          Math.min(positionRef.current.y, containerHeight - LOGO_HEIGHT)
        );
      }

      // Apply transformations
      logo.style.transform = `translate(${positionRef.current.x}px, ${positionRef.current.y}px)`;
      logo.style.filter = `hue-rotate(${hueRef.current}deg) saturate(1.2)`;

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
      className="relative h-full w-full overflow-hidden bg-[#111111]"
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
        <Image
          src="/sync-logo.svg"
          alt="Sync"
          width={LOGO_WIDTH}
          height={LOGO_HEIGHT}
          className="h-full w-full"
          priority
        />
      </div>
    </div>
  );
}
