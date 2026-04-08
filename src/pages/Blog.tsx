import { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import SEO from "@/components/SEO";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/i18n/translations";

const catBadgeColors: Record<string, { bg: string; text: string; border: string }> = {
  AI: { bg: "rgba(167,139,250,0.15)", text: "#a78bfa", border: "rgba(167,139,250,0.3)" },
  SEO: { bg: "rgba(52,211,153,0.15)", text: "#34d399", border: "rgba(52,211,153,0.3)" },
  Advertising: { bg: "rgba(251,146,60,0.15)", text: "#fb923c", border: "rgba(251,146,60,0.3)" },
  "Social Media": { bg: "rgba(56,189,248,0.15)", text: "#38bdf8", border: "rgba(56,189,248,0.3)" },
  "Digital Marketing": { bg: "rgba(244,114,182,0.15)", text: "#f472b6", border: "rgba(244,114,182,0.3)" },
};

const articles = [
  {
    cat: "AI",
    title: "AI Agents nel Marketing: come stanno rivoluzionando ogni fase del funnel nel 2026",
    date: "8 Gen 2026",
    time: "7 min",
    url: "https://martech.org/how-ai-agents-will-reshape-every-part-of-marketing-in-2026/",
    source: "martech.org",
  },
  {
    cat: "SEO",
    title: "Answer Engine Optimization: come farti citare da ChatGPT, Perplexity e Google AI Overview",
    date: "Mar 2026",
    time: "8 min",
    url: "https://www.frase.io/blog/what-is-answer-engine-optimization-the-complete-guide-to-getting-cited-by-ai",
    source: "frase.io",
  },
  {
    cat: "Advertising",
    title: "Meta Advantage+ Marzo 2026: AI Dubbing, musica generativa e ads personalizzate per persona",
    date: "Feb 2026",
    time: "6 min",
    url: "https://www.digitalapplied.com/blog/meta-advantage-plus-march-2026-ai-dubbing-music-persona",
    source: "digitalapplied.com",
  },
  {
    cat: "Social Media",
    title: "LinkedIn Algorithm 2026: perché il tuo reach crolla e come adattare la strategia B2B",
    date: "Mar 2026",
    time: "5 min",
    url: "https://yepads.com/linkedin-algorithm-changes-2026-why-linkedin-reach-is-dropping/",
    source: "yepads.com",
  },
  {
    cat: "Advertising",
    title: "Google Ads 2026: tutti gli aggiornamenti di Performance Max, AI Max e Search Ads",
    date: "Mar 2026",
    time: "9 min",
    url: "https://almcorp.com/blog/google-ads-updates-2026/",
    source: "almcorp.com",
  },
  {
    cat: "Social Media",
    title: "TikTok Shop domina il social commerce: i dati eMarketer e le previsioni per il 2026",
    date: "10 Dic 2025",
    time: "4 min",
    url: "https://www.emarketer.com/press-releases/tiktok-shop-makes-up-nearly-20-of-social-commerce-in-2025/",
    source: "emarketer.com",
  },
  {
    cat: "SEO",
    title: "Organic Traffic Crisis 2026: dati reali su zero-click search e crollo del traffico organico",
    date: "Mar 2026",
    time: "10 min",
    url: "https://thedigitalbloom.com/learn/organic-traffic-crisis-report-2026-update/",
    source: "thedigitalbloom.com",
  },
  {
    cat: "Digital Marketing",
    title: "Cookieless Marketing 2026: come costruire la tua strategia CDP e first-party data",
    date: "Feb 2026",
    time: "8 min",
    url: "https://www.digitalapplied.com/blog/data-privacy-marketing-2026-cookieless-strategy",
    source: "digitalapplied.com",
  },
  {
    cat: "AI",
    title: "I 30 migliori strumenti AI per il marketing nel 2026: da Claude Code a HubSpot Breeze",
    date: "26 Feb 2026",
    time: "7 min",
    url: "https://www.marketermilk.com/blog/ai-marketing-tools",
    source: "marketermilk.com",
  },
];

const filterCategories = [
  { key: "all", label: "Tutti" },
  { key: "AI", label: "AI" },
  { key: "SEO", label: "SEO" },
  { key: "Advertising", label: "Advertising" },
  { key: "Social Media", label: "Social Media" },
  { key: "Digital Marketing", label: "Digital Marketing" },
];

const Blog = () => {
  const [filter, setFilter] = useState("all");
  const { t } = useLanguage();
  const B = translations.blog;

  const filtered = filter === "all" ? articles : articles.filter((a) => a.cat === filter);

  return (
    <div>
      <SEO
        title="Blog — Strategie di Marketing, Lead Generation e Crescita | BD Media"
        description="Articoli pratici su Meta Ads, lead generation, funnel marketing, AEO e crescita per PMI italiane. Strategie da chi le applica ogni giorno su clienti reali."
        ogUrl="https://bdmedia.it/blog"
      />

      <section className="section-padding pt-32">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <div className="eyebrow mb-4 flex items-center gap-3 px-[33px]">
              <span className="h-px w-8 bg-primary" />
              {t(B.hero.eyebrow)}
            </div>
            <h1 className="heading-hero max-w-4xl mx-0 my-0 px-[29px]">
              {t(B.hero.h1)}. <span className="text-primary">{t(B.hero.subtitle)}</span>
            </h1>
            <p className="mt-4 max-w-2xl text-base text-muted-foreground px-[29px]">
              {t(B.hero.body)}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <div className="mt-8 flex flex-wrap gap-6 text-sm px-[29px]">
              <span>
                <strong className="text-foreground">{t(B.hero.stat1_value)}</strong>{" "}
                <span className="text-muted-foreground">{t(B.hero.stat1_label)}</span>
              </span>
              <span>
                <strong className="text-foreground">{t(B.hero.stat2_value)}</strong>{" "}
                <span className="text-muted-foreground">{t(B.hero.stat2_label)}</span>
              </span>
              <span>
                <strong className="text-foreground">{t(B.hero.stat3_value)}</strong>{" "}
                <span className="text-muted-foreground">{t(B.hero.stat3_label)}</span>
              </span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="section-padding pt-0">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <div className="mb-10 flex flex-wrap gap-2">
              {filterCategories.map((c) => (
                <button
                  key={c.key}
                  onClick={() => setFilter(c.key)}
                  className={`rounded-pill px-5 py-2 text-sm font-medium transition-all ${
                    filter === c.key
                      ? "bg-primary text-primary-foreground"
                      : "border border-white/[0.06] text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </ScrollReveal>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((a, i) => {
              const colors = catBadgeColors[a.cat] || catBadgeColors["AI"];
              return (
                <ScrollReveal key={`${a.cat}-${i}`} delay={i * 60}>
                  <a
                    href={a.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-full flex-col rounded-2xl border p-6 no-underline transition-all duration-300"
                    style={{
                      backgroundColor: "#1c1c1e",
                      borderColor: "#2a2a2e",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget;
                      el.style.transform = "translateY(-6px) scale(1.015)";
                      el.style.borderColor = "#FF00CC55";
                      el.style.boxShadow = "0 8px 30px #FF00CC1A";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget;
                      el.style.transform = "translateY(0) scale(1)";
                      el.style.borderColor = "#2a2a2e";
                      el.style.boxShadow = "none";
                    }}
                  >
                    <span
                      className="inline-block self-start rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-wider"
                      style={{
                        backgroundColor: colors.bg,
                        color: colors.text,
                        borderColor: colors.border,
                      }}
                    >
                      {a.cat}
                    </span>
                    <h3 className="mt-4 flex-1 text-base font-bold leading-snug text-foreground">
                      {a.title}
                    </h3>
                    <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{a.date}</span>
                      <span>·</span>
                      <span>{a.time}</span>
                    </div>
                    <p
                      className="mt-1 uppercase tracking-wider"
                      style={{ color: "#444", fontSize: "11px" }}
                    >
                      {a.source}
                    </p>
                  </a>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Blog;
