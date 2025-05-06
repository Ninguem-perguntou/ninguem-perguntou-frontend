import { Helmet, HelmetProvider } from 'react-helmet-async'

const SEO = ({ title, description, keywords, image, url, type }: {title: string, description: string, keywords: string, image: string, url: string, type: string}) => {
  return (
    <HelmetProvider>
      <Helmet>
        {/* Metadados básicos */}
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="robots" content="index, follow" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content={type || 'website'} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:url" content={url} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />

        {/* Canonical URL */}
        <link rel="canonical" href={url} />
      </Helmet>
    </HelmetProvider>
  )
}

export default SEO

SEO.defaultProps = {
  title: 'NINGUÉM PERGUNTOU',
  description: 'É um site de jornalismo online dedicado ao público LGBTQIA+ e mulheres de 18 a 50 anos. Abordamos temas relevantes como saúde, cultura pop e destacamos mulheres inspiradoras na sociedade.',
  keywords: 'LGBTQIA+, mulheres, saúde, cultura pop',
  image: 'https://ninguem-perguntou.vercel.app/assets/icon-BhCtsIMm.png',
  url: 'https://ninguem-perguntou.vercel.app',
  type: 'portal de notícias '
}