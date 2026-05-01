import { useEffect, useState } from "react";

/**
 * SplashScreen — full-viewport overlay shown on page load.
 * Phase 1 (0 → 0.8s): icon scales from 0.3 to 1 and fades from 0 to 1 (ease-out).
 * Phase 2 (0.8s → 1.8s): icon rotates 360° clockwise, decelerating to a stop.
 */
const SplashScreen = () => {
  const [phase, setPhase] = useState<"in" | "spin">("in");

  useEffect(() => {
    // Trigger phase 1 transition on next frame
    const raf = requestAnimationFrame(() => {
      // no-op: initial render already at "in" state, transition kicks in via CSS class swap below
    });
    // Switch to phase 2 after phase 1 completes
    const tSpin = setTimeout(() => setPhase("spin"), 800);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(tSpin);
    };
  }, []);

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
      <style>{`
        @keyframes splash-grow-in {
          0% { opacity: 0; transform: scale(0.3); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes splash-spin-once {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .splash-icon-in {
          animation: splash-grow-in 0.8s ease-out forwards;
        }
        .splash-icon-spin {
          opacity: 1;
          animation: splash-spin-once 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
      <img
        src="/logo-full.png"
        alt=""
        className={phase === "in" ? "splash-icon-in" : "splash-icon-spin"}
        style={{ width: 80, height: 80, objectFit: "contain", transformOrigin: "center center" }}
      />
    </div>
  );
};

export default SplashScreen;
