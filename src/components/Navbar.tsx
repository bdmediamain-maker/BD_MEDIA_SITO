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
        className={`min-h-[44px] min-w-[44px] rounded-full border-none px-3 py-2 text-xs font-semibold tracking-wide transition-all ${
          lang === "it" ? "bg-white/[0.08] text-foreground" : "bg-transparent text-muted-foreground"
        }`}
      >
        IT
      </button>
      <button
        onClick={() => setLang("en")}
        className={`min-h-[44px] min-w-[44px] rounded-full border-none px-3 py-2 text-xs font-semibold tracking-wide transition-all ${
          lang === "en" ? "bg-white/[0.08] text-foreground" : "bg-transparent text-muted-foreground"
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

  const navLinks = [
    { label: t(T.services), to: "/services" },
    { label: t(T.about), to: "/about" },
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

  return (
    <>
      <nav className="fixed left-0 right-0 top-0 z-50 border-b border-white/[0.05] bg-[rgba(10,10,10,0.85)] backdrop-blur-[20px]">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:px-12">
          <Link to="/" className="flex items-center">
            <img
              src="/logo-full.png"
              alt="BD Media"
              width={683}
              height={183}
              className="block h-[45px] w-auto md:h-[53px]"
            />
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-7 md:flex">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`relative pb-1.5 text-sm transition-colors hover:text-foreground after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 after:ease-in-out hover:after:scale-x-100 ${
                  location.pathname === l.to ? "text-foreground after:scale-x-100" : "text-muted-foreground"
                }`}
              >
                {l.label}
              </Link>
            ))}

            {/* Dropdown */}
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="relative flex items-center gap-1 pb-1 text-sm text-muted-foreground transition-colors hover:text-foreground after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 after:ease-in-out hover:after:scale-x-100"
              >
                {t(T.pages)}
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={`transition-transform ${dropdownOpen ? "rotate-180" : ""}`}>
                  <path d="M3 5L6 8L9 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {dropdownOpen && (
                <div
                  className="absolute right-0 top-full mt-2 w-56 p-2 shadow-xl"
                  style={{
                    background: "rgba(13, 0, 16, 0.85)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    border: "0.5px solid rgba(255,255,255,0.10)",
                    borderRadius: "12px",
                  }}
                >
                  {dropdownLinks.map((l) => (
                    <Link
                      key={l.to}
                      to={l.to}
                      className="block rounded-lg px-4 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-[rgba(255,255,255,0.06)] hover:text-white"
                    >
                      {t(T[l.key])}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right */}
          <div className="hidden items-center gap-4 md:flex">
            <LangSwitcher />
            <button onClick={openContactModal} className="btn-primary no-glow text-sm">
              {t(T.cta)}
            </button>
          </div>

          {/* Mobile hamburger toggle */}
          <button
            className="relative z-[60] flex h-10 w-10 items-center justify-center md:hidden"
            style={{ touchAction: "manipulation", WebkitTapHighlightColor: "transparent" }}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Chiudi menu" : "Apri menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <div className="flex flex-col gap-1.5">
                <span className="block h-0.5 w-6 bg-foreground" />
                <span className="block h-0.5 w-6 bg-foreground" />
                <span className="block h-0.5 w-6 bg-foreground" />
              </div>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile fullscreen menu */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[55] flex flex-col overflow-y-auto px-6 pb-10 pt-24 md:hidden"
          style={{
            background: "rgba(13, 0, 16, 0.97)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            transition: "none",
            animation: "none",
          }}
        >
          <button
            onClick={() => setMobileOpen(false)}
            className="absolute right-4 top-4 z-[60] flex min-h-[44px] min-w-[44px] items-center justify-center text-white"
            style={{ touchAction: "manipulation", WebkitTapHighlightColor: "transparent" }}
            aria-label="Chiudi menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <nav className="flex flex-col gap-2">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setMobileOpen(false)}
                className="block py-3 text-2xl font-semibold text-foreground"
              >
                {l.label}
              </Link>
            ))}

            <div className="mt-2 border-t border-white/[0.08] pt-4">
              <div className="mb-2 text-xs font-semibold uppercase tracking-[2px] text-primary">
                {t(T.pages)}
              </div>
              {dropdownLinks.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setMobileOpen(false)}
                  className="block py-2 text-base text-muted-foreground"
                >
                  {t(T[l.key])}
                </Link>
              ))}
            </div>
          </nav>

          <div className="mt-8 flex flex-col gap-4">
            <LangSwitcher />
            <button
              onClick={() => {
                setMobileOpen(false);
                openContactModal();
              }}
              className="btn-primary no-glow w-full justify-center text-sm"
            >
              {t(T.cta)}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
