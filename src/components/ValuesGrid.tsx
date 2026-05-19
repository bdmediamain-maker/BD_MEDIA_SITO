import { useEffect, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";

interface Value {
  icon: LucideIcon;
  title: string;
  desc: string;
}

const directions = ["method-step-left", "method-step-up", "method-step-right"];

const ValuesGrid = ({ values }: { values: Value[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState<boolean[]>(() => values.map(() => false));

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            values.forEach((_, i) => {
              setTimeout(() => {
                setVisible((prev) => {
                  const next = [...prev];
                  next[i] = true;
                  return next;
                });
              }, i * 250);
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [values]);

  return (
    <div ref={containerRef} className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {values.map((v, i) => (
        <div
          key={i}
          className={`method-step ${directions[i % 3]} ${visible[i] ? "method-step-in" : ""} card-surface h-full border-l-2 border-l-transparent px-5 py-4 transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:border-primary/20 hover:shadow-[0_8px_30px_rgba(255,0,170,0.08)]`}
        >
          <v.icon className="h-5 w-5 text-primary" strokeWidth={1.5} />
          <h3 className="mt-2 text-[16px] font-bold leading-tight">{v.title}</h3>
          <p className="mt-1 text-[13px] leading-snug text-muted-foreground">{v.desc}</p>
        </div>
      ))}
    </div>
  );
};

export default ValuesGrid;
