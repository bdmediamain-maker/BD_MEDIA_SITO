import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/i18n/translations";

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
          <p className="mt-3 text-[2.25rem] font-extrabold leading-none tracking-tight">
            {k.value}
          </p>
          <p className="mt-3 text-[11px] leading-snug text-muted-foreground/60">
            {k.sub}
          </p>
        </div>
      ))}
    </div>
  );
};

export default KPIDashboard;
