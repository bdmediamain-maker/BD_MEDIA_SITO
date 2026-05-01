import { useEffect, useRef, useState } from "react";

const CustomCursor = () => {
  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(pointer: coarse)").matches;
  });
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: -100, y: -100 });
  const dotPos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const hovering = useRef(false);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // Disable on touch devices
    if (typeof window === "undefined") return;
    const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    if (isTouch) return;

    const prevBodyCursor = document.body.style.cursor;
    document.body.style.cursor = "none";

    const styleEl = document.createElement("style");
    styleEl.setAttribute("data-custom-cursor", "true");
    styleEl.textContent = `
      html, body, *, *::before, *::after { cursor: none !important; }
    `;
    document.head.appendChild(styleEl);

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      const interactive = !!t.closest('a, button, [role="button"], input[type="submit"], input[type="button"], label[for], select, summary');
      if (interactive !== hovering.current) {
        hovering.current = interactive;
        if (dotRef.current) {
          dotRef.current.style.transform += ""; // no-op, scale handled via class
        }
        if (dotRef.current) dotRef.current.dataset.hover = interactive ? "1" : "0";
        if (ringRef.current) ringRef.current.dataset.hover = interactive ? "1" : "0";
      }
    };

    const onLeave = () => {
      mouse.current.x = -100;
      mouse.current.y = -100;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseleave", onLeave);

    const lerp = (a: number, b: number, n: number) => a + (b - a) * n;

    const tick = () => {
      dotPos.current.x = lerp(dotPos.current.x, mouse.current.x, 0.15);
      dotPos.current.y = lerp(dotPos.current.y, mouse.current.y, 0.15);
      ringPos.current.x = lerp(ringPos.current.x, mouse.current.x, 0.08);
      ringPos.current.y = lerp(ringPos.current.y, mouse.current.y, 0.08);

      const dotScale = hovering.current ? 1.5 : 1;
      const ringScale = hovering.current ? 1.5 : 1;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotPos.current.x}px, ${dotPos.current.y}px, 0) translate(-50%, -50%) scale(${dotScale})`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%) scale(${ringScale})`;
      }

      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);

    return () => {
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeave);
      document.body.style.cursor = prevBodyCursor;
      styleEl.remove();
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 12,
          height: 12,
          borderRadius: "9999px",
          backgroundColor: "hsl(var(--primary))",
          opacity: 0.85,
          pointerEvents: "none",
          zIndex: 99999,
          transition: "transform 0.18s ease-out, opacity 0.2s ease-out",
          willChange: "transform",
          mixBlendMode: "normal",
        }}
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 36,
          height: 36,
          borderRadius: "9999px",
          border: "1.5px solid hsl(var(--primary))",
          opacity: 0.4,
          pointerEvents: "none",
          zIndex: 99999,
          transition: "transform 0.25s ease-out, opacity 0.2s ease-out",
          willChange: "transform",
        }}
      />
    </>
  );
};

export default CustomCursor;
