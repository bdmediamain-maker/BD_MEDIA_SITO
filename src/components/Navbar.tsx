import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useContactModal } from "./ContactModalContext";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/i18n/translations";

const dropdownLinks = [
  { key: "privacy" as const, to: "/privacy" },
  { key: "rimborsi" as const, to: "/rimborsi" },
  { key: "termini" as const, to: "/termini" },
];

const LangSwitcher = () => {
  const { lang, setLang } = useLanguage();
  return (
    <div className="flex items-center gap-0.5 rounded-full border border-white/[0.12] px-1 py-0.5 text-xs font-semibold tracking-wide select-none">
      <button
        onClick={() => setLang("it")}
        className={`min-h-[36px] min-w-[36px] rounded-full border-none px-2.5 py-1.5 text-xs font-semibold tracking-wide transition-all ${
          lang === "it" ? "bg-white/[0.12] text-foreground" : "bg-transparent text-white/60"
        }`}
      >
        IT
      </button>
      <button
        onClick={() => setLang("en")}
        className={`min-h-[36px] min-w-[36px] rounded-full border-none px-2.5 py-1.5 text-xs font-semibold tracking-wide transition-all ${
          lang === "en" ? "bg-white/[0.12] text-foreground" : "bg-transparent text-white/60"
        }`}
      >
        EN
      </button>
    </div>
  );
};

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const { open: openContactModal } = useContactModal();
  const { t } = useLanguage();
  const T = translations.nav;

  const leftLinks = [
    { label: t(T.services), to: "/services" },
    { label: t(T.about), to: "/about" },
  ];

  const rightLinks = [
    { label: t(T.portfolio), to: "/portfolio" },
  ];

  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const glassLink = (to: string) =>
    `liquid-glass-link ${location.pathname === to ? "active" : ""}`;

  return (
    <>
      {/* ── Desktop Liquid Glass Navbar ── */}
      <nav
        className="fixed left-1/2 top-6 z-[100] hidden -translate-x-1/2 md:block"
        style={{
          maxWidth: 880,
          width: "calc(100% - 48px)",
          borderRadius: 9999,
          padding: "12px 32px",
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          border: "1px solid rgba(255,255,255,0.18)",
          boxShadow:
            "0 8px 32px rgba(0,0,0,0.12), inset 0 1px 1px rgba(255,255,255,0.25), inset 0 -1px 1px rgba(255,255,255,0.08)",
          backgroundImage:
            "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 100%)",
          transition: "all 0.3s ease",
        }}
      >
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
          {/* Left links */}
          <div className="flex items-center gap-3 justify-self-end">
            {leftLinks.map((l) => (
              <Link key={l.to} to={l.to} className={glassLink(l.to)}>
                <span className="liquid-glass-link-border" />
                <span className="relative z-10">{l.label}</span>
              </Link>
            ))}
          </div>

          {/* Center logo */}
          <Link to="/" className="flex items-center justify-center">
            <img
              src="/logo-full.png"
              alt="BD Media"
              width={683}
              height={183}
              className="block h-[38px] w-auto"
            />
          </Link>

          {/* Right links + dropdown + lang + CTA */}
          <div className="flex items-center gap-3 justify-self-start">
            {rightLinks.map((l) => (
              <Link key={l.to} to={l.to} className={glassLink(l.to)}>
                <span className="liquid-glass-link-border" />
                <span className="relative z-10">{l.label}</span>
              </Link>
            ))}

            {/* Pages dropdown */}
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={`liquid-glass-link ${dropdownOpen ? "active" : ""}`}
              >
                <span className="liquid-glass-link-border" />
                <span className="relative z-10 flex items-center gap-1">
                  {t(T.pages)}
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={`transition-transform ${dropdownOpen ? "rotate-180" : ""}`}>
                    <path d="M3 5L6 8L9 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </button>
              {dropdownOpen && (
                <div
                  className="absolute right-0 top-full mt-3 w-52 rounded-2xl p-2 shadow-xl"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    backdropFilter: "blur(24px) saturate(180%)",
                    WebkitBackdropFilter: "blur(24px) saturate(180%)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.2), inset 0 1px 1px rgba(255,255,255,0.2)",
                  }}
                >
                  {dropdownLinks.map((l) => (
                    <Link
                      key={l.to}
                      to={l.to}
                      className="block rounded-xl px-4 py-2.5 text-sm text-white/70 transition-colors hover:bg-white/[0.06] hover:text-white"
                    >
                      {t(T[l.key])}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <LangSwitcher />

            <button onClick={openContactModal} className="btn-primary text-sm !py-2.5 !px-5">
              {t(T.cta)}
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile Liquid Glass Navbar ── */}
      <nav
        className="fixed left-1/2 top-4 z-[100] -translate-x-1/2 md:hidden"
        style={{
          width: "calc(100% - 32px)",
          borderRadius: 9999,
          padding: "10px 20px",
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          border: "1px solid rgba(255,255,255,0.18)",
          boxShadow:
            "0 8px 32px rgba(0,0,0,0.12), inset 0 1px 1px rgba(255,255,255,0.25), inset 0 -1px 1px rgba(255,255,255,0.08)",
          backgroundImage:
            "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 100%)",
          transition: "all 0.3s ease",
        }}
      >
        <div className="flex items-center justify-between">
          {/* Hamburger */}
          <button
            className="flex h-10 w-10 items-center justify-center"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            <div className="flex flex-col gap-1.5">
              <span className={`h-0.5 w-5 bg-white transition-all ${mobileOpen ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`h-0.5 w-5 bg-white transition-all ${mobileOpen ? "opacity-0" : ""}`} />
              <span className={`h-0.5 w-5 bg-white transition-all ${mobileOpen ? "-translate-y-2 -rotate-45" : ""}`} />
            </div>
          </button>

          {/* Logo centered */}
          <Link to="/" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <img src="/logo-full.png" alt="BD Media" className="h-[34px] w-auto" />
          </Link>

          {/* CTA */}
          <button onClick={openContactModal} className="btn-primary !py-2 !px-4 text-xs">
            {t(T.cta)}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[99] md:hidden" onClick={() => setMobileOpen(false)}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div
            className="absolute right-0 top-0 h-full w-72 p-8 pt-24"
            style={{
              background: "rgba(14,14,18,0.92)",
              backdropFilter: "blur(24px) saturate(180%)",
              WebkitBackdropFilter: "blur(24px) saturate(180%)",
              borderLeft: "1px solid rgba(255,255,255,0.1)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-5">
              {[...leftLinks, ...rightLinks].map((l) => (
                <Link key={l.to} to={l.to} className="text-lg font-medium text-white/70 transition-colors hover:text-white">
                  {l.label}
                </Link>
              ))}
              <div className="border-t border-white/[0.08] pt-4">
                {dropdownLinks.map((l) => (
                  <Link key={l.to} to={l.to} className="block py-2 text-sm text-white/60 transition-colors hover:text-white">
                    {t(T[l.key])}
                  </Link>
                ))}
              </div>
              <LangSwitcher />
              <button onClick={openContactModal} className="btn-primary mt-4 w-full justify-center text-sm">
                {t(T.cta)}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
