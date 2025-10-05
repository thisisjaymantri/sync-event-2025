import Image from "next/image";

interface ThemedIconProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

/**
 * ThemedIcon component that applies theme-aware coloring to SVG icons
 * 
 * SVGs with fill/stroke will inherit colors from CSS variables:
 * - Light mode: Uses --color-icon-primary or --color-icon-secondary
 * - Dark mode: Automatically adjusted via theme variables
 */
export default function ThemedIcon({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
}: ThemedIconProps) {
  return (
    <div
      className={`themed-icon ${className}`}
      style={{
        width: width ? `${width}px` : "100%",
        height: height ? `${height}px` : "100%",
        position: "relative",
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill={!width && !height}
        width={width}
        height={height}
        className="icon-svg"
        priority={priority}
      />
    </div>
  );
}
