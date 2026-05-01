import { useLanguage } from "@/context/LanguageContext";

const CALENDLY_URL = "https://calendly.com/bdmedia-main";

const FloatingCalendlyWidget = () => {
  const { lang } = useLanguage();
  const label = lang === "it" ? "Prenota una call gratuita →" : "Book a free call →";

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <a
        href={CALENDLY_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary no-glow inline-flex"
      >
        {label}
      </a>
    </div>
  );
};

export default FloatingCalendlyWidget;
