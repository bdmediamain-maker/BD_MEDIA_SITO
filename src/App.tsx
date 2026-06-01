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
import { CalendlyModalProvider } from "@/components/CalendlyModal";
import FloatingCalendlyWidget from "@/components/FloatingCalendlyWidget";
import SplashScreen from "@/components/SplashScreen";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgressBar from "@/components/ScrollProgressBar";

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

// ── LocalBusiness / MarketingAgency JSON-LD — presente su tutte le pagine ──
const LOCAL_BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "MarketingAgency",
  "name": "BD Media",
  "alternateName": "BD Media Growth Partner",
  "url": "https://bdmedia.it",
  "logo": "https://bdmedia.it/logo.png",
  "description": "Agenzia di marketing digitale italiana specializzata in sistemi di acquisizione clienti misurabili e scalabili.",
  "telephone": "+39 338 286 2017",
  "email": "info@bdmedia.it",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "IT"
  },
  "areaServed": {
    "@type": "Country",
    "name": "Italia"
  },
  "serviceType": ["Marketing Digitale", "Lead Generation", "Campagne ADS", "Funnel Marketing", "Siti Web", "Social Media Marketing"],
  "sameAs": [
    "https://www.instagram.com/bdmedia.it"
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
        <CalendlyModalProvider>
        <SplashScreen />
        <CustomCursor />
        {/* Organization + LocalBusiness JSON-LD — iniettati su ogni pagina */}
        <Helmet>
          <meta name="google-site-verification" content="ClP6KpX-EGQSaE_Nd_YSBzGPVMzGDSaYvpntzMlF1dU" />
          <script type="application/ld+json">
            {JSON.stringify(ORG_SCHEMA)}
          </script>
          <script type="application/ld+json">
            {JSON.stringify(LOCAL_BUSINESS_SCHEMA)}
          </script>
        </Helmet>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollProgressBar />
          <ScrollToTop />
          <NoiseOverlay />
          <Navbar />
          <ContactModal />
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
          <FloatingCalendlyWidget />
        </BrowserRouter>
        </CalendlyModalProvider>
      </ContactModalProvider>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
  </HelmetProvider>
);

export default App;
