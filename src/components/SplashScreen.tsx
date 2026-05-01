import { useEffect, useState } from "react";

/**
 * SplashScreen — full-viewport overlay shown on page load.
 * Phase 1 (0 → 0.8s):  icon scales from 0.3 → 1, fades 0 → 1 (ease-out).
 * Phase 2 (0.8 → 1.8s): icon rotates 360° clockwise, decelerating to a stop.
 * Phase 3 (1.8 → 2.4s): icon shrinks & flies to navbar logo position;
 *                       background blurs (0 → 16px) and fades to opacity 0.
 * After 2.4s the component unmounts.
 */
const SplashScreen = () => {
  const [phase, setPhase] = useState<"in" | "spin" | "exit">("in");
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    const tSpin = setTimeout(() => setPhase("spin"), 800);
    const tExit = setTimeout(() => setPhase("exit"), 1800);
    const tUnmount = setTimeout(() => setMounted(false), 2400);
    return () => {
      clearTimeout(tSpin);
      clearTimeout(tExit);
      clearTimeout(tUnmount);
    };
  }, []);

  if (!mounted) return null;

  const exiting = phase === "exit";

  // Navbar logo target (md): height 53px, left padding ~48px (md:px-12),
  // vertical centered in h-16 navbar => center at y ≈ 32px from top.
  // Logo is `h-[53px] w-auto` — assume aspect-ratio ~3:1 → ~160px wide,
  // so its horizontal center ≈ 48 + 80 = 128px from left.
  // Splash icon is 80×80 centered. We translate from viewport center to
  // (128px, 32px) and scale to ~0.66 (53/80).
  const exitTransform =
    "translate(calc(-50vw + 128px), calc(-50vh + 32px)) scale(0.66)";

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-background"
      style={{
        width: "100vw",
        height: "100vh",
        zIndex: 9999,
        opacity: exiting ? 0 : 1,
        backdropFilter: exiting ? "blur(16px)" : "blur(0px)",
        WebkitBackdropFilter: exiting ? "blur(16px)" : "blur(0px)",
        transition:
          "opacity 0.6s ease-in-out, backdrop-filter 0.6s ease-in-out, -webkit-backdrop-filter 0.6s ease-in-out",
        pointerEvents: exiting ? "none" : "auto",
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
        .splash-icon-exit {
          opacity: 1;
          transition: transform 0.6s cubic-bezier(0.65, 0, 0.35, 1);
        }
      `}</style>
      <img
        src="/logo-full.png"
        alt=""
        className={
          phase === "in"
            ? "splash-icon-in"
            : phase === "spin"
            ? "splash-icon-spin"
            : "splash-icon-exit"
        }
        style={{
          width: 80,
          height: 80,
          objectFit: "contain",
          transformOrigin: "center center",
          ...(exiting ? { transform: exitTransform } : null),
        }}
      />
    </div>
  );
};

export default SplashScreen;
