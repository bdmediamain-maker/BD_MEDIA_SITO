import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NoiseOverlay from "@/components/NoiseOverlay";
import ContactModal from "@/components/ContactModal";
import CalendlyButton from "@/components/CalendlyButton";
import { ContactModalProvider } from "@/components/ContactModalContext";
import { LanguageProvider } from "@/context/LanguageContext";
import Index from "./pages/Index";
import Services from "./pages/Services";
import About from "./pages/About";
import Portfolio from "./pages/Portfolio";
import Blog from "./pages/Blog";
import { Privacy, Rimborsi, Termini } from "./pages/Legal";
import CaseStudyAeonStudio from "./pages/CaseStudyAeonStudio";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const queryClient = new QueryClient();

// ── Organization JSON-LD — presente su tutte le pagine ──────────────────────
// TODO: sostituire i placeholder con i dati reali prima del go-live
const ORG_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "BD Media",
  "url": "https://bdmedia.it",
  "logo": "https://bdmedia.it/logo-full.png",
  "description": "Agenzia di performance marketing italiana specializzata in lead generation, Meta Ads, funnel e acquisizione clienti per PMI.",
  "telephone": "+39-338-286-2017",
  "email": "info@bdmedia.it",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "IT",
    "addressLocality": "[città]",       // TODO: inserire città sede legale
    "streetAddress": "[indirizzo]",     // TODO: inserire indirizzo sede legale
    "postalCode": "[CAP]"               // TODO: inserire CAP
  },
  "sameAs": [
    "https://www.instagram.com/bdmedia.agency/"
    // TODO: aggiungere URL LinkedIn reale quando creato
  ]
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

const App = () => (
  <HelmetProvider>
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
      <ContactModalProvider>
        {/* Organization JSON-LD — iniettato su ogni pagina */}
        <Helmet>
          <script type="application/ld+json">
            {JSON.stringify(ORG_SCHEMA)}
          </script>
        </Helmet>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <NoiseOverlay />
          <Navbar />
          <ContactModal />
          <CalendlyButton />
          <main className="pt-0">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/services" element={<Services />} />
              <Route path="/about" element={<About />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/rimborsi" element={<Rimborsi />} />
              <Route path="/termini" element={<Termini />} />
              <Route path="/case-study/aeon-studio" element={<CaseStudyAeonStudio />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </BrowserRouter>
      </ContactModalProvider>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
  </HelmetProvider>
);

export default App;
