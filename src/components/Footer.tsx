import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/i18n/translations";

const Footer = () => {
  const { t } = useLanguage();
  const T = translations.footer;

  return (
    <footer className="border-t border-white/[0.06] bg-background px-6 py-12 md:px-12 lg:px-20">
      <div className="mx-auto max-w-7xl">
        {/* Mobile: flex-col stack pulito. Desktop: logo sx | center assoluto | social dx */}
        <div className="flex flex-col items-center gap-8 md:relative md:flex-row md:items-center md:justify-between">

          {/* Logo */}
          <div>
            <Link to="/">
              <img
                src="/logo-full.png"
                alt="BD Media"
                loading="lazy"
                width={683}
                height={183}
                className="block h-[53px] w-auto"
              />
            </Link>
          </div>

          {/* Contatti + Link legali — stack su mobile, centrato assoluto su desktop */}
          <div className="flex flex-col items-center gap-3 md:absolute md:left-1/2 md:-translate-x-1/2 md:gap-4">
            {/* Email e telefono: colonna su mobile, riga da sm in su */}
            <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-6">
              <a href="mailto:bdmedia.main@gmail.com" className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                bdmedia.main@gmail.com
              </a>
              <a href="tel:+393382862017" className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                +39 338 286 2017
              </a>
            </div>
            {/* Link legali */}
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              <Link to="/privacy" className="transition-colors hover:text-foreground">{t(T.privacy)}</Link>
              <Link to="/termini" className="transition-colors hover:text-foreground">{t(T.termini)}</Link>
              <Link to="/rimborsi" className="transition-colors hover:text-foreground">Rimborsi</Link>
            </div>
          </div>

          {/* Social */}
          <div className="flex gap-4">
            <a href="https://www.instagram.com/bdmedia.agency/" target="_blank" rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.06] text-muted-foreground transition-colors hover:border-primary hover:text-primary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a href="https://www.linkedin.com/404/" target="_blank" rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.06] text-muted-foreground transition-colors hover:border-primary hover:text-primary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
          </div>
        </div>

        <div className="mt-10 border-t border-white/[0.06] pt-6 text-center text-xs text-muted-foreground">
          {t(T.copyright)}
        </div>

        {/* Dati legali — obbligatori per legge (art. 2250 c.c. + DPR 633/72) */}
        {/* TODO: sostituire i placeholder con i dati reali prima del go-live */}
        <p className="mt-2 text-center text-[10px] leading-relaxed text-muted-foreground/35">
          BD Media [forma giuridica] — Sede legale: [via, città, CAP] — P.IVA / CF: [XXXXXXXXX] — REA: [XX-XXXXXX]
        </p>
      </div>
    </footer>
  );
};

export default Footer;
