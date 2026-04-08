const clients = [
  "AEON Studio", "Dark Diamond Cafè", "Caffè al Teatro", "Lab On Sense",
  "KP Management", "CR Digital", "TDSTUDIO", "Arkes Roleplay", "Tecia+",
  "Accademia Europea", "Istituto Campanella", "Golosi", "Barber Feb"
];

const MarqueeStrip = () => {
  return (
    <div className="my-[13px] overflow-hidden border-y border-white/[0.06] bg-surface-1 py-4">
      <div className="flex w-max animate-marquee will-change-transform">
        {[0, 1].map((group) => (
          <div
            key={group}
            aria-hidden={group === 1}
            className="flex shrink-0 items-center text-[13px] font-semibold uppercase tracking-[2px]"
          >
            {clients.map((client) => (
              <span key={`${group}-${client}`} className="whitespace-nowrap">
                <span className="text-muted-foreground">{client}</span>
                <span className="mx-4 text-primary">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarqueeStrip;
