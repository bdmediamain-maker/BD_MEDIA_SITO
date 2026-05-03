import { useLanguage } from "@/context/LanguageContext";

const CtaScarcityNote = () => {
  const { lang } = useLanguage();
  const text =
    lang === "en"
      ? "We accept only 3 new clients per month — 1 spot left"
      : "Accettiamo solo 3 nuovi clienti al mese — 1 posto rimasto";

  return (
    <div className="mt-4 flex items-center justify-center gap-2 text-[14px] leading-none text-white/80">
      <span className="relative inline-flex h-2.5 w-2.5 shrink-0 items-center justify-center">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
      </span>
      <span className="leading-none">{text}</span>
    </div>
  );
};

export default CtaScarcityNote;
