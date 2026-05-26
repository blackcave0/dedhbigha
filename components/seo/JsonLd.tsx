interface WebSiteJsonLdProps {
  url: string
  name: string
  description: string
}

export function WebSiteJsonLd({ url, name, description }: WebSiteJsonLdProps) {
  const json = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url,
    name,
    description,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${url}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />
}

interface OrganizationJsonLdProps {
  name: string
  url: string
  logo?: string
  contactPoint?: {
    telephone: string
    contactType: string
  }
}

export function OrganizationJsonLd({ name, url, logo, contactPoint }: OrganizationJsonLdProps) {
  const json: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    url,
  }
  if (logo) json.logo = logo
  if (contactPoint) {
    json.contactPoint = {
      '@type': 'ContactPoint',
      telephone: contactPoint.telephone,
      contactType: contactPoint.contactType,
    }
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />
}

interface BreadcrumbJsonLdProps {
  items: { name: string; url: string }[]
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const json = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />
}

interface RealEstateListingJsonLdProps {
  name: string
  description: string
  url: string
  image: string[]
  price: number
  currency?: string
  area?: number
  bedrooms?: number
  bathrooms?: number
  address: {
    streetAddress?: string
    city: string
    state: string
  }
}

export function RealEstateListingJsonLd({
  name,
  description,
  url,
  image,
  price,
  currency = 'INR',
  area,
  bedrooms,
  bathrooms,
  address,
}: RealEstateListingJsonLdProps) {
  const json: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name,
    description,
    url,
    image,
    offers: {
      '@type': 'Offer',
      price,
      priceCurrency: currency,
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: address.city,
      addressRegion: address.state,
      ...(address.streetAddress && { streetAddress: address.streetAddress }),
    },
  }
  if (area) json.floorSize = { '@type': 'QuantitativeValue', value: area, unitCode: 'FTK' }
  if (bedrooms) json.numberOfBedrooms = bedrooms
  if (bathrooms) json.numberOfBathrooms = bathrooms
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />
}
