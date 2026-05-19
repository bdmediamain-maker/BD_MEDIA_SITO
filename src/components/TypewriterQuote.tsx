import { useEffect, useRef, useState } from "react";

interface TypewriterQuoteProps {
  text: string;
  className?: string;
  speed?: number;
}

const TypewriterQuote = ({ text, className = "", speed = 40 }: TypewriterQuoteProps) => {
  const ref = useRef<HTMLQuoteElement>(null);
  const startedRef = useRef(false);
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true;
          observer.disconnect();
          let i = 0;
          const tick = () => {
            i++;
            setDisplayed(text.slice(0, i));
            if (i < text.length) {
              window.setTimeout(tick, speed);
            } else {
              setDone(true);
            }
          };
          window.setTimeout(tick, speed);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [text, speed]);

  return (
    <blockquote ref={ref} className={className}>
      {displayed || "\u00A0"}
      {!done && (
        <span
          aria-hidden="true"
          style={{
            display: "inline-block",
            marginLeft: "2px",
            color: "#ff00cc",
            animation: "typewriter-caret-blink 1s steps(1) infinite",
          }}
        >
          |
        </span>
      )}
    </blockquote>
  );
};

export default TypewriterQuote;
