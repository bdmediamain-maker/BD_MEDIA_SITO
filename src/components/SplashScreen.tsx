import { useEffect, useState } from "react";

/**
 * SplashScreen — overlay that recreates the BD Media logo
 * with 3 independent "inverted L" arrow shapes arranged diagonally
 * from bottom-left (smallest, dark) to top-right (largest, magenta).
 *
 * No animation yet — pure static composition.
 */
const SplashScreen = () => {
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setMounted(false), 2500);
    return () => clearTimeout(t);
  }, []);

  if (!mounted) return null;

  // Arrow shape: a rectangle with the bottom-right corner cut out,
  // forming an "inverted L". Built as an SVG path with rounded corners (r=6).
  // Base unit size — each arrow is scaled from this.
  const Arrow = ({
    size,
    color,
    style,
  }: {
    size: number;
    color: string;
    style?: React.CSSProperties;
  }) => {
    // Shape proportions (square bounding box of `size`)
    // Thickness of the L stroke = ~38% of size
    const t = size * 0.38;
    const r = 6; // border-radius
    // Path: outer L = full square minus bottom-right square (size-t)
    // Points (clockwise starting top-left):
    // (0,0) -> (size,0) -> (size,t) -> (t,t) -> (t,size) -> (0,size) -> close
    // We use an SVG path with rounded corners via arc commands.
    const d = `
      M ${r},0
      L ${size - r},0
      Q ${size},0 ${size},${r}
      L ${size},${t - r}
      Q ${size},${t} ${size - r},${t}
      L ${t + r},${t}
      Q ${t},${t} ${t},${t + r}
      L ${t},${size - r}
      Q ${t},${size} ${t - r},${size}
      L ${r},${size}
      Q 0,${size} 0,${size - r}
      L 0,${r}
      Q 0,0 ${r},0
      Z
    `;

    return (
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ position: "absolute", ...style }}
      >
        <path d={d} fill={color} />
      </svg>
    );
  };

  // Sizes (scaled crescente) and diagonal placement.
  // Container is centered; each arrow is absolutely positioned.
  const small = 56;   // bottom-left, antracite
  const mid = 84;     // middle, viola
  const big = 120;    // top-right, magenta

  // Diagonal step: each arrow nested toward top-right
  const step = 28;

  // Container size to fit all arrows
  const containerW = big + step * 2 + small * 0.4;
  const containerH = big + step * 2 + small * 0.4;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-background"
      style={{
        width: "100vw",
        height: "100vh",
        zIndex: 9999,
      }}
      aria-hidden="true"
    >
      <div
        className="relative"
        style={{ width: containerW, height: containerH }}
      >
        {/* Bottom-left: smallest, dark anthracite */}
        <Arrow
          size={small}
          color="hsl(0 0% 12%)"
          style={{
            left: 0,
            bottom: 0,
          }}
        />
        {/* Middle: viola */}
        <Arrow
          size={mid}
          color="hsl(280 70% 45%)"
          style={{
            left: step,
            bottom: step,
          }}
        />
        {/* Top-right: largest, magenta (brand primary) */}
        <Arrow
          size={big}
          color="hsl(var(--primary))"
          style={{
            left: step * 2,
            bottom: step * 2,
          }}
        />
      </div>
    </div>
  );
};

export default SplashScreen;
