import { useEffect, useState } from "react";

const SplashScreen = () => {
  const [mounted, setMounted] = useState(true);
  const [phase, setPhase] = useState<"draw" | "exit">("draw");

  useEffect(() => {
    // After circle finishes drawing (1.5s), trigger exit transition
    const tExit = setTimeout(() => setPhase("exit"), 1500);
    // After exit transition (0.8s), unmount
    const tUnmount = setTimeout(() => setMounted(false), 1500 + 800);
    return () => {
      clearTimeout(tExit);
      clearTimeout(tUnmount);
    };
  }, []);

  if (!mounted) return null;

  // Circle geometry
  const size = 180;
  const stroke = 2.5;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;

  // Navbar logo target (approx): horizontal padding 24-48px + half logo width (~50px),
  // vertical: navbar h-16 (64px) center => ~32px from top.
  // Compute translation from viewport center to target.
  const isExit = phase === "exit";

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-background"
      style={{
        width: "100vw",
        height: "100vh",
        zIndex: 9999,
        opacity: isExit ? 0 : 1,
        backdropFilter: isExit ? "blur(12px)" : "blur(0px)",
        WebkitBackdropFilter: isExit ? "blur(12px)" : "blur(0px)",
        transition:
          "opacity 0.8s ease-in-out, backdrop-filter 0.8s ease-in-out, -webkit-backdrop-filter 0.8s ease-in-out",
        pointerEvents: isExit ? "none" : "auto",
      }}
      aria-hidden="true"
    >
      <style>{`
        @keyframes splash-draw-circle {
          from { stroke-dashoffset: ${circumference}; }
          to { stroke-dashoffset: 0; }
        }
      `}</style>

      {/* Centered icon + circle wrapper that flies to navbar on exit */}
      <div
        className="relative flex items-center justify-center"
        style={{
          transition: "transform 0.8s cubic-bezier(0.65, 0, 0.35, 1), opacity 0.8s ease-in-out",
          transform: isExit
            ? `translate(calc(-50vw + 72px), calc(-50vh + 32px)) scale(0.28)`
            : "translate(0, 0) scale(1)",
          transformOrigin: "center center",
        }}
      >
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="absolute"
          style={{
            transform: "rotate(-90deg)",
            opacity: isExit ? 0 : 1,
            transition: "opacity 0.4s ease-out",
          }}
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth={stroke}
            strokeLinecap="round"
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: circumference,
              animation: "splash-draw-circle 1.5s ease-out forwards",
            }}
          />
        </svg>
        <img
          src="/logo_3_frecce_bdmedia.png"
          alt=""
          className="relative h-24 w-auto md:h-28 animate-scale-in"
        />
      </div>
    </div>
  );
};

export default SplashScreen;
