import ScrollReveal from "@/components/ScrollReveal";
import SEO from "@/components/SEO";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/i18n/translations";

const LegalPage = ({ title, updated, children }: { title: string; updated: string; children: React.ReactNode }) => (
  <div className="section-padding pt-32">
    <div className="mx-auto max-w-3xl">
      <ScrollReveal>
        <h1 className="text-4xl font-extrabold tracking-tight">{title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{updated}</p>
      </ScrollReveal>
      <ScrollReveal delay={100}>
        <div className="mt-12 space-y-8 text-sm leading-relaxed text-muted-foreground [&_h2]:mb-3 [&_h2]:mt-8 [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-foreground [&_p]:mb-3">
          {children}
        </div>
      </ScrollReveal>
    </div>
  </div>
);

export const Privacy = () => {
  const { t } = useLanguage();
  const T = translations.privacy;
  return (
    <>
      <SEO
        title="Privacy Policy | BD Media"
        description="Informativa sul trattamento dei dati personali di BD Media, ai sensi del GDPR (Reg. UE 2016/679) e del D.Lgs. 196/2003."
        ogUrl="https://bdmedia.it/privacy"
      />
      <LegalPage title={t(T.h1)} updated={t(T.updated)}>
      <h2>{t(T.s1_title)}</h2>
      <p>{t(T.s1_body)}</p>
      <h2>{t(T.s2_title)}</h2>
      <p>{t(T.s2_body)}</p>
      <h2>{t(T.s3_title)}</h2>
      <p>{t(T.s3_body)}</p>
      <h2>{t(T.s4_title)}</h2>
      <p>{t(T.s4_body)}</p>
      <h2>{t(T.s5_title)}</h2>
      <p>{t(T.s5_body)}</p>
      <h2>{t(T.s6_title)}</h2>
      <p>{t(T.s6_body)}</p>
      <h2>{t(T.s7_title)}</h2>
      <p>{t(T.s7_body)}</p>
    </LegalPage>
    </>
  );
};

export const Rimborsi = () => {
  const { t } = useLanguage();
  const T = translations.rimborsi;
  return (
    <>
      <SEO
        title="Politica Rimborsi | BD Media"
        description="Politica rimborsi e recesso di BD Media. Condizioni e procedure per richieste di rimborso sui servizi acquistati."
        ogUrl="https://bdmedia.it/rimborsi"
      />
      <LegalPage title={t(T.h1)} updated={t(T.updated)}>
      <h2>{t(T.s1_title)}</h2>
      <p>{t(T.s1_body)}</p>
      <h2>{t(T.s2_title)}</h2>
      <p>{t(T.s2_body)}</p>
      <h2>{t(T.s3_title)}</h2>
      <p>{t(T.s3_body)}</p>
      <h2>{t(T.s4_title)}</h2>
      <p>{t(T.s4_body)}</p>
      <h2>{t(T.s5_title)}</h2>
      <p>{t(T.s5_body)}</p>
    </LegalPage>
    </>
  );
};

export const Termini = () => {
  const { t } = useLanguage();
  const T = translations.termini;
  return (
    <>
      <SEO
        title="Termini e Condizioni | BD Media"
        description="Termini e condizioni di servizio di BD Media. Regolamentazione dei rapporti contrattuali tra BD Media e i propri clienti."
        ogUrl="https://bdmedia.it/termini"
      />
      <LegalPage title={t(T.h1)} updated={t(T.updated)}>
      <h2>{t(T.s1_title)}</h2>
      <p>{t(T.s1_body)}</p>
      <h2>{t(T.s2_title)}</h2>
      <p>{t(T.s2_body)}</p>
      <h2>{t(T.s3_title)}</h2>
      <p>{t(T.s3_body)}</p>
      <h2>{t(T.s4_title)}</h2>
      <p>{t(T.s4_body)}</p>
      <h2>{t(T.s5_title)}</h2>
      <p>{t(T.s5_body)}</p>
      <h2>{t(T.s6_title)}</h2>
      <p>{t(T.s6_body)}</p>
      <h2>{t(T.s7_title)}</h2>
      <p>{t(T.s7_body)}</p>
    </LegalPage>
    </>
  );
};
