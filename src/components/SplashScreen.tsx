import { useEffect, useState } from "react";

const SplashScreen = () => {
  const [mounted, setMounted] = useState(true);
  const [phase, setPhase] = useState<"draw" | "exit">("draw");

  useEffect(() => {
    const tExit = setTimeout(() => setPhase("exit"), 1500);
    const tUnmount = setTimeout(() => setMounted(false), 1500 + 800);
    return () => {
      clearTimeout(tExit);
      clearTimeout(tUnmount);
    };
  }, []);

  if (!mounted) return null;

  const size = 180;
  const stroke = 2.5;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;

  const isExit = phase === "exit";

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-background"
      style={{
        width: "100vw",
        height: "100vh",
        zIndex: 9999,
        opacity: isExit ? 0 : 1,
        transition: "opacity 0.8s ease-in-out",
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

      <div className="relative flex items-center justify-center">
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="absolute"
          style={{ transform: "rotate(-90deg)" }}
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
