import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import CaseStudyInteractive from "@/components/CaseStudyInteractive";
import CtaScarcityNote from "@/components/CtaScarcityNote";
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

  // Hero parallax refs
  const heroSectionRef = useRef<HTMLElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroSubtitleRef = useRef<HTMLParagraphElement>(null);
  const heroCtaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let rafId: number | null = null;
    let ticking = false;

    const update = () => {
      const section = heroSectionRef.current;
      if (!section) { ticking = false; return; }
      const rect = section.getBoundingClientRect();
      const scrolled = Math.max(0, -rect.top);
      // Cap so content never leaves the hero section
      const maxShift = Math.max(0, section.offsetHeight * 0.25);
      const s = Math.min(scrolled, maxShift);

      // Reduce parallax intensity on mobile (<768px) for a near-imperceptible, smooth effect
      const isMobile = window.innerWidth < 768;
      const titleSpeed = isMobile ? 0.05 : 0.4;
      const subtitleSpeed = isMobile ? 0.05 : 0.25;
      const ctaSpeed = isMobile ? 0.05 : 0.15;

      if (heroTitleRef.current)
        heroTitleRef.current.style.transform = `translate3d(0, ${s * titleSpeed}px, 0)`;
      if (heroSubtitleRef.current)
        heroSubtitleRef.current.style.transform = `translate3d(0, ${s * subtitleSpeed}px, 0)`;
      if (heroCtaRef.current)
        heroCtaRef.current.style.transform = `translate3d(0, ${s * ctaSpeed}px, 0)`;

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        rafId = requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
      if (heroTitleRef.current) heroTitleRef.current.style.transform = "";
      if (heroSubtitleRef.current) heroSubtitleRef.current.style.transform = "";
      if (heroCtaRef.current) heroCtaRef.current.style.transform = "";
    };
  }, []);

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
        title={t(translations.seo.home_title)}
        description={t(translations.seo.home_desc)}
        ogUrl="https://bdmedia.it/"
        jsonLd={AEON_SCHEMA}
      />

      {/* Hero */}
      <section ref={heroSectionRef} className="relative flex min-h-[80vh] items-end overflow-hidden px-6 pb-16 pt-24 md:px-12 lg:px-20">
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
            <h1 ref={heroTitleRef} className="heading-hero max-w-4xl will-change-transform">
              {t(H.hero.h1_line1)}<br />
              {t(H.hero.h1_line2)}<br />
              <span className="mt-2 inline-block text-primary">{t(H.hero.h1_line3)}</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p ref={heroSubtitleRef} className="mt-4 max-w-2xl text-base text-muted-foreground will-change-transform">{t(H.hero.body)}</p>
          </ScrollReveal>
          <ScrollReveal delay={300}>
            <div ref={heroCtaRef} className="mt-8 flex flex-wrap items-center gap-5 will-change-transform">
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
      <section className="section-padding">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">{t(H.method.title)}</h2>
            <p className="mt-2 text-muted-foreground">{t(H.method.subtitle)}</p>
            <p className="mt-6 max-w-2xl text-base text-muted-foreground">{t(H.method.intro)}</p>
          </ScrollReveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
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
            <p className="mt-2 text-lg text-muted-foreground">
              {t(H.casestudy.client)} — {t(H.casestudy.headline)}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <div className="mt-10">
              <CaseStudyInteractive onCtaClick={() => openContactModal("Lead Generation")} />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Testimonials */}
      <section
        className="section-padding"
        style={{ background: "linear-gradient(135deg, #0d0010 0%, #1a0030 50%, #0d0010 100%)" }}
      >
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">{t(H.testimonials.title)}</h2>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <div className="mt-8">
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
              <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">{t(H.who_we_work.title)}</h2>
              <p className="mt-4 text-base text-muted-foreground">{t(H.who_we_work.subtitle)}</p>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-foreground">
                <li className="flex items-center gap-2">
                  <span className="block h-2 w-2 shrink-0 rounded-full bg-primary" />
                  {t(H.who_we_work.item1)}
                </li>
                <li className="flex items-center gap-2">
                  <span className="block h-2 w-2 shrink-0 rounded-full bg-primary" />
                  {t(H.who_we_work.item2)}
                </li>
                <li className="flex items-center gap-2">
                  <span className="block h-2 w-2 shrink-0 rounded-full bg-primary" />
                  {t(H.who_we_work.item3)}
                </li>
              </ul>
              <p className="mt-6 text-sm italic text-muted-foreground">{t(H.who_we_work.note)}</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section
        className="relative overflow-hidden px-6 py-12 md:px-12 md:py-16 lg:px-20"
        style={{
          background: "linear-gradient(135deg, rgba(13,0,16,0.85) 0%, rgba(26,0,48,0.90) 50%, rgba(13,0,16,0.85) 100%)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        <div className="relative mx-auto max-w-3xl text-center">
          <ScrollReveal>
            <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">{t(H.cta_final.headline)}</h2>
            <CtaScarcityNote />
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              <button onClick={openContactModal} className="btn-primary inline-flex">{t(H.cta_final.button)}</button>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </div>
  );
};

export default Index;
