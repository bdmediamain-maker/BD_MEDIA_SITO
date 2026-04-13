import { useState, useEffect, useRef, useCallback } from "react";
import SEO from "@/components/SEO";
import { useContactModal } from "@/components/ContactModalContext";

/* ─── Data ──────────────────────────────────────────────────────────────────── */
const DATA = {
  before: {
    label: "Prima · 26 mesi",
    leads: 194,
    leadsMonth: 7.4,
    cpl: 15.46,
    roas: 1,
    cpc: 0.15,
    cpm: 7.36,
    costReduction: null,
  },
  after: {
    label: "Dopo BD · 10 mesi",
    leads: 858,
    leadsMonth: 85.8,
    cpl: 6.3,
    roas: 17.16,
    cpc: 0.64,
    cpm: 7.36,
    costReduction: -59,
  },
} as const;

/* ─── Animated counter hook ─────────────────────────────────────────────────── */
function useCounter(target: number, duration = 1800, decimals = 0) {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const start = performance.now();
    const from = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = from + (target - from) * eased;
      setValue(decimals > 0 ? parseFloat(current.toFixed(decimals)) : Math.round(current));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration, decimals]);

  return value;
}

/* ─── Counter display component ─────────────────────────────────────────────── */
function Counter({ value, decimals = 0, prefix = "", suffix = "" }: {
  value: number; decimals?: number; prefix?: string; suffix?: string;
}) {
  const animated = useCounter(value, 1800, decimals);
  return (
    <span className="tabular-nums">
      {prefix}{decimals > 0 ? animated.toFixed(decimals) : animated}{suffix}
    </span>
  );
}

/* ─── Growing bar component ─────────────────────────────────────────────────── */
function GrowBar({ percentage, color, label, value, delay = 0 }: {
  percentage: number; color: string; label: string; value: string; delay?: number;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div className="flex flex-col items-center gap-3">
      <span className="text-sm font-bold tabular-nums" style={{ color }}>{value}</span>
      <div className="relative h-48 w-16 overflow-hidden rounded-lg sm:h-56 sm:w-20"
        style={{ background: "rgba(255,255,255,0.04)" }}>
        <div
          className="absolute bottom-0 left-0 w-full rounded-lg transition-all duration-1000 ease-out"
          style={{
            height: mounted ? `${percentage}%` : "0%",
            background: color,
          }}
        />
      </div>
      <span className="text-xs text-center text-[hsl(var(--muted-foreground))]">{label}</span>
    </div>
  );
}

/* ─── Main component ───────────────────────────────────────────────────────── */
const CaseStudyAeonStudio = () => {
  const { open: openContactModal } = useContactModal();
  const [activeTab, setActiveTab] = useState<"before" | "after">("after");
  const d = DATA[activeTab];

  // Key to force counter remount on tab change
  const [counterKey, setCounterKey] = useState(0);
  const switchTab = useCallback((tab: "before" | "after") => {
    setActiveTab(tab);
    setCounterKey(k => k + 1);
  }, []);

  return (
    <div className="min-h-screen">
      <SEO
        title="Case Study Aeon Studio | Da 7 a 86 lead/mese | BD Media"
        description="Come BD Media ha portato Aeon Studio da 7,4 a 85,8 lead al mese in 10 mesi con Meta Ads. +1059% lead, ROAS 17,16x, CPL dimezzato."
        ogUrl="https://bdmedia.it/case-study/aeon-studio"
      />

      <div className="mx-auto max-w-5xl px-5 pb-20 pt-32 sm:px-8">
        {/* Header */}
        <header className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
            Case Study
          </p>
          <h1
            className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            AEON Studio
          </h1>
          <p className="mt-3 text-lg text-[hsl(var(--muted-foreground))]">
            Lead generation · Metodo BD
          </p>
        </header>

        {/* Tab toggle */}
        <div className="mt-12 flex justify-center gap-3">
          {(["before", "after"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => switchTab(tab)}
              className="rounded-xl px-6 py-3 text-sm font-bold transition-all duration-300"
              style={{
                border: activeTab === tab ? "2px solid hsl(var(--primary))" : "2px solid rgba(255,255,255,0.08)",
                background: activeTab === tab ? "rgba(255,0,204,0.15)" : "rgba(255,255,255,0.03)",
                color: activeTab === tab ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))",
                transform: activeTab === tab ? "scale(1.02)" : "scale(1)",
              }}
            >
              {DATA[tab].label}
            </button>
          ))}
        </div>

        {/* KPI Grid — 3 columns */}
        <div key={counterKey} className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Lead Qualificati */}
          <div
            className="relative overflow-hidden rounded-xl p-6 transition-transform duration-300"
            style={{
              background: "rgba(255,0,204,0.08)",
              border: "1px solid rgba(255,0,204,0.2)",
              transform: "scale(1)",
            }}
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
            <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[hsl(var(--muted-foreground))]">
              Lead Qualificati
            </p>
            <p className="mt-3 text-[2rem] font-extrabold leading-none text-primary">
              <Counter value={d.leads} />
            </p>
            <p className="mt-2 text-xs text-[hsl(var(--muted-foreground))]">
              in {activeTab === "before" ? "26" : "10"} mesi
            </p>
          </div>

          {/* ROAS */}
          <div
            className="relative overflow-hidden rounded-xl p-6"
            style={{
              background: "rgba(255,0,204,0.08)",
              border: "1px solid rgba(255,0,204,0.2)",
            }}
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
            <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[hsl(var(--muted-foreground))]">
              ROAS
            </p>
            <p className="mt-3 text-[2rem] font-extrabold leading-none text-primary">
              <Counter value={d.roas} decimals={d.roas % 1 !== 0 ? 2 : 0} suffix="x" />
            </p>
            <p className="mt-2 text-xs text-[hsl(var(--muted-foreground))]">
              Return on Ad Spend
            </p>
          </div>

          {/* Riduzione Costo — solo tab "after" con slide-in */}
          <div
            className="relative overflow-hidden rounded-xl p-6 transition-all duration-500"
            style={{
              background: activeTab === "after" ? "rgba(255,0,204,0.08)" : "rgba(255,255,255,0.02)",
              border: activeTab === "after" ? "1px solid rgba(255,0,204,0.2)" : "1px solid rgba(255,255,255,0.06)",
              opacity: activeTab === "after" ? 1 : 0.3,
              transform: activeTab === "after" ? "translateX(0)" : "translateX(20px)",
            }}
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
            <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[hsl(var(--muted-foreground))]">
              Riduzione Costo per Lead
            </p>
            {activeTab === "after" ? (
              <>
                <p className="mt-3 text-[2rem] font-extrabold leading-none text-primary">
                  <Counter value={59} suffix="%" prefix="-" />
                </p>
                <p className="mt-2 text-xs text-[hsl(var(--muted-foreground))]">
                  da €15,46 a €6,30
                </p>
              </>
            ) : (
              <p className="mt-3 text-[2rem] font-extrabold leading-none text-[hsl(var(--muted-foreground))]">
                —
              </p>
            )}
          </div>
        </div>

        {/* Secondary metrics — 2 columns */}
        <div key={`sec-${counterKey}`} className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-5">
            <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[hsl(var(--muted-foreground))]">
              CPL — Costo per Lead
            </p>
            <p className="mt-2 text-2xl font-extrabold tabular-nums">
              €<Counter value={d.cpl} decimals={2} />
            </p>
          </div>
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-5">
            <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[hsl(var(--muted-foreground))]">
              CPM
            </p>
            <p className="mt-2 text-2xl font-extrabold tabular-nums">
              €{d.cpm.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Visual comparison — lead mensili */}
        <div className="mt-14">
          <h2 className="text-center text-lg font-bold tracking-tight">Lead Mensili — Prima vs Dopo</h2>
          <div className="mt-8 flex justify-center gap-12 sm:gap-20">
            <GrowBar
              percentage={30}
              color="rgba(255,255,255,0.15)"
              label="Prima (26 mesi)"
              value="7,4"
              delay={100}
            />
            <GrowBar
              percentage={100}
              color="hsl(var(--primary))"
              label="Dopo BD (10 mesi)"
              value="85,8"
              delay={300}
            />
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16">
          <button
            onClick={() => openContactModal("Lead Generation")}
            className="w-full rounded-xl bg-primary py-4 text-center text-base font-bold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5"
            style={{
              boxShadow: "0 8px 24px rgba(255,0,204,0.2)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 12px 32px rgba(255,0,204,0.35)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 24px rgba(255,0,204,0.2)";
            }}
          >
            Leggi il case study completo →
          </button>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyAeonStudio;
