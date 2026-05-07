import { useEffect } from "react";
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

  useEffect(() => {
    ensureCalendlyLoaded();
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (typeof window === "undefined") return;
    if (window.innerWidth < 768) {
      window.open(CALENDLY_URL, "_blank");
    } else if (window.Calendly) {
      window.Calendly.initPopupWidget({ url: CALENDLY_URL });
    } else {
      window.open(CALENDLY_URL, "_blank");
    }
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 md:left-auto md:right-6 md:translate-x-0 z-[100]">
      <button
        type="button"
        onClick={handleClick}
        className="btn-primary no-glow inline-flex text-xs px-3 py-2 md:text-base md:px-6 md:py-3"
      >
        {label}
      </button>
    </div>
  );
};

export default FloatingCalendlyWidget;
