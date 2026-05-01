import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * AutoScrollReveal
 * Applica automaticamente un'animazione fade-up scroll-triggered a tutti gli
 * elementi rilevanti (titoli, testi, immagini, bottoni, card) all'interno
 * delle <section> del sito, con stagger di 0.1s tra elementi della stessa sezione.
 *
 * - Una sola volta per elemento (IntersectionObserver con unobserve)
 * - Salta elementi che hanno già hover/transition/animazioni esistenti:
 *   in tal caso anima il loro contenitore padre invece dei figli interni.
 * - Disabilitato su mobile (<768px) e con prefers-reduced-motion.
 */

const REVEAL_ATTR = "data-asr"; // "pending" | "done"
const STYLE_ID = "auto-scroll-reveal-styles";

const ensureStyles = () => {
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = `
    [${REVEAL_ATTR}="pending"] {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.6s ease-out, transform 0.6s ease-out;
      will-change: opacity, transform;
    }
    [${REVEAL_ATTR}="done"] {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);
};

// Selettori che indicano "elemento con stile/animazione/hover già definito":
// in tal caso NON animiamo i suoi figli, ma applichiamo il fade-up al wrapper.
const HAS_OWN_MOTION_SELECTORS = [
  "[class*='hover:']",
  "[class*='transition']",
  "[class*='animate-']",
  "[class*='group']",
  "[data-state]",
  "[role='button']",
];

const isInteractiveCard = (el: Element): boolean => {
  return HAS_OWN_MOTION_SELECTORS.some((sel) => el.matches(sel));
};

// Tag che consideriamo "animabili" come children diretti delle sezioni.
const ANIMATABLE_TAGS = new Set([
  "H1", "H2", "H3", "H4", "H5", "H6",
  "P", "IMG", "PICTURE", "VIDEO", "SVG",
  "A", "BUTTON",
  "UL", "OL", "BLOCKQUOTE",
  "FIGURE", "FORM",
  "DIV", "ARTICLE", "ASIDE", "HEADER", "FOOTER",
]);

const shouldSkip = (el: Element): boolean => {
  // Skip se già processato o dentro la navbar/footer globali
  if (el.hasAttribute(REVEAL_ATTR)) return true;
  if (el.closest("nav")) return true;
  if (el.closest("[data-no-reveal]")) return true;
  return false;
};

const collectTargetsForSection = (section: Element): Element[] => {
  const targets: Element[] = [];

  // Prendiamo i discendenti "significativi": preferiamo i figli diretti dei
  // contenitori di primo livello (in modo da catturare titolo, sottotitolo,
  // griglie di card, bottoni, ecc.) ma se un figlio è una "card interattiva"
  // o ha già animazioni, lo trattiamo come unità unica.
  const walk = (parent: Element, depth: number) => {
    // Limite di profondità per non animare ogni singolo span
    if (depth > 3) return;
    Array.from(parent.children).forEach((child) => {
      if (shouldSkip(child)) return;
      if (!ANIMATABLE_TAGS.has(child.tagName)) return;

      const hasOwnMotion = isInteractiveCard(child);

      if (hasOwnMotion) {
        // Anima il wrapper, non discendere
        targets.push(child);
        return;
      }

      // Se è un contenitore "neutro" con molti figli, scendi.
      // Altrimenti animalo direttamente.
      const isContainer =
        child.tagName === "DIV" ||
        child.tagName === "ARTICLE" ||
        child.tagName === "HEADER" ||
        child.tagName === "FOOTER" ||
        child.tagName === "ASIDE" ||
        child.tagName === "FORM" ||
        child.tagName === "UL" ||
        child.tagName === "OL";

      const childCount = child.children.length;

      if (isContainer && childCount > 1 && depth < 2) {
        walk(child, depth + 1);
      } else {
        targets.push(child);
      }
    });
  };

  walk(section, 0);
  return targets;
};

const AutoScrollReveal = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (isMobile || prefersReducedMotion) return;

    ensureStyles();

    let observer: IntersectionObserver | null = null;
    let rafId = 0;
    let mutationObserver: MutationObserver | null = null;

    const process = () => {
      const sections = document.querySelectorAll("section");
      if (!sections.length) return;

      if (!observer) {
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                const el = entry.target as HTMLElement;
                el.setAttribute(REVEAL_ATTR, "done");
                observer?.unobserve(el);
              }
            });
          },
          { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
        );
      }

      sections.forEach((section) => {
        const targets = collectTargetsForSection(section);
        targets.forEach((el, idx) => {
          if (el.hasAttribute(REVEAL_ATTR)) return;
          el.setAttribute(REVEAL_ATTR, "pending");
          (el as HTMLElement).style.transitionDelay = `${idx * 100}ms`;
          observer!.observe(el);
        });
      });
    };

    // Process iniziale (deferito) per dar tempo al DOM di renderizzare
    rafId = window.requestAnimationFrame(() => {
      window.setTimeout(process, 50);
    });

    // Riprocessa quando vengono aggiunte nuove sezioni (es. lazy mount)
    mutationObserver = new MutationObserver(() => {
      window.clearTimeout((mutationObserver as any)._t);
      (mutationObserver as any)._t = window.setTimeout(process, 100);
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.cancelAnimationFrame(rafId);
      observer?.disconnect();
      mutationObserver?.disconnect();
    };
  }, [pathname]);

  return null;
};

export default AutoScrollReveal;
