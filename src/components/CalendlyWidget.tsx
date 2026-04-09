import { useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";

declare global {
  interface Window {
    Calendly?: {
      initBadgeWidget: (opts: Record<string, unknown>) => void;
    };
  }
}

export default function CalendlyWidget() {
  const { lang } = useLanguage();
  const ready = useRef(false);

  useEffect(() => {
    const init = () => {
      // Calendly internally destroys the previous badge when re-called
      window.Calendly!.initBadgeWidget({
        url: "https://calendly.com/bdmedia-main/30min?background_color=1a1a1a&text_color=ffffff&primary_color=ff00ec",
        text: lang === "it" ? "Prenota una call" : "Schedule time with me",
        color: "#1a1a1a",
        textColor: "#ffffff",
        branding: true,
      });
    };

    if (window.Calendly) {
      init();
      return;
    }

    // Wait for external script
    const id = setInterval(() => {
      if (window.Calendly) {
        clearInterval(id);
        init();
      }
    }, 300);
    return () => clearInterval(id);
  }, [lang]);

  return null;
}
