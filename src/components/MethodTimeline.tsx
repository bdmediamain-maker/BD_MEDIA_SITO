import { useEffect, useRef, useState } from "react";

interface Step {
  num: string;
  title: string;
  desc: string;
}

const MethodTimeline = ({ steps }: { steps: Step[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState<boolean[]>([false, false, false]);
  const [linesVisible, setLinesVisible] = useState<boolean[]>([false, false]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            steps.forEach((_, i) => {
              setTimeout(() => {
                setVisible((prev) => {
                  const next = [...prev];
                  next[i] = true;
                  return next;
                });
              }, i * 250);
            });
            [0, 1].forEach((i) => {
              setTimeout(() => {
                setLinesVisible((prev) => {
                  const next = [...prev];
                  next[i] = true;
                  return next;
                });
              }, 250 + i * 250);
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [steps]);

  const directions = ["method-step-left", "method-step-up", "method-step-right"];

  return (
    <div ref={containerRef} className="mt-10 flex flex-col items-stretch gap-6 md:flex-row md:items-center md:gap-0">
      {steps.map((s, i) => (
        <div key={i} className="flex flex-col items-stretch md:flex-row md:items-center md:flex-1">
          <div
            className={`method-step ${directions[i]} ${visible[i] ? "method-step-in" : ""} card-surface relative overflow-hidden transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:border-primary/20 hover:shadow-[0_8px_30px_rgba(255,0,170,0.08)] md:flex-1`}
          >
            <span className="absolute -right-2 -top-4 text-8xl font-extrabold text-primary/10">{s.num}</span>
            <div className="relative z-10">
              <span className="text-sm font-bold text-primary">{s.num}</span>
              <h3 className="mt-2 text-xl font-bold">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
            </div>
          </div>
          {i < steps.length - 1 && (
            <div className="method-connector-wrap">
              <span className={`method-connector ${linesVisible[i] ? "method-connector-in" : ""}`} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MethodTimeline;
