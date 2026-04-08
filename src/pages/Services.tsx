import { useState, useEffect } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import SEO from "@/components/SEO";
import { useContactModal } from "@/components/ContactModalContext";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/i18n/translations";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)");
    const onChange = () => setIsDesktop(mql.matches);
    mql.addEventListener("change", onChange);
    setIsDesktop(mql.matches);
    return () => mql.removeEventListener("change", onChange);
  }, []);
  return isDesktop;
};

const coreServiceTags = [
  ["Meta Ads", "Google Ads", "TikTok Ads", "LinkedIn Ads", "Funnel Strategy"],
  ["Landing Page", "Nurturing", "Lead Scoring", "CRO"],
  ["Design", "Sviluppo", "CRO"],
];

const integratedServiceTags = [
  ["Logo", "Visual Identity", "Brand Guidelines"],
  ["Automazioni", "Newsletter", "DEM"],
  ["Instagram", "TikTok", "Content Plan"],
];

const onDemandServiceTags = [
  ["CRM", "Automazioni", "Integrazioni"],
  ["AI Tools", "Automazione", "Personalizzazione"],
  ["Influencer", "UGC", "Content Creator Network"],
  ["Print on Demand", "Corporate", "Eventi"],
];

const Services = () => {
  const { open: openContactModal } = useContactModal();
  const { t } = useLanguage();
  const S = translations.services;
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);
  const isDesktop = useIsDesktop();

  const coreServices = [
    { num: "01", title: t(S.s1_title), desc: t(S.s1_body), tags: coreServiceTags[0] },
    { num: "02", title: t(S.s10_title), desc: t(S.s10_body), tags: coreServiceTags[1] },
    { num: "03", title: t(S.s2_title), desc: t(S.s2_body), tags: coreServiceTags[2] },
  ];

  const integratedServices = [
    { num: "04", title: t(S.s5_title), desc: t(S.s5_body), tags: integratedServiceTags[0] },
    { num: "05", title: t(S.s6_title), desc: t(S.s6_body), tags: integratedServiceTags[1] },
    { num: "06", title: t(S.s4_title), desc: t(S.s4_body), tags: integratedServiceTags[2] },
  ];

  const onDemandServices = [
    { num: "07", title: t(S.s3_title), desc: t(S.s3_body), tags: onDemandServiceTags[0] },
    { num: "08", title: t(S.s7_title), desc: t(S.s7_body), tags: onDemandServiceTags[1] },
    { num: "09", title: t(S.s8_title), desc: t(S.s8_body), tags: onDemandServiceTags[2] },
    { num: "10", title: t(S.s9_title), desc: t(S.s9_body), tags: onDemandServiceTags[3] },
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

      {/* Hero */}
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

      {/* ── GROUP 1: Core ── */}
      <section className="section-padding !pt-0">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <div className="mb-8">
              <span className="eyebrow">{t(S.group_core)}</span>
              <p className="mt-1 text-sm text-muted-foreground">{t(S.group_core_desc)}</p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {coreServices.map((s, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="card-surface group relative h-full border-l-2 border-l-transparent p-8 transition-all duration-200 hover:border-l-primary hover:bg-white/[0.03]">
                  <span className="text-4xl font-black leading-none text-primary/30">{s.num}</span>
                  <h3 className="mt-3 text-xl font-bold leading-tight text-foreground">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {s.tags?.map((tag) => (
                      <span key={tag} className="tag-pill text-[10px] px-2 py-0.5">{tag}</span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── GROUP 2: Integrated ── */}
      <section className="section-padding !pt-0">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <div className="mb-8">
              <span className="eyebrow">{t(S.group_integrated)}</span>
              <p className="mt-1 text-sm text-muted-foreground">{t(S.group_integrated_desc)}</p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {integratedServices.map((s, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="card-surface group relative h-full border-l-2 border-l-transparent px-6 py-5 transition-all duration-200 hover:border-l-primary hover:bg-white/[0.03]">
                  <span className="text-2xl font-black leading-none text-primary/20">{s.num}</span>
                  <h3 className="mt-2 text-[16px] font-bold leading-tight text-foreground">{s.title}</h3>
                  <p className="mt-2 text-[13px] leading-snug text-muted-foreground">{s.desc}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {s.tags?.map((tag) => (
                      <span key={tag} className="tag-pill text-[10px] px-2 py-0.5">{tag}</span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── GROUP 3: On-Demand (accordion) ── */}
      <section className="section-padding !pt-0">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <div className="mb-8">
              <span className="eyebrow">{t(S.group_ondemand)}</span>
              <p className="mt-1 text-sm text-muted-foreground">{t(S.group_ondemand_desc)}</p>
            </div>
          </ScrollReveal>
          <div className="space-y-2">
            {onDemandServices.map((s, i) => {
              const isOpen = openAccordion === i;
              return (
                <ScrollReveal key={i} delay={i * 60}>
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => setOpenAccordion(isOpen ? null : i)}
                    onMouseEnter={() => isDesktop && setOpenAccordion(i)}
                    onMouseLeave={() => isDesktop && setOpenAccordion(null)}
                    className="w-full text-left cursor-pointer"
                  >
                    className="w-full text-left"
                  >
                    <div
                      className={cn(
                        "rounded-xl border border-white/[0.06] bg-card px-6 py-4 transition-all duration-200",
                        isOpen && "border-primary/20 bg-white/[0.03]"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <span className="text-lg font-black text-primary/25">{s.num}</span>
                          <h3 className="text-[15px] font-bold text-foreground">{s.title}</h3>
                        </div>
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200",
                            isOpen && "rotate-180"
                          )}
                        />
                      </div>
                      <div
                        className={cn(
                          "grid transition-all duration-300 ease-in-out",
                          isOpen ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr] opacity-0"
                        )}
                      >
                        <div className="overflow-hidden">
                          <p className="text-[13px] leading-relaxed text-muted-foreground pl-10">{s.desc}</p>
                          <div className="mt-3 flex flex-wrap gap-1.5 pl-10">
                            {s.tags?.map((tag) => (
                              <span key={tag} className="tag-pill text-[10px] px-2 py-0.5">{tag}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* How We Work */}
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

      {/* CTA */}
      <section className="section-padding relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent" />
        <div className="relative mx-auto max-w-3xl text-center">
          <ScrollReveal>
            <h2 className="text-3xl font-extrabold tracking-tight">{t(S.cta_headline)}</h2>
            <button onClick={() => openContactModal("Ads & Funnel")} className="btn-primary mt-8 inline-flex">Costruisci il tuo sistema →</button>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default Services;
