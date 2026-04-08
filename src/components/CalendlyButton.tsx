import { useEffect } from "react";
import { Calendar } from "lucide-react";

const CALENDLY_URL = "https://calendly.com/bdmedia-main/30min";

const CalendlyButton = () => {
  useEffect(() => {
    const id = "calendly-widget-script";
    if (!document.getElementById(id)) {
      const s = document.createElement("script");
      s.id = id;
      s.src = "https://assets.calendly.com/assets/external/widget.js";
      s.async = true;
      document.head.appendChild(s);
    }
    // Also load Calendly CSS
    const cssId = "calendly-widget-css";
    if (!document.getElementById(cssId)) {
      const link = document.createElement("link");
      link.id = cssId;
      link.rel = "stylesheet";
      link.href = "https://assets.calendly.com/assets/external/widget.css";
      document.head.appendChild(link);
    }
  }, []);

  const handleClick = () => {
    if ((window as any).Calendly) {
      (window as any).Calendly.initPopupWidget({ url: CALENDLY_URL });
    }
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-[90] flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105 active:scale-95 sm:bottom-8 sm:right-8"
      aria-label="Prenota una call su Calendly"
    >
      <Calendar className="h-4 w-4" />
      Prenota una call →
    </button>
  );
};

export default CalendlyButton;
