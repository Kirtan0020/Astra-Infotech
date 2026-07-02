import { Helmet } from 'react-helmet-async'
import { useContent } from '../content/ContentProvider.jsx'

export default function Seo({ title, description, path, image, type = 'website', jsonLd }) {
  const { settings } = useContent()
  const siteUrl = settings.site_url
  const siteName = settings.site_name
  const resolvedImage = image ?? settings.default_og_image
  const url = `${siteUrl}${path}`

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={resolvedImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={resolvedImage} />

      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Helmet>
  )
}
