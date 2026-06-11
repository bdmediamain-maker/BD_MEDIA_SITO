import ScrollReveal from "@/components/ScrollReveal";
import { Link } from "react-router-dom";
import { BarChart3, Search, Zap, Target, FlaskConical, PenTool, Plus } from "lucide-react";
import SEO from "@/components/SEO";
import { useContactModal } from "@/components/ContactModalContext";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/i18n/translations";
import TeamMemberCard from "@/components/TeamMemberCard";
import TypewriterQuote from "@/components/TypewriterQuote";
import ValuesGrid from "@/components/ValuesGrid";

const About = () => {
  const { open: openContactModal } = useContactModal();
  const { t } = useLanguage();
  const A = translations.about;

  const team = [
    { photo: "/tiubbi.webp",  name: t(A.team.m1_name), role: t(A.team.m1_role), bio: t(A.team.m1_bio) },
    { photo: "/schili.webp",  name: t(A.team.m2_name), role: t(A.team.m2_role), bio: t(A.team.m2_bio) },
    { photo: "/lucky_.webp",  name: t(A.team.m3_name), role: t(A.team.m3_role), bio: t(A.team.m3_bio) },
    { photo: "/donny.webp",   name: t(A.team.m4_name), role: t(A.team.m4_role), bio: t(A.team.m4_bio), imgClassName: "absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105" },
    {
      photo: "/ervin.jpg",
      name: "Ervin Alla",
      role: t({ it: "Tech Team", en: "Tech Team" }),
      bio: t({
        it: "Mi occupo dello sviluppo e manutenzione dei siti web dei clienti, gestendo tutta la parte tecnologica. Curo l'implementazione tecnica delle strategie digitali, dall'architettura del sito all'ottimizzazione delle performance, garantendo che ogni soluzione funzioni al massimo.",
        en: "I handle the development and maintenance of client websites, managing the entire technology side. I oversee the technical implementation of digital strategies, from site architecture to performance optimization, ensuring every solution works at its best.",
      }),
    },
    {
      photo: "/alessio.jpg",
      name: "Alessio Drera",
      role: t({ it: "Production Team", en: "Production Team" }),
      bio: t({
        it: "Mi occupo della produzione video: editing di video ads, ricerca e selezione del materiale creativo, e ottimizzazione dei contenuti per le campagne pubblicitarie. Trasformo le idee in contenuti visivi efficaci che convertono.",
        en: "I handle video production: editing video ads, researching and selecting creative material, and optimizing content for advertising campaigns. I turn ideas into effective visual content that converts.",
      }),
    },
    {
      photo: "/chadi.jpg",
      name: "Chadi Hargaoui",
      role: t({ it: "Sales Team", en: "Sales Team" }),
      bio: t({
        it: "Mi occupo di tutto il processo di vendita: gestisco le chiamate con i potenziali clienti, preparo le sessioni di outreach e curo ogni contatto dalla prima interazione fino alla chiusura. Il mio obiettivo è trasformare ogni conversazione in un'opportunità concreta per il cliente e per BD Media.",
        en: "I handle the entire sales process: managing calls with potential clients, preparing outreach sessions, and nurturing every contact from the first interaction to closing. My goal is to turn every conversation into a concrete opportunity for both the client and BD Media.",
      }),
    },
  ];

  const values = [
    { icon: BarChart3, title: t(A.values.v1_title), desc: t(A.values.v1_body) },
    { icon: Search, title: t(A.values.v2_title), desc: t(A.values.v2_body) },
    { icon: Zap, title: t(A.values.v3_title), desc: t(A.values.v3_body) },
    { icon: Target, title: t(A.values.v4_title), desc: t(A.values.v4_body) },
    { icon: FlaskConical, title: t(A.values.v5_title), desc: t(A.values.v5_body) },
    { icon: PenTool, title: t(A.values.v6_title), desc: t(A.values.v6_body) },
  ];

  return (
    <div style={{ background: "linear-gradient(135deg, #0d0010 0%, #1a0030 50%, #0d0010 100%)" }}>
      <SEO
        title="Chi Siamo | BD Media — Agenzia Marketing Digitale Italia"
        description="Scopri il team di BD Media, la realtà più giovane e agile del marketing digitale italiano. Dati, trasparenza e risultati misurabili per aziende in tutta Italia."
        ogUrl="https://bdmedia.it/about"
        canonicalUrl="https://bdmedia.it/about"
      />

      <section className="section-padding pt-32">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <div className="eyebrow mb-4 flex items-center gap-3"><span className="h-px w-8 bg-primary" />{t(A.hero.eyebrow)}</div>
            <h1 className="heading-hero max-w-3xl">{t(A.hero.h1)}</h1>
            <p className="mt-4 text-lg font-light text-muted-foreground">{t(A.hero.subtitle)}</p>
            <p className="mt-4 max-w-3xl text-base text-muted-foreground">{t(A.hero.body)}</p>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="mx-auto max-w-7xl grid gap-6 md:grid-cols-2">
          <ScrollReveal>
            <div className="card-surface h-full transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:border-primary/20 hover:shadow-[0_8px_30px_rgba(255,0,170,0.08)]">
              <span className="eyebrow">{t(A.vision.title)}</span>
              <h3 className="mt-3 text-xl font-bold">{t(A.vision.subtitle)}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t(A.vision.body)}</p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <div className="card-surface h-full transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:border-primary/20 hover:shadow-[0_8px_30px_rgba(255,0,170,0.08)]">
              <span className="eyebrow">{t(A.mission.title)}</span>
              <h3 className="mt-3 text-xl font-bold">{t(A.mission.subtitle)}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t(A.mission.body)}</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section
        className="section-padding"
        style={{ background: "linear-gradient(135deg, #0d0010 0%, #1a0030 50%, #0d0010 100%)" }}
      >
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <h2 className="text-3xl font-extrabold tracking-tight">{t(A.team.title)}</h2>
          </ScrollReveal>
          <div className="mt-8 grid grid-cols-2 gap-5 md:grid-cols-4">
            {team.map((m, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <TeamMemberCard
                  photo={m.photo}
                  name={m.name}
                  role={m.role}
                  bio={m.bio}
                  imgClassName={(m as any).imgClassName}
                />
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal delay={400}>
            <p className="mt-8 text-center text-sm text-muted-foreground">{t(A.team.note)}</p>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-padding pb-8 md:pb-12">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <h2 className="text-3xl font-extrabold tracking-tight">{t(A.values.title)}</h2>
          </ScrollReveal>
          <ValuesGrid values={values} />
        </div>
      </section>

      <section className="section-padding">
        <div className="mx-auto max-w-3xl text-center">
          <ScrollReveal>
            <img src="/logo_3_frecce_bdmedia.png" alt="BD Media logo" loading="lazy" width={596} height={596} className="mx-auto mb-6 h-[180px] w-[180px] object-contain bg-transparent" />
            <TypewriterQuote text={t(A.quote.text)} className="text-2xl font-bold italic leading-snug md:text-3xl" />
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{t(A.quote.body)}</p>
          </ScrollReveal>
        </div>
      </section>

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
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <button onClick={openContactModal} className="btn-primary">{t(A.cta.primary)}</button>
              <Link to="/portfolio" className="text-sm text-muted-foreground underline decoration-white/20 underline-offset-4 transition-colors hover:text-foreground">
                {t(A.cta.secondary)}
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default About;
