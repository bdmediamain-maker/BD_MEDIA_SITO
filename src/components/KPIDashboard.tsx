// ── Risultati aggregati 2025-2026 ────────────────────────────────────────────
// Questi sono numeri reali da clienti attivi.
// TODO: aggiornare i valori tra parentesi quadre con i dati reali prima del go-live.
// Il valore "858" è verificato (case study Aeon Studio, confermato da Bedr).

const RESULTS = [
  {
    value: "858",
    metric: "lead qualificati generati",
    source: "Aeon Studio · 10 mesi",
    verified: true,
  },
  {
    value: "[X]",           // TODO: inserire numero clienti attivi
    metric: "clienti attivi",
    source: "da aggiornare con dato reale",
    verified: false,
  },
  {
    value: "[€XX.XXX]",     // TODO: inserire ad spend totale gestito H1 2026
    metric: "di ad spend gestito",
    source: "H1 2026 · da aggiornare",
    verified: false,
  },
  {
    value: "[X]%",          // TODO: inserire tasso medio di crescita lead clienti attivi
    metric: "tasso medio di crescita lead",
    source: "media clienti attivi · da aggiornare",
    verified: false,
  },
] as const;

const KPIDashboard = () => (
  <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
    {RESULTS.map((r, i) => (
      <div
        key={i}
        className="relative overflow-hidden rounded-xl border border-white/[0.06] bg-card p-6"
      >
        {/* Linea accent magenta in cima */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

        {/* Etichetta metrica */}
        <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
          {r.metric}
        </p>

        {/* Valore principale */}
        <p className="mt-3 text-[2.25rem] font-extrabold leading-none tracking-tight">
          {r.value}
        </p>

        {/* Fonte / attribuzione */}
        <p className="mt-4 border-t border-white/[0.04] pt-3 text-[11px] leading-snug text-muted-foreground/60">
          {r.source}
        </p>
      </div>
    ))}
  </div>
);

export default KPIDashboard;
