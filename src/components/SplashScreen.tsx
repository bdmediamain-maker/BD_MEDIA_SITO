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
  const [animateIn, setAnimateIn] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    // Trigger fly-in on next frame so transitions apply
    const raf = requestAnimationFrame(() => setAnimateIn(true));
    // After arrows have settled (1.2s), trigger exit
    const tExit = setTimeout(() => setExiting(true), 1200);
    // After exit (0.6s) + buffer, unmount
    const tUnmount = setTimeout(() => setMounted(false), 2500);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(tExit);
      clearTimeout(tUnmount);
    };
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
        {/* Bouncy ease-out for the final settle */}
        {(() => {
          const easing = "cubic-bezier(0.34, 1.56, 0.64, 1)";
          const transition = `transform 0.8s ${easing}, opacity 0.8s ease-out`;
          // Off-screen offsets (large enough to be outside any viewport)
          const darkFrom = "translate(-120vw, 120vh)";   // bottom-left out
          const violetFrom = "translate(-120vw, 0)";     // left out
          const magentaFrom = "translate(120vw, -120vh)"; // top-right out
          const settled = "translate(0, 0)";

          return (
            <>
              {/* Bottom-left: smallest, dark anthracite */}
              <Arrow
                size={small}
                color="hsl(0 0% 12%)"
                style={{
                  left: 0,
                  bottom: 0,
                  transform: animateIn ? settled : darkFrom,
                  opacity: animateIn ? 1 : 0,
                  transition,
                }}
              />
              {/* Middle: viola */}
              <Arrow
                size={mid}
                color="hsl(280 70% 45%)"
                style={{
                  left: step,
                  bottom: step,
                  transform: animateIn ? settled : violetFrom,
                  opacity: animateIn ? 1 : 0,
                  transition,
                }}
              />
              {/* Top-right: largest, magenta (brand primary) */}
              <Arrow
                size={big}
                color="hsl(var(--primary))"
                style={{
                  left: step * 2,
                  bottom: step * 2,
                  transform: animateIn ? settled : magentaFrom,
                  opacity: animateIn ? 1 : 0,
                  transition,
                }}
              />
            </>
          );
        })()}
      </div>
    </div>
  );
};

export default SplashScreen;
