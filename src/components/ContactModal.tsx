import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useContactModal } from "./ContactModalContext";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/i18n/translations";
import { X } from "lucide-react";

const ContactModal = () => {
  const { isOpen, close, initialTopic } = useContactModal();
  const { t } = useLanguage();
  const T = translations.modal;
  const [submitted, setSubmitted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [gdprChecked, setGdprChecked] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const topics = [
    t(T.topic_1), t(T.topic_2), t(T.topic_3), t(T.topic_4),
    t(T.topic_5), t(T.topic_6), t(T.topic_7), t((T as any).topic_8), t((T as any).topic_9),
  ];

  useEffect(() => {
    if (isOpen) {
      setSelectedTopic(initialTopic);
      document.body.style.overflow = "hidden";
      requestAnimationFrame(() => { setVisible(true); });
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen, initialTopic]);

  const handleClose = () => {
    setVisible(false);
    setAnimating(true);
    setTimeout(() => { close(); setSubmitted(false); setAnimating(false); setGdprChecked(false); }, 150);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch("https://formspree.io/f/xykbpjze", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        toast.error("Errore nell'invio. Riprova.");
      }
    } catch {
      toast.error("Errore di rete. Controlla la connessione.");
    }
  };

  if (!isOpen && !animating) return null;

  const inputClass =
    "w-full rounded-lg border border-white/[0.08] bg-[#1a1a1a] px-4 py-3.5 text-sm text-foreground placeholder:text-[#555] focus:border-primary focus:outline-none transition-colors";
  const labelClass =
    "mb-1.5 block text-xs font-medium uppercase tracking-[1px] text-muted-foreground";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center sm:items-center"
      style={{
        background: "rgba(0,0,0,0.85)",
        backdropFilter: "blur(12px)",
        opacity: visible ? 1 : 0,
        transition: "opacity 200ms ease-out",
      }}
      onClick={handleClose}
    >
      <div
        ref={cardRef}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[560px] sm:w-[90%] sm:rounded-2xl rounded-t-2xl sm:rounded-b-2xl rounded-b-none fixed bottom-0 sm:static sm:bottom-auto"
        style={{
          background: "#111114",
          border: "1px solid rgba(255,255,255,0.08)",
          transform: visible ? "scale(1) translateY(0)" : "scale(0.96) translateY(16px)",
          opacity: visible ? 1 : 0,
          transition: "transform 200ms ease-out, opacity 200ms ease-out",
        }}
      >
        <div className="relative max-h-[90vh] overflow-y-auto p-6 sm:p-8">
          <button
            onClick={handleClose}
            className="absolute right-4 top-4 text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>

          {submitted ? (
            <div className="flex flex-col items-start justify-center gap-5">
              <p className="text-lg font-bold text-primary">{t(T.success)}</p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Perfetto, ti ricontattiamo entro 24h.<br />
                Se vuoi accelerare, prenota direttamente una call:
              </p>

              <CalendlyEmbed url="https://calendly.com/bdmedia-main/30min" />

              <Link
                to="/case-study/aeon-studio"
                onClick={handleClose}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Mentre aspetti, leggi come abbiamo portato Aeon da 7 a 86 lead/mese →
              </Link>
            </div>
          ) : (
            <>
              <div className="eyebrow mb-3 flex items-center gap-3">
                <span className="h-px w-6 bg-primary" />
                {t(T.eyebrow)}
              </div>

              <h2
                className="text-[28px] font-extrabold leading-tight text-foreground"
                style={{ letterSpacing: "-1px" }}
              >
                {t(T.title)}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">{t(T.subtitle)}</p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className={labelClass}>{t(T.label_nome)}</label>
                    <input type="text" name="nome" required placeholder={t(T.placeholder_nome)} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>{t(T.label_cognome)}</label>
                    <input type="text" name="cognome" required placeholder={t(T.placeholder_cognome)} className={inputClass} />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>{t(T.label_telefono)}</label>
                  <input type="tel" name="telefono" required placeholder={t(T.placeholder_telefono)} className={inputClass} />
                </div>

                <div>
                  <label className={labelClass}>{t(T.label_email)}</label>
                  <input type="email" name="email" required placeholder={t(T.placeholder_email)} className={inputClass} />
                </div>

                <div>
                  <label className={labelClass}>{t(T.label_topic)}</label>
                  <select name="argomento" required value={selectedTopic} onChange={(e) => setSelectedTopic(e.target.value)} className={`${inputClass} appearance-none`}
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12' fill='none'%3E%3Cpath d='M3 5L6 8L9 5' stroke='%23888' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 16px center",
                    }}
                  >
                    <option value="" disabled>{t(T.topic_placeholder)}</option>
                    {topics.map((topic) => (
                      <option key={topic} value={topic}>{topic}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={labelClass}>
                    {t((T as any).label_sito_web)}
                    <span className="ml-1.5 normal-case text-[10px] font-normal text-muted-foreground/60">
                      ({t((T as any).optional_hint)})
                    </span>
                  </label>
                  <input
                    type="url"
                    name="sito_web"
                    placeholder={t((T as any).placeholder_sito_web)}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    {t((T as any).label_obiettivo)}
                    <span className="ml-1.5 normal-case text-[10px] font-normal text-muted-foreground/60">
                      ({t((T as any).optional_hint)})
                    </span>
                  </label>
                  <textarea
                    name="obiettivo"
                    rows={3}
                    placeholder={t((T as any).placeholder_obiettivo)}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {/* Honeypot anti-spam — Formspree lo gestisce nativamente */}
                <input
                  type="text"
                  name="_gotcha"
                  tabIndex={-1}
                  autoComplete="off"
                  style={{ display: "none" }}
                />

                {/* Consenso GDPR — obbligatorio */}
                <div className="flex items-start gap-3 rounded-lg border border-white/[0.06] bg-white/[0.02] p-4">
                  <input
                    id="gdpr-consent"
                    type="checkbox"
                    required
                    checked={gdprChecked}
                    onChange={(e) => setGdprChecked(e.target.checked)}
                    className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-primary"
                  />
                  <label
                    htmlFor="gdpr-consent"
                    className="cursor-pointer text-xs leading-relaxed text-muted-foreground"
                  >
                    Ho letto la{" "}
                    <Link
                      to="/privacy"
                      onClick={handleClose}
                      className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"
                    >
                      Privacy Policy
                    </Link>{" "}
                    e acconsento al trattamento dei miei dati personali per essere ricontattato da BD Media.
                  </label>
                </div>

                <button type="submit" className="btn-primary w-full justify-center py-4 text-[15px]">
                  {t(T.submit)}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
