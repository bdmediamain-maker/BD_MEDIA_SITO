import { useEffect, useRef, useState } from "react";

const CustomCursor = () => {
  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(pointer: coarse)").matches;
  });
  const imgRef = useRef<HTMLImageElement>(null);
  const mouse = useRef({ x: -100, y: -100 });
  const pos = useRef({ x: -100, y: -100 });
  const hovering = useRef(false);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia("(pointer: coarse)");
    const updateTouch = () => setIsTouchDevice(mql.matches);
    updateTouch();
    mql.addEventListener?.("change", updateTouch);
    if (mql.matches) {
      return () => mql.removeEventListener?.("change", updateTouch);
    }

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
      hovering.current = interactive;
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
      pos.current.x = lerp(pos.current.x, mouse.current.x, 0.20);
      pos.current.y = lerp(pos.current.y, mouse.current.y, 0.20);

      const scale = hovering.current ? 1.3 : 1;

      if (imgRef.current) {
        imgRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%) scale(${scale})`;
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
      mql.removeEventListener?.("change", updateTouch);
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <img
      ref={imgRef}
      src="/logo_3_frecce_bdmedia.png"
      alt=""
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 67,
        height: 67,
        pointerEvents: "none",
        zIndex: 99999,
        transition: "transform 0.18s ease-out",
        willChange: "transform",
      }}
    />
  );
};

export default CustomCursor;

