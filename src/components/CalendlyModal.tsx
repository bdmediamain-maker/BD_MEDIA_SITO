import { useState, createContext, useContext, ReactNode } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useLanguage } from "@/context/LanguageContext";

const CALENDLY_URL =
  "https://calendly.com/bdmedia-main/30min?background_color=1a1a1a&text_color=ffffff&primary_color=ff00ec";

type Ctx = { open: () => void; close: () => void };
const CalendlyModalContext = createContext<Ctx | null>(null);

export const CalendlyModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <CalendlyModalContext.Provider value={{ open: () => setIsOpen(true), close: () => setIsOpen(false) }}>
      {children}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl w-[95vw] p-0 overflow-hidden border-white/10 bg-[#1a1a1a]">
          <iframe
            src={CALENDLY_URL}
            title="Calendly - Prenota una call"
            className="w-full"
            style={{ height: "700px", border: 0 }}
            loading="lazy"
          />
        </DialogContent>
      </Dialog>
    </CalendlyModalContext.Provider>
  );
};

export const useCalendlyModal = () => {
  const ctx = useContext(CalendlyModalContext);
  if (!ctx) throw new Error("useCalendlyModal must be used within CalendlyModalProvider");
  return ctx;
};

export const CalendlyButton = ({ className = "" }: { className?: string }) => {
  const { open } = useCalendlyModal();
  const { lang } = useLanguage();
  const label = lang === "it" ? "Prenota una call gratuita →" : "Book a free call →";
  return (
    <button onClick={open} className={`btn-primary inline-flex ${className}`}>
      {label}
    </button>
  );
};
