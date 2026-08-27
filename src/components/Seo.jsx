import { Helmet } from 'react-helmet-async'
import { useContent } from '../content/ContentProvider.jsx'

export default function Seo({ title, description, path, image, type = 'website', jsonLd }) {
  const { settings } = useContent()
  const siteUrl = settings.site_url
  const siteName = settings.site_name
  const resolvedImage = image ?? settings.default_og_image
  const url = `${siteUrl}${path}`

  // Auto breadcrumb trail from the path, so every page gets BreadcrumbList
  // structured data (helps AI answer engines and Google understand site
  // hierarchy) without each page having to build it by hand.
  const segments = path.split('/').filter(Boolean)
  const breadcrumbList =
    segments.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: siteName, item: siteUrl },
            ...segments.map((seg, i) => ({
              '@type': 'ListItem',
              position: i + 2,
              name: seg
                .split('-')
                .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                .join(' '),
              item: `${siteUrl}/${segments.slice(0, i + 1).join('/')}`,
            })),
          ],
        }
      : null

  const jsonLdList = [...(Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : []), ...(breadcrumbList ? [breadcrumbList] : [])]

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

      {jsonLdList.map((entry, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(entry)}
        </script>
      ))}
    </Helmet>
  )
}
