import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/i18n/translations";
import { useEffect, useRef, useState } from "react";

/** Parse a display value like "2K+", "13.5M+", "10/10" into animatable parts */
function parseValue(val: string): { prefix: string; number: number; suffix: string; decimals: number } {
  // Handle fraction like "10/10"
  const fractionMatch = val.match(/^(\d+)\/(\d+)$/);
  if (fractionMatch) {
    return { prefix: "", number: parseInt(fractionMatch[1]), suffix: `/${fractionMatch[2]}`, decimals: 0 };
  }

  const match = val.match(/^([€$]?)(\d+(?:[.,]\d+)?)\s*([KMB+%x]*.*)?$/i);
  if (!match) return { prefix: "", number: 0, suffix: val, decimals: 0 };

  const prefix = match[1] || "";
  const numStr = match[2].replace(",", ".");
  const number = parseFloat(numStr);
  const suffix = match[3] || "";
  const decParts = numStr.split(".");
  const decimals = decParts.length > 1 ? decParts[1].length : 0;

  return { prefix, number, suffix, decimals };
}

function AnimatedValue({ value }: { value: string }) {
  const [displayed, setDisplayed] = useState("0");
  const ref = useRef<HTMLParagraphElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const { prefix, number, suffix, decimals } = parseValue(value);

          if (number === 0) {
            setDisplayed(value);
            return;
          }

          const duration = 1800;
          const startTime = performance.now();

          const animate = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = eased * number;

            if (decimals > 0) {
              setDisplayed(`${prefix}${current.toFixed(decimals)}${suffix}`);
            } else {
              setDisplayed(`${prefix}${Math.round(current)}${suffix}`);
            }

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setDisplayed(value);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <p ref={ref} className="mt-3 text-[2.25rem] font-extrabold leading-none tracking-tight tabular-nums">
      {displayed}
    </p>
  );
}

const KPIDashboard = () => {
  const { t } = useLanguage();
  const S = translations.home.stats;

  const kpis = [
    {
      value: t(S.stat1_value),
      label: t(S.stat1_label),
      sub: "CPL medio €5,86 · ROAS medio 11,3%",
    },
    {
      value: t(S.stat2_value),
      label: t(S.stat2_label),
      sub: "valore complessivo dei progetti gestiti",
    },
    {
      value: t(S.stat3_value),
      label: t(S.stat3_label),
      sub: "durata media collaborazione: 8 mesi",
    },
  ];

  return (
    <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {kpis.map((k, i) => (
        <div
          key={i}
          className="relative overflow-hidden rounded-xl border border-white/[0.06] bg-card p-6"
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
          <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            {k.label}
          </p>
          <AnimatedValue value={k.value} />
          <p className="mt-3 text-[11px] leading-snug text-muted-foreground/60">
            {k.sub}
          </p>
        </div>
      ))}
    </div>
  );
};

export default KPIDashboard;
