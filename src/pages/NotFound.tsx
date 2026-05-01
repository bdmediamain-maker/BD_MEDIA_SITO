import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useContactModal } from "@/components/ContactModalContext";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/i18n/translations";

const NotFound = () => {
  const location = useLocation();
  const { open: openContactModal } = useContactModal();
  const { t } = useLanguage();
  const N = translations.notfound;

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-24">
      <div className="mx-auto max-w-xl text-center">

        {/* Eyebrow */}
        <div className="eyebrow mb-6 flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-primary" />
          {t(N.eyebrow)}
          <span className="h-px w-8 bg-primary" />
        </div>

        {/* Numero 404 */}
        <p className="text-[clamp(6rem,20vw,10rem)] font-extrabold leading-none tracking-[-4px] text-primary opacity-90">
          404
        </p>

        {/* Headline ironica */}
        <h1 className="mt-4 text-2xl font-extrabold leading-tight tracking-tight md:text-3xl">
          {t(N.headline_1)}
          <br />
          <span className="text-primary">{t(N.headline_2)}</span>
        </h1>

        {/* Body */}
        <p className="mt-5 text-base text-muted-foreground">
          {t(N.body_1)}{" "}
          {t(N.body_2)}
          <br className="hidden sm:block" />
          {t(N.body_3)}
        </p>

        {/* Divider decorativo */}
        <div className="mx-auto my-8 flex items-center gap-4">
          <div className="h-px flex-1 bg-white/[0.06]" />
          <span className="text-xs text-primary">✦</span>
          <div className="h-px flex-1 bg-white/[0.06]" />
        </div>

        {/* 3 CTA */}
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link to="/" className="btn-primary">
            {t(N.cta_home)}
          </Link>

          <Link
            to="/portfolio"
            className="relative pb-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 after:ease-in-out hover:after:scale-x-100"
          >
            {t(N.cta_portfolio)}
          </Link>

          <button
            onClick={openContactModal}
            className="relative pb-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 after:ease-in-out hover:after:scale-x-100"
          >
            {t(N.cta_contact)}
          </button>
        </div>

        {/* Nota a piè di pagina */}
        <p className="mt-10 text-xs text-muted-foreground/40">
          {t(N.attempted)} <code className="text-primary/60">{location.pathname}</code>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
