import { useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";

const CALENDLY_URL = "https://calendly.com/bdmedia-main";
const CALENDLY_SCRIPT = "https://assets.calendly.com/assets/external/widget.js";
const CALENDLY_CSS = "https://assets.calendly.com/assets/external/widget.css";

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (opts: { url: string }) => void;
    };
  }
}

const ensureCalendlyLoaded = () => {
  if (typeof document === "undefined") return;
  if (!document.querySelector(`link[href="${CALENDLY_CSS}"]`)) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = CALENDLY_CSS;
    document.head.appendChild(link);
  }
  if (!document.querySelector(`script[src="${CALENDLY_SCRIPT}"]`)) {
    const script = document.createElement("script");
    script.src = CALENDLY_SCRIPT;
    script.async = true;
    document.body.appendChild(script);
  }
};

const FloatingCalendlyWidget = () => {
  const { lang } = useLanguage();
  const label = lang === "it" ? "Prenota una call gratuita →" : "Book a free call →";
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    ensureCalendlyLoaded();

    const btn = btnRef.current;
    if (!btn) return;

    let touchHandled = false;

    const openPopup = (e: Event) => {
      e.preventDefault();
      if (typeof window !== "undefined" && window.Calendly) {
        window.Calendly.initPopupWidget({ url: CALENDLY_URL });
      }
    };

    const onTouchEnd = (e: TouchEvent) => {
      touchHandled = true;
      openPopup(e);
      // Reset after the synthetic click would have fired
      window.setTimeout(() => { touchHandled = false; }, 500);
    };

    const onClick = (e: MouseEvent) => {
      // Avoid double-trigger on touch devices that also fire click after touchend
      if (touchHandled) {
        e.preventDefault();
        return;
      }
      openPopup(e);
    };

    btn.addEventListener("touchend", onTouchEnd, { passive: false });
    btn.addEventListener("click", onClick);

    return () => {
      btn.removeEventListener("touchend", onTouchEnd);
      btn.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <button
        ref={btnRef}
        type="button"
        className="btn-primary no-glow inline-flex"
      >
        {label}
      </button>
    </div>
  );
};

export default FloatingCalendlyWidget;
