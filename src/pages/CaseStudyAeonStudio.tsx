import ScrollReveal from "@/components/ScrollReveal";
import SEO from "@/components/SEO";
import { useContactModal } from "@/components/ContactModalContext";

const metrics = [
  { value: "858",     label: "Lead qualificati generati in 10 mesi" },
  { value: "+1059%",  label: "Crescita lead rispetto ai 26 mesi precedenti" },
  { value: "17,16x",  label: "ROAS — Return on Ad Spend" },
  { value: "€6,30",   label: "CPL medio (dimezzato da €15,46)" },
  { value: "2,46%",   label: "CTR medio sulle campagne" },
  { value: "€5,17",   label: "CPM medio" },
];

const phases = [
  {
    step: "01",
    title: "Analisi",
    desc: "Audit completo dell'account pubblicitario, analisi del mercato di riferimento e mappatura del funnel esistente. Identificazione dei colli di bottiglia che limitavano la generazione di lead.",
  },
  {
    step: "02",
    title: "Setup campagne",
    desc: "Nuova architettura campagne Meta Ads con struttura a obiettivi differenziati, creatività testate in A/B e landing page ottimizzate per la conversione.",
  },
  {
    step: "03",
    title: "Ottimizzazione continua",
    desc: "Monitoraggio settimanale dei KPI, riallocazione budget sulle campagne più performanti, iterazione costante su copy e creatività per abbassare il CPL e aumentare il volume.",
  },
];

const CaseStudyAeonStudio = () => {
  const { open: openContactModal } = useContactModal();

  return (
    <div>
      <SEO
        title="Case Study Aeon Studio | Da 7 a 86 lead/mese | BD Media"
        description="Come BD Media ha portato Aeon Studio da 7,4 a 85,8 lead al mese in 10 mesi con Meta Ads. +1059% lead, ROAS 17,16x, CPL dimezzato."
        ogUrl="https://bdmedia.it/case-study/aeon-studio"
      />

      {/* Hero */}
      <section className="section-padding pt-32">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <div className="eyebrow mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-primary" />
              Case Study
            </div>
            <h1 className="heading-hero max-w-4xl">
              Come abbiamo portato Aeon Studio da <span className="text-primary">7 a 86 lead/mese</span>
            </h1>
            <p className="mt-4 text-lg font-light text-muted-foreground">
              +1059% di lead qualificati in 10 mesi. ROAS 17,16x. CPL dimezzato.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Il cliente */}
      <section className="section-padding pt-0">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <div className="card-surface">
              <h2 className="text-xl font-extrabold tracking-tight">Il cliente</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                <strong className="text-foreground">Aeon Studio</strong> è uno studio di architettura che cercava un modo scalabile per acquisire nuovi clienti attraverso il digitale. Prima di lavorare con BD Media, la lead generation era sporadica e basata principalmente sul passaparola, con risultati difficili da misurare e costi per lead elevati.
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
              <h2 className="text-xl font-extrabold tracking-tight">Il problema iniziale</h2>
              <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
                <p>Nei <strong className="text-foreground">26 mesi precedenti</strong> alla collaborazione con BD Media, Aeon Studio aveva generato solo <strong className="text-foreground">194 lead totali</strong> — una media di <strong className="text-foreground">7,4 lead al mese</strong>.</p>
                <p>Il costo per lead era di <strong className="text-foreground">€15,46</strong>, troppo alto per garantire un ritorno sostenibile sull'investimento pubblicitario.</p>
                <p>Le campagne mancavano di una struttura chiara, i dati non venivano tracciati correttamente e non c'era un funnel ottimizzato per la conversione.</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Il processo */}
      <section className="section-padding pt-0">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <h2 className="text-2xl font-extrabold tracking-tight">Il processo in 3 fasi</h2>
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
            <h2 className="text-2xl font-extrabold tracking-tight">I risultati</h2>
            <p className="mt-2 text-sm text-muted-foreground">10 mesi di collaborazione · dati verificati</p>
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
                <span className="text-muted-foreground">Lead/mese — Prima:</span>
                <span className="font-semibold">7,4</span>
                <span className="text-primary">→</span>
                <span className="text-muted-foreground">Dopo:</span>
                <span className="font-semibold">85,8</span>
              </div>
              <div className="flex flex-wrap gap-x-8 gap-y-1">
                <span className="text-muted-foreground">CPL — Prima:</span>
                <span className="font-semibold">€15,46</span>
                <span className="text-primary">→</span>
                <span className="text-muted-foreground">Dopo:</span>
                <span className="font-semibold">€6,30</span>
              </div>
              <div>
                <span className="text-muted-foreground">ROAS: </span>
                <span className="font-semibold text-primary">17,16x</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent" />
        <div className="relative mx-auto max-w-3xl text-center">
          <ScrollReveal>
            <h2 className="text-3xl font-extrabold tracking-tight">Vuoi risultati simili per la tua attività?</h2>
            <button
              onClick={() => openContactModal("Lead Generation")}
              className="btn-primary mt-8 inline-flex"
            >
              Vuoi risultati simili per la tua attività? →
            </button>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default CaseStudyAeonStudio;
