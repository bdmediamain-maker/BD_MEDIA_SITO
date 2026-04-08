import { Helmet } from "react-helmet-async";

// TODO: aggiornare SITE_URL se il dominio live è diverso
const SITE_URL = "https://bdmedia.it";

const DEFAULT_OG_IMAGE =
  "https://storage.googleapis.com/gpt-engineer-file-uploads/c4Pf2hs8c1gbtoNyPzDCzI5TdDx2/social-images/social-1775140165764-zxczxczxc1212asd.webp";

interface SEOProps {
  title: string;
  description: string;
  ogImage?: string;
  /** URL assoluto della pagina corrente — usato per og:url e canonical */
  ogUrl?: string;
  canonicalUrl?: string;
  /** Schema.org JSON-LD opzionale, passare come oggetto o array di oggetti */
  jsonLd?: object | object[];
}

const SEO = ({
  title,
  description,
  ogImage = DEFAULT_OG_IMAGE,
  ogUrl,
  canonicalUrl,
  jsonLd,
}: SEOProps) => {
  const pageUrl = ogUrl ?? canonicalUrl ?? SITE_URL;
  const canonical = canonicalUrl ?? ogUrl ?? SITE_URL;

  return (
    <Helmet>
      {/* Base */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="BD Media" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* JSON-LD Structured Data */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(Array.isArray(jsonLd) ? jsonLd : jsonLd)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
