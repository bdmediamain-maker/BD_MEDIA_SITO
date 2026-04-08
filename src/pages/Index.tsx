import { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import MarqueeStrip from "@/components/MarqueeStrip";
import KPIDashboard from "@/components/KPIDashboard";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import SEO from "@/components/SEO";
import { useContactModal } from "@/components/ContactModalContext";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/i18n/translations";
import { toast } from "sonner";

// ── JSON-LD Case Study Aeon Studio ───────────────────────────────────────────
const AEON_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Case Study Aeon Studio: da 7,4 a 85,8 lead al mese in 10 mesi con il Metodo BD",
  "description": "BD Media ha portato Aeon Studio da 194 lead in 26 mesi a 858 lead qualificati in 10 mesi, dimezzando il CPL (da €15,46 a €6,30) e raggiungendo un ROAS di 17,16x grazie a nuova architettura campagne Meta e funnel tracciabile.",
  "author": { "@type": "Organization", "name": "BD Media", "url": "https://bdmedia.it" },
  "publisher": { "@type": "Organization", "name": "BD Media", "url": "https://bdmedia.it" },
  "datePublished": "2025-09-01",
  "mainEntityOfPage": "https://bdmedia.it/#case-study",
  "about": {
    "@type": "Thing",
    "name": "Lead Generation con Meta Ads",
    "description": "+1059% lead in 10 mesi. CPL dimezzato. ROAS 17,16x."
  }
};

const Index = () => {
  const { open: openContactModal } = useContactModal();
  const { t } = useLanguage();
  const H = translations.home;
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  const handleInlineSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormLoading(true);
    const data = new FormData(e.currentTarget);
    try {
      const res = await fetch("https://formspree.io/f/xykbpjze", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setFormSubmitted(true);
        toast.success(t(H.inline_form.success));
      } else {
        toast.error("Errore nell'invio. Riprova.");
      }
    } catch {
      toast.error("Errore di rete. Riprova.");
    } finally {
      setFormLoading(false);
    }
  };

  const steps = [
    { num: "01", title: t(H.method.step1_title), desc: t(H.method.step1_body) },
    { num: "02", title: t(H.method.step2_title), desc: t(H.method.step2_body) },
    { num: "03", title: t(H.method.step3_title), desc: t(H.method.step3_body) },
  ];

  const caseMetrics = [
    { value: t(H.casestudy.metric1_value), label: t(H.casestudy.metric1_label) },
    { value: t(H.casestudy.metric2_value), label: t(H.casestudy.metric2_label) },
    { value: t(H.casestudy.metric3_value), label: t(H.casestudy.metric3_label) },
    { value: t(H.casestudy.metric4_value), label: t(H.casestudy.metric4_label) },
    { value: t(H.casestudy.metric5_value), label: t(H.casestudy.metric5_label) },
    { value: t(H.casestudy.metric6_value), label: t(H.casestudy.metric6_label) },
  ];

  return (
    <div>
      <SEO
        title="BD Media — Agenzia Performance Marketing Italia | Lead Generation & Meta Ads"
        description="Progettiamo sistemi di acquisizione clienti misurabili e scalabili. Meta Ads, funnel, lead generation per PMI italiane. Case study: +1059% lead per Aeon Studio in 10 mesi."
        ogUrl="https://bdmedia.it/"
        jsonLd={AEON_SCHEMA}
      />

      {/* Hero */}
      <section className="relative flex min-h-[80vh] items-end overflow-hidden px-6 pb-16 pt-24 md:px-12 lg:px-20">
        <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 select-none opacity-[0.02]">
          <img src="/logo_3_frecce_bdmedia.png" alt="" aria-hidden="true" width={843} height={596} className="h-[30vw] w-auto" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <ScrollReveal>
            <div className="eyebrow mb-6 flex items-center gap-3">
              <span className="h-px w-8 bg-primary" />
              {t(H.hero.eyebrow)}
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h1 className="heading-hero max-w-4xl">
              {t(H.hero.h1_line1)}<br />
              <span className="text-primary">{t(H.hero.h1_line2)}</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="mt-6 text-lg font-light text-muted-foreground">{t(H.hero.tagline)}</p>
            <p className="mt-4 max-w-2xl text-base text-muted-foreground">{t(H.hero.body)}</p>
          </ScrollReveal>
          <ScrollReveal delay={300}>
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <button onClick={openContactModal} className="btn-primary">{t(H.hero.cta_primary)}</button>
              <a href="#case-study" className="relative pb-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 after:ease-in-out hover:after:scale-x-100">
                {t(H.hero.cta_secondary)}
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <MarqueeStrip />

      {/* Stats / KPI Dashboard */}
      <section className="section-padding">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">{t(H.stats.title)}</h2>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <KPIDashboard />
          </ScrollReveal>
        </div>
      </section>

      {/* Metodo BD */}
      <section className="section-padding bg-surface-1">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">{t(H.method.title)}</h2>
            <p className="mt-2 text-muted-foreground">{t(H.method.subtitle)}</p>
            <p className="mt-6 max-w-2xl text-base text-muted-foreground">{t(H.method.intro)}</p>
          </ScrollReveal>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {steps.map((s, i) => (
              <ScrollReveal key={i} delay={i * 120}>
                <div className="card-surface relative overflow-hidden transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:border-primary/20 hover:shadow-[0_8px_30px_rgba(255,0,170,0.08)]">
                  <span className="absolute -right-2 -top-4 text-8xl font-extrabold text-primary/10">{s.num}</span>
                  <div className="relative z-10">
                    <span className="text-sm font-bold text-primary">{s.num}</span>
                    <h3 className="mt-2 text-xl font-bold">{s.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study */}
      <section id="case-study" className="section-padding">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <div className="eyebrow mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-primary" />
              {t(H.casestudy.category)}
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">{t(H.casestudy.label)}</h2>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <div className="mt-10 card-surface">
              <h3 className="text-2xl font-extrabold">{t(H.casestudy.client)}</h3>
              <p className="mt-1 text-lg font-semibold text-primary">{t(H.casestudy.headline)}</p>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">{t(H.casestudy.body)}</p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {caseMetrics.map((m, i) => (
                  <div key={i} className="rounded-lg bg-white/[0.03] p-5">
                    <div className="text-3xl font-extrabold">{m.value}</div>
                    <p className="mt-2 text-xs text-muted-foreground">{m.label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 space-y-3 rounded-lg bg-white/[0.03] p-5 text-sm">
                <div className="flex flex-wrap gap-x-8 gap-y-1">
                  <span className="text-muted-foreground">{t(H.casestudy.chart_leads_title)} — {t(H.casestudy.chart_before_label)}:</span>
                  <span className="font-semibold">7,4/mese</span>
                  <span className="text-primary">→</span>
                  <span className="text-muted-foreground">{t(H.casestudy.chart_after_label)}:</span>
                  <span className="font-semibold">85,8/mese</span>
                </div>
                <div className="flex flex-wrap gap-x-8 gap-y-1">
                  <span className="text-muted-foreground">{t(H.casestudy.chart_cpl_title)} — {t(H.casestudy.chart_before_label)}:</span>
                  <span className="font-semibold">€15,46/lead</span>
                  <span className="text-primary">→</span>
                  <span className="text-muted-foreground">{t(H.casestudy.chart_after_label)}:</span>
                  <span className="font-semibold">€6,30/lead</span>
                </div>
                <div>
                  <span className="text-muted-foreground">{t(H.casestudy.chart_conv_title)}: </span>
                  <span className="font-semibold text-primary">17,16x</span>
                </div>
              </div>
              <div className="mt-8">
                <button
                  onClick={() => openContactModal("Lead Generation")}
                  className="btn-primary"
                >
                  Voglio risultati come Aeon →
                </button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-surface-1">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">{t(H.testimonials.title)}</h2>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <div className="mt-12">
              <TestimonialCarousel />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Per chi lavoriamo */}
      <section className="section-padding">
        <div className="mx-auto max-w-3xl">
          <ScrollReveal>
            <div className="rounded-2xl border border-primary/30 bg-card p-8 md:p-10">
              <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">Per chi lavoriamo</h2>
              <p className="mt-4 text-base text-muted-foreground">BD Media è la scelta giusta se:</p>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-foreground">
                <li className="flex items-start gap-3">
                  <span className="mt-1 block h-2 w-2 shrink-0 rounded-full bg-primary" />
                  Hai un'attività con almeno €10K/mese di fatturato
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 block h-2 w-2 shrink-0 rounded-full bg-primary" />
                  Sei pronto a investire seriamente in advertising
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 block h-2 w-2 shrink-0 rounded-full bg-primary" />
                  Vuoi dati e risultati misurabili, non promesse vaghe
                </li>
              </ul>
              <p className="mt-6 text-sm italic text-muted-foreground">Se cerchi un freelance da €300/mese, non siamo il match giusto.</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden px-6 py-12 md:px-12 md:py-16 lg:px-20">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent" />
        <div className="relative mx-auto max-w-3xl text-center">
          <ScrollReveal>
            <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">{t(H.cta_final.headline)}</h2>
            <button onClick={openContactModal} className="btn-primary mt-5 inline-flex">{t(H.cta_final.button)}</button>
          </ScrollReveal>
        </div>
      </section>

      {/* Inline Form */}
      <section className="px-6 py-16 md:px-12 lg:px-20">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            {formSubmitted ? (
              <div className="rounded-xl border border-primary/20 bg-card p-8 text-center">
                <p className="text-lg font-semibold text-primary">{t(H.inline_form.success)}</p>
              </div>
            ) : (
              <form
                onSubmit={handleInlineSubmit}
                className="flex flex-col items-stretch gap-4 rounded-xl border border-white/[0.06] bg-card px-8 py-6 md:flex-row md:items-center md:gap-4"
              >
                <input type="hidden" name="_subject" value="Richiesta analisi gratuita (Homepage)" />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder={t(H.inline_form.email_placeholder)}
                  className="min-w-0 flex-1 rounded-lg border border-white/[0.06] bg-white/[0.03] px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/40 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-colors"
                />
                <input
                  type="url"
                  name="website"
                  placeholder={t(H.inline_form.website_placeholder)}
                  className="min-w-0 flex-1 rounded-lg border border-white/[0.06] bg-white/[0.03] px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/40 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-colors"
                />
                <button
                  type="submit"
                  disabled={formLoading}
                  className="btn-primary shrink-0 whitespace-nowrap disabled:opacity-60"
                >
                  {formLoading ? "..." : t(H.inline_form.submit)}
                </button>
              </form>
            )}
          </ScrollReveal>
        </div>
      </section>

    </div>
  );
};

export default Index;
