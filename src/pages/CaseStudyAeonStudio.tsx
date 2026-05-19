import ScrollReveal from "@/components/ScrollReveal";
import CtaScarcityNote from "@/components/CtaScarcityNote";
import SEO from "@/components/SEO";
import { useContactModal } from "@/components/ContactModalContext";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/i18n/translations";

const CaseStudyAeonStudio = () => {
  const { open: openContactModal } = useContactModal();
  const { t } = useLanguage();
  const C = translations.case_aeon;
  const SE = translations.seo;

  const metrics = [
    { value: "858",     label: t(C.m1_label) },
    { value: "+1059%",  label: t(C.m2_label) },
    { value: "17,16x",  label: t(C.m3_label) },
    { value: "€6,30",   label: t(C.m4_label) },
    { value: "2,46%",   label: t(C.m5_label) },
    { value: "€5,17",   label: t(C.m6_label) },
  ];

  const phases = [
    { step: "01", title: t(C.phase1_title), desc: t(C.phase1_desc) },
    { step: "02", title: t(C.phase2_title), desc: t(C.phase2_desc) },
    { step: "03", title: t(C.phase3_title), desc: t(C.phase3_desc) },
  ];

  return (
    <div>
      <SEO
        title={t(C.seo_title)}
        description={t(C.seo_desc)}
        ogUrl="https://bdmedia.it/case-study/aeon-studio"
      />

      {/* Hero */}
      <section className="section-padding pt-32">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <div className="eyebrow mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-primary" />
              {t(C.eyebrow)}
            </div>
            <h1 className="heading-hero max-w-4xl">
              {t(C.h1_pre)} <span className="text-primary">{t(C.h1_highlight)}</span>
            </h1>
            <p className="mt-4 text-lg font-light text-muted-foreground">
              {t(C.sub)}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Il cliente */}
      <section className="section-padding pt-0">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <div className="card-surface">
              <h2 className="text-xl font-extrabold tracking-tight">{t(C.client_title)}</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                <strong className="text-foreground">{t(C.client_pre)}</strong> {t(C.client_body)}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Il problema */}
      <section className="section-padding pt-0">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <div className="card-surface border-l-2 border-l-primary/40">
              <h2 className="text-xl font-extrabold tracking-tight">{t(C.problem_title)}</h2>
              <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
                <p>
                  {t(C.problem_p1_a)} <strong className="text-foreground">{t(C.problem_p1_b)}</strong> {t(C.problem_p1_c)} <strong className="text-foreground">{t(C.problem_p1_d)}</strong> {t(C.problem_p1_e)} <strong className="text-foreground">{t(C.problem_p1_f)}</strong>{t(C.problem_p1_end)}
                </p>
                <p>{t(C.problem_p2)}</p>
                <p>{t(C.problem_p3)}</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Il processo */}
      <section className="section-padding pt-0">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <h2 className="text-2xl font-extrabold tracking-tight">{t(C.process_title)}</h2>
          </ScrollReveal>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {phases.map((p, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="card-surface h-full">
                  <span className="text-3xl font-extrabold text-primary/30">{p.step}</span>
                  <h3 className="mt-2 text-base font-bold">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Risultati */}
      <section className="section-padding pt-0">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <h2 className="text-2xl font-extrabold tracking-tight">{t(C.results_title)}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{t(C.results_sub)}</p>
          </ScrollReveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {metrics.map((m, i) => (
              <ScrollReveal key={i} delay={i * 60}>
                <div className="relative overflow-hidden rounded-xl border border-white/[0.06] bg-card p-6">
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
                  <div className="text-3xl font-extrabold">{m.value}</div>
                  <p className="mt-2 text-xs text-muted-foreground">{m.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Before/After summary */}
          <ScrollReveal delay={200}>
            <div className="mt-8 space-y-3 rounded-xl border border-white/[0.06] bg-card p-6 text-sm">
              <div className="flex flex-wrap gap-x-8 gap-y-1">
                <span className="text-muted-foreground">{t(C.leads_month_before)}</span>
                <span className="font-semibold">7,4</span>
                <span className="text-primary">→</span>
                <span className="text-muted-foreground">{t(C.after_label)}</span>
                <span className="font-semibold">85,8</span>
              </div>
              <div className="flex flex-wrap gap-x-8 gap-y-1">
                <span className="text-muted-foreground">{t(C.cpl_before)}</span>
                <span className="font-semibold">€15,46</span>
                <span className="text-primary">→</span>
                <span className="text-muted-foreground">{t(C.after_label)}</span>
                <span className="font-semibold">€6,30</span>
              </div>
              <div>
                <span className="text-muted-foreground">{t(C.roas_label)} </span>
                <span className="font-semibold text-primary">17,16x</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section
        className="section-padding relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(13,0,16,0.85) 0%, rgba(26,0,48,0.90) 50%, rgba(13,0,16,0.85) 100%)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        <div className="relative mx-auto max-w-3xl text-center">
          <ScrollReveal>
            <h2 className="text-3xl font-extrabold tracking-tight">{t(C.cta_h2)}</h2>
            <CtaScarcityNote />
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => openContactModal("Lead Generation")}
                className="btn-primary inline-flex"
              >
                {t(C.cta_btn)}
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default CaseStudyAeonStudio;
