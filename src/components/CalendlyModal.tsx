import { ReactNode } from "react";
import { useLanguage } from "@/context/LanguageContext";

const CALENDLY_URL = "https://calendly.com/bdmedia-main";

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (opts: { url: string }) => void;
    };
  }
}

// Kept as a no-op wrapper for backward compatibility with App.tsx
export const CalendlyModalProvider = ({ children }: { children: ReactNode }) => <>{children}</>;

export const openCalendly = () => {
  if (typeof window !== "undefined" && window.Calendly) {
    window.Calendly.initPopupWidget({ url: CALENDLY_URL });
  }
};

export const CalendlyButton = ({ className = "" }: { className?: string }) => {
  const { lang } = useLanguage();
  const label = lang === "it" ? "Prenota una call gratuita →" : "Book a free call →";
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        openCalendly();
      }}
      className={`btn-primary inline-flex ${className}`}
    >
      {label}
    </button>
  );
};
