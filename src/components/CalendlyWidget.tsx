import { useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

declare global {
  interface Window {
    Calendly?: {
      initBadgeWidget: (opts: Record<string, unknown>) => void;
      destroyBadgeWidget?: () => void;
    };
  }
}

export default function CalendlyWidget() {
  const { lang } = useLanguage();

  useEffect(() => {
    const init = () => {
      // Remove any existing badge widget
      document.querySelectorAll(".calendly-badge-widget").forEach((el) => el.remove());

      window.Calendly?.initBadgeWidget({
        url: "https://calendly.com/bdmedia-main/30min?background_color=1a1a1a&text_color=ffffff&primary_color=ff00ec",
        text: lang === "it" ? "Prenota una call" : "Schedule time with me",
        color: "#1a1a1a",
        textColor: "#ffffff",
        branding: true,
      });
    };

    if (window.Calendly) {
      init();
    } else {
      // Wait for the external script to load
      const check = setInterval(() => {
        if (window.Calendly) {
          clearInterval(check);
          init();
        }
      }, 200);
      return () => clearInterval(check);
    }
  }, [lang]);

  return null;
}
