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
    <div className="flex items-center gap-0.5 rounded-full border border-white/[0.12] px-1.5 py-1 text-xs font-semibold tracking-wide select-none">
      <button
        onClick={() => setLang("it")}
        className={`rounded-full border-none px-2.5 py-1 text-xs font-semibold tracking-wide transition-all ${
          lang === "it" ? "bg-white/[0.08] text-foreground" : "bg-transparent text-muted-foreground"
        }`}
      >
        IT
      </button>
      <button
        onClick={() => setLang("en")}
        className={`rounded-full border-none px-2.5 py-1 text-xs font-semibold tracking-wide transition-all ${
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
                <div className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-white/[0.06] bg-[#1a1a1a] p-2 shadow-xl">
                  {dropdownLinks.map((l) => (
                    <Link
                      key={l.to}
                      to={l.to}
                      className="block rounded-lg px-4 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-white/[0.04] hover:text-foreground"
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
            <button onClick={openContactModal} className="btn-primary text-sm">
              {t(T.cta)}
            </button>
          </div>

          {/* Hamburger */}
          <button
            className="flex h-10 w-10 items-center justify-center md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            <div className="flex flex-col gap-1.5">
              <span className={`h-0.5 w-6 bg-foreground transition-all ${mobileOpen ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`h-0.5 w-6 bg-foreground transition-all ${mobileOpen ? "opacity-0" : ""}`} />
              <span className={`h-0.5 w-6 bg-foreground transition-all ${mobileOpen ? "-translate-y-2 -rotate-45" : ""}`} />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden" onClick={() => setMobileOpen(false)}>
          <div className="absolute inset-0 bg-black/60" />
          <div
            className="absolute right-0 top-0 h-full w-72 bg-[#0e0e12] p-8 pt-24"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-5">
              {navLinks.map((l) => (
                <Link key={l.to} to={l.to} className="text-lg font-medium text-muted-foreground transition-colors hover:text-foreground">
                  {l.label}
                </Link>
              ))}
              <div className="border-t border-white/[0.06] pt-4">
                {dropdownLinks.map((l) => (
                  <Link key={l.to} to={l.to} className="block py-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
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
