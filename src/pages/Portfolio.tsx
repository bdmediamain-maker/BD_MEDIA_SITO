import { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import SEO from "@/components/SEO";
import { useContactModal } from "@/components/ContactModalContext";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/i18n/translations";

import logoDDC from "@/assets/clients/dark-diamond-cafe.png";
import logoGo from "@/assets/clients/golosi.png";
import logoCaT from "@/assets/clients/caffe-al-teatro.png";
import logoTD from "@/assets/clients/td-studio.png";
import logoLoS from "@/assets/clients/lab-on-sense.png";
import logoAR from "@/assets/clients/arkes-roleplay.png";
import logoKP from "@/assets/clients/kp-management.png";
import logoIC from "@/assets/clients/istituto-campanella.png";
import logoBF from "@/assets/clients/barber-feb.png";
import logoTI from "@/assets/clients/tecia.png";
import logoAS from "@/assets/clients/aeon-studio.png";
import logoAE from "@/assets/clients/accademia-europea.png";
import logoAL from "@/assets/clients/altalogik.png";

const Portfolio = () => {
  const [filter, setFilter] = useState("all");
  const { open: openContactModal } = useContactModal();
  const { t } = useLanguage();
  const P = translations.portfolio;

  const categories = [
    { key: "all",           label: t(P.filters.all) },
    { key: "food_beverage", label: t(P.filters.food_beverage) },
    { key: "architettura",  label: t(P.filters.architettura) },
    { key: "ecommerce",     label: t(P.filters.ecommerce) },
    { key: "software",      label: t(P.filters.software) },
    { key: "altro",         label: t(P.filters.altro) },
  ];

  const projects = [
    { sig: "DDC", cat: "food_beverage",  client: "Dark Diamond Cafè",    headline: t(P.p1_headline), desc: t(P.p1_body), tags: ["Brand Identity", "Meta Ads", "Lead Gen"], logo: logoDDC },
    { sig: "Go",  cat: "food_beverage",  client: "Golosi",               headline: t(P.p11_headline), desc: t(P.p11_body), tags: ["Brand Identity", "Food Import"], logo: logoGo },
    { sig: "CaT", cat: "food_beverage",  client: "Caffè al Teatro",      headline: t(P.p6_headline), desc: t(P.p6_body), tags: ["Social Media", "Brand", "Local"], logo: logoCaT },
    { sig: "AS",  cat: "architettura",   client: "AEON Studio",          headline: t(P.p2_headline), desc: t(P.p2_body), tags: ["Social Media", "Ads", "Crescita"], logo: logoAS },
    { sig: "TD",  cat: "architettura",   client: "TDSTUDIO",             headline: t(P.p5_headline), desc: t(P.p5_body), tags: ["Branding", "Social", "Positioning"], logo: logoTD },
    { sig: "TI+", cat: "software",       client: "TecIA+",               headline: t(P.p7_headline), desc: t(P.p7_body), tags: ["AI", "Launch", "Digital"], logo: logoTI },
    { sig: "AL",  cat: "software",       client: "Altalogik",            headline: "Software house B2B per l'automazione aziendale", desc: "Sistemi software su misura, automazione processi e integrazione AI per PMI che vogliono eliminare il lavoro manuale e scalare in modo sostenibile.", tags: ["Custom Software", "Automazione", "AI"], logo: logoAL },

    { sig: "LoS", cat: "altro",          client: "Lab On Sense",         headline: t(P.p3_headline), desc: t(P.p3_body), tags: ["Sito Web", "Brand Identity", "UX"], logo: logoLoS },
    { sig: "AR",  cat: "altro",          client: "Arkes Roleplay",       headline: t(P.p4_headline), desc: t(P.p4_body), tags: ["Community Management", "Discord"], logo: logoAR },
    { sig: "KP",  cat: "altro",          client: "KP Management",        headline: t(P.p8_headline), desc: t(P.p8_body), tags: ["Strategia", "Comunicazione", "B2B"], logo: logoKP },
    { sig: "AE",  cat: "altro",          client: "Accademia Europea",    headline: t(P.p9_headline), desc: t(P.p9_body), tags: ["Meta Ads", "Social Media", "Lead Gen"], logo: logoAE },
    { sig: "IC",  cat: "altro",          client: "Istituto Campanella",  headline: t(P.p10_headline), desc: t(P.p10_body), tags: ["Brand Identity", "Merchandising"], logo: logoIC },
    { sig: "BF",  cat: "altro",          client: "Barber Feb",           headline: t(P.p12_headline), desc: t(P.p12_body), tags: ["Brand Identity", "Barber"], logo: logoBF },
  ];

  const statsStrip = [
    { value: t(P.stats.s1_value), label: t(P.stats.s1_label) },
    { value: t(P.stats.s2_value), label: t(P.stats.s2_label) },
    { value: t(P.stats.s3_value), label: t(P.stats.s3_label) },
    { value: t(P.stats.s4_value), label: t(P.stats.s4_label) },
  ];

  const sectorOrder = ["food_beverage", "architettura", "ecommerce", "software", "altro"];
  const sectorLabels: Record<string, string> = {
    food_beverage: t(P.filters.food_beverage),
    architettura: t(P.filters.architettura),
    ecommerce: t(P.filters.ecommerce),
    software: t(P.filters.software),
    altro: t(P.filters.altro),
  };
  const activeSectors = filter === "all" ? sectorOrder : sectorOrder.filter((s) => s === filter);
  const groupedProjects = activeSectors
    .map((sector) => ({
      sector,
      label: sectorLabels[sector],
      items: projects.filter((p) => p.cat === sector),
    }))
    .filter((g) => g.items.length > 0);

  return (
    <div>
      <SEO
        title="Portfolio & Risultati Clienti | Case Study Lead Generation | BD Media"
        description="Portfolio di BD Media: case study reali su lead generation, Meta Ads, brand identity. Aeon Studio +1059% lead in 10 mesi, Dark Diamond Cafè, Lab On Sense e altri clienti."
        ogUrl="https://bdmedia.it/portfolio"
      />

      <section className="section-padding pt-32">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <div className="eyebrow mb-4 flex items-center gap-3"><span className="h-px w-8 bg-primary" />{t(P.hero.eyebrow)}</div>
            <h1 className="heading-hero max-w-3xl">{t(P.hero.h1)}</h1>
            <p className="mt-4 text-lg font-light text-muted-foreground">{t(P.hero.subtitle)}</p>
            <p className="mt-4 max-w-2xl text-base text-muted-foreground">{t(P.hero.body)}</p>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <div className="mt-10 flex flex-wrap gap-2">
              {categories.map((c) => (
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
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="mx-auto max-w-7xl space-y-14">
          {groupedProjects.map((group) => (
            <div key={group.sector}>
              <ScrollReveal>
                <h2 className="mb-6 text-xl font-bold tracking-tight text-foreground border-b border-white/[0.06] pb-3">
                  {group.label}
                </h2>
              </ScrollReveal>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {group.items.map((p, i) => (
                  <ScrollReveal key={p.sig} delay={i * 60}>
                    <div className="card-surface flex h-full flex-col">
                      <div className="flex items-start justify-between">
                        <span className="tag-pill text-[10px]">{p.cat}</span>
                        {p.logo ? (
                          <img
                            src={p.logo}
                            alt={p.client}
                            className={
                              p.sig === "AL"
                                ? "h-10 w-10 rounded-full object-cover"
                                : "h-10 w-10 rounded-full object-contain bg-white/10 p-1"
                            }
                          />
                        ) : (
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">{p.sig}</div>
                        )}
                      </div>
                      <h3 className="mt-4 text-lg font-bold">{p.client}</h3>
                      <p className="mt-1 text-sm font-medium text-primary">{p.headline}</p>
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {p.tags.map((tag) => <span key={tag} className="tag-pill text-[10px]">{tag}</span>)}
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-white/[0.06] px-6 py-12 md:px-12">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 md:grid-cols-4">
          {statsStrip.map((s, i) => (
            <ScrollReveal key={i} delay={i * 80}>
              <div className="text-center">
                <div className="text-3xl font-extrabold">{s.value}</div>
                <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="section-padding relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent" />
        <div className="relative mx-auto max-w-3xl text-center">
          <ScrollReveal>
            <h2 className="text-3xl font-extrabold tracking-tight">{t(P.cta_headline)}</h2>
            <button onClick={() => openContactModal()} className="btn-primary mt-8 inline-flex">Vediamo se siamo il match giusto →</button>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
