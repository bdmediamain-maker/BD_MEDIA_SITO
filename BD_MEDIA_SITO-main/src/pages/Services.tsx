import ScrollReveal from "@/components/ScrollReveal";
import SEO from "@/components/SEO";
import { useContactModal } from "@/components/ContactModalContext";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/i18n/translations";

const serviceTags = [
  ["Meta Ads", "Google Ads", "TikTok Ads", "LinkedIn Ads", "Funnel Strategy"],
  ["Design", "Sviluppo", "CRO"],
  ["CRM", "Automazioni", "Integrazioni"],
  ["Instagram", "TikTok", "Content Plan"],
  ["Logo", "Visual Identity", "Brand Guidelines"],
  ["Automazioni", "Newsletter", "DEM"],
  ["AI Tools", "Automazione", "Personalizzazione"],
  ["Influencer", "UGC", "Content Creator Network"],
  ["Print on Demand", "Corporate", "Eventi"],
];

const Services = () => {
  const { open: openContactModal } = useContactModal();
  const { t } = useLanguage();
  const S = translations.services;

  const serviceKeys = [
    { num: "01", title: t(S.s1_title), desc: t(S.s1_body) },
    { num: "02", title: t(S.s2_title), desc: t(S.s2_body) },
    { num: "03", title: t(S.s3_title), desc: t(S.s3_body) },
    { num: "04", title: t(S.s4_title), desc: t(S.s4_body) },
    { num: "05", title: t(S.s5_title), desc: t(S.s5_body) },
    { num: "06", title: t(S.s6_title), desc: t(S.s6_body) },
    { num: "07", title: t(S.s7_title), desc: t(S.s7_body) },
    { num: "08", title: t(S.s8_title), desc: t(S.s8_body) },
    { num: "09", title: t(S.s9_title), desc: t(S.s9_body) },
  ];

  const howWeWork = [
    { title: t(S.how1_title), desc: t(S.how1_body) },
    { title: t(S.how2_title), desc: t(S.how2_body) },
    { title: t(S.how3_title), desc: t(S.how3_body) },
    { title: t(S.how4_title), desc: t(S.how4_body) },
  ];

  return (
    <div>
      <SEO
        title="Servizi di Marketing Performance | Meta Ads, Lead Generation, Web | BD Media"
        description="Campagne Meta Ads, Google, TikTok, siti web ad alta conversione, social media management, brand identity e automazioni. BD Media, agenzia performance marketing per PMI italiane."
        ogUrl="https://bdmedia.it/services"
      />

      <section className="section-padding pt-32">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <div className="eyebrow mb-4 flex items-center gap-3"><span className="h-px w-8 bg-primary" />{t(S.hero.eyebrow)}</div>
            <h1 className="heading-hero max-w-3xl">{t(S.hero.h1)}</h1>
            <p className="mt-4 text-lg font-light text-muted-foreground">{t(S.hero.subtitle)}</p>
            <p className="mt-4 max-w-2xl text-base text-muted-foreground">{t(S.hero.body)}</p>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <div className="mt-12 rounded-xl border-l-2 border-primary bg-surface-1 p-6">
              <p className="text-sm leading-relaxed text-muted-foreground">{t(S.note.body)}</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-padding !pt-0">
        <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {serviceKeys.map((s, i) => (
            <div
              key={i}
              className="card-surface group relative border-l-2 border-l-transparent px-5 py-4 transition-all duration-200 hover:border-l-primary hover:bg-white/[0.03]"
            >
              <span className="text-2xl font-black leading-none text-primary/20">{s.num}</span>
              <h3 className="mt-1 text-[16px] font-bold leading-tight text-foreground">{s.title}</h3>
              <p className="mt-1 text-[13px] leading-snug text-muted-foreground">{s.desc}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {serviceTags[i]?.map((tag) => (
                  <span key={tag} className="tag-pill text-[10px] px-2 py-0.5">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section-padding">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <h2 className="text-3xl font-extrabold tracking-tight">{t(S.how_subtitle)}</h2>
          </ScrollReveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {howWeWork.map((h, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="card-surface h-full transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:border-primary/20 hover:shadow-[0_8px_30px_rgba(255,0,170,0.08)]">
                  <h3 className="text-base font-bold">{h.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{h.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent" />
        <div className="relative mx-auto max-w-3xl text-center">
          <ScrollReveal>
            <h2 className="text-3xl font-extrabold tracking-tight">{t(S.cta_headline)}</h2>
            <button onClick={openContactModal} className="btn-primary mt-8 inline-flex">{t(S.cta_button)}</button>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default Services;
