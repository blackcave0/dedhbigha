'use client'

import { use, useState } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { useProperty, useProperties, useCreateLead } from '@/lib/hooks'
import { Navbar, Footer } from '@/components/layout'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Skeleton } from '@/components/ui/Skeleton'
import { cn } from '@/lib/utils'
import {
  MapPin, Bed, Bath, Maximize2, Home,
  CircleParking, Waves, Dumbbell, ShieldAlert, Wifi, Tv,
  Snowflake, Wind, Trees,
  Phone, ChevronLeft, ChevronRight,
  CheckCircle, Building2, User,
  ArrowLeft, Camera, ExternalLink, Star,
  Grid3X3, MessageSquare, Share2, MessageCircle, Link2,
} from 'lucide-react'
import type { Property } from '@/lib/types'

interface PropertyWithExtras extends Property {
  features?: string[]
  furnished?: string
  floors?: number
  totalFloors?: number
  transactionType?: string
  availability?: string
  ownerDetails?: {
    id?: string
    name: string
    phone?: string
    email?: string
    avatar?: string
    role?: string
  }
  youtubeUrl?: string
  virtualTourUrl?: string
  pricePerSqft?: number
  age?: string
  facing?: string
}

interface ApiResponse {
  property?: PropertyWithExtras
  similarProperties?: PropertyWithExtras[]
  [key: string]: unknown
}

const amenityIcons: Record<string, { icon: typeof Home; label: string }> = {
  parking: { icon: CircleParking, label: 'Parking' },
  swimming: { icon: Waves, label: 'Swimming Pool' },
  pool: { icon: Waves, label: 'Swimming Pool' },
  gym: { icon: Dumbbell, label: 'Gym / Fitness Center' },
  fitness: { icon: Dumbbell, label: 'Gym / Fitness Center' },
  security: { icon: ShieldAlert, label: '24/7 Security' },
  'power backup': { icon: ShieldAlert, label: 'Power Backup' },
  wifi: { icon: Wifi, label: 'Wi-Fi' },
  'cable tv': { icon: Tv, label: 'Cable TV' },
  'air conditioning': { icon: Snowflake, label: 'Air Conditioning' },
  ac: { icon: Snowflake, label: 'Air Conditioning' },
  ventilation: { icon: Wind, label: 'Ventilation' },
  garden: { icon: Trees, label: 'Garden / Park' },
  park: { icon: Trees, label: 'Garden / Park' },
  clubhouse: { icon: Building2, label: 'Clubhouse' },
  lift: { icon: Building2, label: 'Lift' },
  elevator: { icon: Building2, label: 'Elevator' },
  'rain water harvesting': { icon: Wind, label: 'Rain Water Harvesting' },
  'visitor parking': { icon: CircleParking, label: 'Visitor Parking' },
  'waste disposal': { icon: Wind, label: 'Waste Disposal' },
  'water storage': { icon: Wind, label: 'Water Storage' },
  'sports facility': { icon: Dumbbell, label: 'Sports Facility' },
  'kids play area': { icon: Trees, label: 'Kids Play Area' },
}

const defaultAmenities = [
  'parking', 'security', 'power backup', 'water storage',
  'waste disposal', 'lift', 'visitor parking',
]

function formatPrice(price: number, listingType?: string): string {
  const inr = price.toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  })
  if (listingType === 'Rent') {
    return `${inr}/mo`
  }
  if (price >= 10000000) {
    const cr = price / 10000000
    return `₹${cr.toFixed(2)} Cr`
  }
  if (price >= 100000) {
    const l = price / 100000
    return `₹${l.toFixed(2)} L`
  }
  return inr
}

function formatArea(area: number): string {
  if (area >= 43560) {
    return `${(area / 43560).toFixed(2)} acres`
  }
  if (area >= 9) {
    return `${area.toLocaleString('en-IN')} sq.ft`
  }
  return `${area} sq.m`
}

function getListingTypeVariant(type: string | undefined) {
  switch (type) {
    case 'Sale': return 'success' as const
    case 'Rent': return 'info' as const
    case 'Lease': return 'warning' as const
    default: return 'default' as const
  }
}

function SpecItem({ icon: Icon, label, value }: { icon: typeof Home; label: string; value: string | number | undefined | null }) {
  if (value == null || value === '' || value === 0) return null
  return (
    <div className="flex items-center gap-3 rounded-lg bg-navy-50 px-4 py-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100 text-primary-500">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-xs text-navy-500">{label}</p>
        <p className="text-sm font-semibold text-navy-900">{value}</p>
      </div>
    </div>
  )
}

function Breadcrumb({ property }: { property: PropertyWithExtras }) {
  return (
    <nav className="flex items-center gap-2 text-sm text-navy-500">
      <Link href="/" className="hover:text-primary-500 transition-colors">Home</Link>
      <span>/</span>
      {property.propertyType && (
        <>
          <Link
            href={`/${property.listingType?.toLowerCase() || 'buy'}/${property.propertyType.toLowerCase()}`}
            className="hover:text-primary-500 transition-colors capitalize"
          >
            {property.propertyType}s
          </Link>
          <span>/</span>
        </>
      )}
      <span className="text-navy-900 font-medium truncate max-w-[200px]">
        {property.title}
      </span>
    </nav>
  )
}

function ImageGallery({ images, title }: { images: string[]; title: string }) {
  const [selectedIndex, setSelectedIndex] = useState(0)

  if (!images || images.length === 0) {
    return (
      <div className="flex h-[400px] items-center justify-center rounded-xl bg-navy-100">
        <div className="text-center text-navy-400">
          <Camera className="mx-auto mb-2 h-12 w-12" />
          <p className="text-sm">No images available</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <div className="relative overflow-hidden rounded-xl bg-navy-100">
        <img
          src={images[selectedIndex]}
          alt={`${title} - Image ${selectedIndex + 1}`}
          className="h-[400px] w-full object-cover transition-opacity duration-300"
        />
        {images.length > 1 && (
          <>
            <Badge variant="default" size="sm" className="absolute left-4 top-4 bg-black/60 text-white border-0">
              <Camera className="mr-1 h-3 w-3" />
              {selectedIndex + 1}/{images.length}
            </Badge>
            <button
              onClick={() => setSelectedIndex(Math.max(0, selectedIndex - 1))}
              disabled={selectedIndex === 0}
              className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-navy-900 shadow-md transition-colors hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => setSelectedIndex(Math.min(images.length - 1, selectedIndex + 1))}
              disabled={selectedIndex === images.length - 1}
              className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-navy-900 shadow-md transition-colors hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelectedIndex(i)}
              className={cn(
                'relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border-2 transition-all',
                i === selectedIndex
                  ? 'border-primary-500 ring-1 ring-primary-500'
                  : 'border-navy-200 hover:border-navy-300 opacity-70 hover:opacity-100',
              )}
            >
              <img src={img} alt={`${title} thumbnail ${i + 1}`} className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function PropertyHeader({ property }: { property: PropertyWithExtras }) {
  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
  const shareText = `Check out this property: ${property.title}`

  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          {property.listingType && (
            <Badge variant={getListingTypeVariant(property.listingType)}>
              For {property.listingType}
            </Badge>
          )}
          {property.verified && (
            <Badge variant="success" size="sm">
              <CheckCircle className="mr-1 h-3 w-3" /> Verified
            </Badge>
          )}
          {property.featured && (
            <Badge variant="warning" size="sm">
              <Star className="mr-1 h-3 w-3" /> Featured
            </Badge>
          )}
          {property.transactionType && (
            <Badge variant="info" size="sm">
              {property.transactionType}
            </Badge>
          )}
        </div>
        <h1 className="font-heading text-2xl font-bold text-navy-900 sm:text-3xl">
          {property.title}
        </h1>
        <div className="mt-2 flex items-center gap-1.5 text-sm text-navy-500">
          <MapPin className="h-4 w-4 shrink-0 text-primary-500" />
          <span>
            {[property.address, property.city, property.state].filter(Boolean).join(', ')}
          </span>
        </div>
      </div>
      <div className="text-right shrink-0">
        <p className="font-heading text-3xl font-bold text-primary-500">
          {formatPrice(property.price, property.listingType)}
        </p>
        {property.pricePerSqft && property.pricePerSqft > 0 && (
          <p className="mt-1 text-sm text-navy-500">
            ₹{property.pricePerSqft.toLocaleString('en-IN')}/sq.ft
          </p>
        )}
        <div className="mt-3 flex items-center justify-end gap-2">
          <a
            href={`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-navy-200 text-navy-500 hover:border-green-400 hover:text-green-500 transition-colors"
            aria-label="Share on WhatsApp"
          >
            <MessageCircle className="h-4 w-4" />
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-navy-200 text-navy-500 hover:border-blue-400 hover:text-blue-600 transition-colors"
            aria-label="Share on Facebook"
          >
            <Link2 className="h-4 w-4" />
          </a>
          <a
            href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-navy-200 text-navy-500 hover:border-blue-300 hover:text-blue-500 transition-colors"
            aria-label="Share on LinkedIn"
          >
            <Share2 className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  )
}

function KeySpecs({ property }: { property: PropertyWithExtras }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      <SpecItem icon={Bed} label="Bedrooms" value={property.bedrooms} />
      <SpecItem icon={Bath} label="Bathrooms" value={property.bathrooms} />
      <SpecItem icon={Maximize2} label="Area" value={property.area ? formatArea(property.area) : undefined} />
      <SpecItem icon={Grid3X3} label="Property Type" value={property.propertyType} />
    </div>
  )
}

function FeaturesAmenities({ property }: { property: PropertyWithExtras }) {
  const featureList = property.features?.length ? property.features : defaultAmenities
  return (
    <div className="space-y-4">
      <h2 className="font-heading text-xl font-bold text-navy-900">Features & Amenities</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {featureList.map((feature) => {
          const mapped = amenityIcons[feature.toLowerCase().trim()]
          const Icon = mapped?.icon || CheckCircle
          return (
            <div key={feature} className="flex items-center gap-2.5 rounded-lg border border-navy-100 bg-white px-3 py-2.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary-50 text-primary-500">
                <Icon className="h-4 w-4" />
              </div>
              <span className="text-sm font-medium text-navy-700">{mapped?.label || feature}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function MapPlaceholder({ property }: { property: PropertyWithExtras }) {
  const mapQuery = encodeURIComponent(
    [property.address, property.city, property.state].filter(Boolean).join(', ')
  )
  return (
    <div className="space-y-3">
      <h2 className="font-heading text-xl font-bold text-navy-900">Location</h2>
      <div className="relative flex h-[250px] items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-navy-50 to-navy-100">
        <div className="text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-primary-100">
            <MapPin className="h-7 w-7 text-primary-500" />
          </div>
          <p className="text-sm font-medium text-navy-700">
            {[property.address, property.city].filter(Boolean).join(', ')}
          </p>
          <p className="mb-3 text-xs text-navy-500">{property.state}</p>
          <a
            href={`https://www.google.com/maps/search/${mapQuery}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-500 hover:text-primary-600 transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
            View on Google Maps
          </a>
        </div>
      </div>
    </div>
  )
}

function OwnerCard({ property }: { property: PropertyWithExtras }) {
  const owner = property.ownerDetails
  const isBuilder = owner?.role === 'BUILDER' || owner?.role === 'DEALER'

  if (!owner) {
    return (
      <Card padding="md">
        <div className="text-center text-navy-400">
          <User className="mx-auto mb-2 h-8 w-8" />
          <p className="text-sm">Owner information unavailable</p>
        </div>
      </Card>
    )
  }

  return (
    <Card padding="md">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary-500 text-lg font-bold text-white">
          {owner.avatar ? (
            <img src={owner.avatar} alt={owner.name} className="h-full w-full rounded-full object-cover" />
          ) : (
            owner.name.charAt(0).toUpperCase()
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="font-semibold text-navy-900 truncate">{owner.name}</p>
            {isBuilder && (
              <Badge variant="info" size="sm">Builder</Badge>
            )}
          </div>
          <p className="text-sm text-navy-500 capitalize">{owner.role?.toLowerCase().replace('_', ' ') || 'Property Owner'}</p>
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-2">
        {owner.phone && (
          <Button variant="primary" fullWidth leftIcon={<Phone className="h-4 w-4" />}>
            <a href={`tel:${owner.phone}`} className="w-full">
              Call {owner.phone}
            </a>
          </Button>
        )}
        <Button variant="outline" fullWidth>
          View Profile
        </Button>
      </div>
    </Card>
  )
}

function LeadForm({ propertyId, ownerId }: { propertyId: string; ownerId?: string }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const createLead = useCreateLead()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createLead.mutateAsync({
        propertyId,
        ownerId: ownerId || '',
        name,
        email: email || undefined,
        phone,
        message: message || undefined,
      })
      setSubmitted(true)
    } catch {
      // Error handled by query client
    }
  }

  if (submitted) {
    return (
      <Card padding="md" className="text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
          <CheckCircle className="h-6 w-6 text-green-600" />
        </div>
        <h3 className="font-semibold text-navy-900">Enquiry Sent!</h3>
        <p className="mt-1 text-sm text-navy-500">
          The owner will get back to you shortly.
        </p>
      </Card>
    )
  }

  return (
    <Card padding="md">
      <div className="mb-4 flex items-center gap-2">
        <MessageSquare className="h-5 w-5 text-primary-500" />
        <h3 className="font-heading text-lg font-bold text-navy-900">Interested in this property?</h3>
      </div>
      <form onSubmit={handleSubmit} className="space-y-3">
        <Input
          label="Your Name"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          label="Email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label="Phone"
          type="tel"
          placeholder="Enter your phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <div className="w-full">
          <label className="mb-1.5 block text-sm font-medium text-navy-700">Message (optional)</label>
          <textarea
            placeholder="I'm interested in this property. Please share more details."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            className="w-full rounded-lg border border-navy-200 bg-white px-3 py-2 text-sm text-navy-900 placeholder:text-navy-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 hover:border-navy-300"
          />
        </div>
        <Button type="submit" variant="primary" fullWidth loading={createLead.isPending}>
          Send Enquiry
        </Button>
      </form>
    </Card>
  )
}

function SimilarProperties({ currentId }: { currentId: string }) {
  const { data, isLoading } = useProperties({ limit: 5 })

  let properties: PropertyWithExtras[] = []
  if (data) {
    const arr = 'properties' in data ? (data as { properties: PropertyWithExtras[] }).properties : []
    properties = arr.filter((p) => p.id !== currentId).slice(0, 4)
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h2 className="font-heading text-xl font-bold text-navy-900">Similar Properties</h2>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="min-w-[260px] space-y-3">
              <Skeleton variant="rectangular" width={260} height={180} />
              <Skeleton variant="text" width="80%" />
              <Skeleton variant="text" width="60%" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (properties.length === 0) return null

  return (
    <div className="space-y-4">
      <h2 className="font-heading text-xl font-bold text-navy-900">Similar Properties</h2>
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin">
        {properties.map((p) => (
          <Link key={p.id} href={`/properties/${p.id}`} className="min-w-[260px] shrink-0">
            <Card hoverable padding="none" className="h-full">
              <div className="aspect-[4/3] w-full overflow-hidden bg-navy-100">
                {p.images?.[0] ? (
                  <img src={p.images[0]} alt={p.title} className="h-full w-full object-cover transition-transform duration-300 hover:scale-105" />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <Camera className="h-8 w-8 text-navy-300" />
                  </div>
                )}
              </div>
              <div className="p-3">
                <p className="text-sm font-semibold text-navy-900 truncate">{p.title}</p>
                <p className="text-lg font-bold text-primary-500">
                  {formatPrice(p.price, p.listingType)}
                </p>
                <div className="mt-1 flex items-center gap-1 text-xs text-navy-500">
                  <MapPin className="h-3 w-3" />
                  <span className="truncate">{p.city}</span>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

function LoadingSkeleton() {
  return (
    <div className="space-y-8">
      <Skeleton variant="rectangular" width="100%" height={400} className="rounded-xl" />
      <div className="space-y-4">
        <div className="flex gap-2">
          <Skeleton variant="text" width={80} height={24} />
          <Skeleton variant="text" width={100} height={24} />
        </div>
        <Skeleton variant="text" width="70%" height={36} />
        <Skeleton variant="text" width="50%" height={20} />
        <div className="grid grid-cols-4 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} variant="rectangular" height={72} className="rounded-lg" />
          ))}
        </div>
        <Skeleton variant="rectangular" height={120} />
        <Skeleton variant="rectangular" height={200} />
      </div>
    </div>
  )
}

function StructuredData({ property }: { property: PropertyWithExtras }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: property.title,
    description: property.description,
    url: typeof window !== 'undefined' ? window.location.href : '',
    image: property.images?.[0] || '',
    numberOfBedrooms: property.bedrooms,
    numberOfBathrooms: property.bathrooms,
    floorSize: {
      '@type': 'QuantitativeValue',
      value: property.area,
      unitText: 'SquareFeet',
    },
    offers: {
      '@type': 'Offer',
      price: property.price,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: property.address,
      addressLocality: property.city,
      addressRegion: property.state,
      addressCountry: 'IN',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export default function PropertyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const { data, isLoading, error } = useProperty(id)

  if (error) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex flex-1 items-center justify-center px-4 py-20">
          <div className="text-center max-w-md">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <ShieldAlert className="h-8 w-8 text-red-500" />
            </div>
            <h2 className="mb-2 font-heading text-2xl font-bold text-navy-900">Something went wrong</h2>
            <p className="mb-6 text-navy-500">Failed to load property details. Please try again.</p>
            <Button onClick={() => window.location.reload()} variant="primary">
              Try Again
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6">
          <LoadingSkeleton />
        </main>
        <Footer />
      </div>
    )
  }

  const rawProperty = data && (
    'property' in (data as ApiResponse)
      ? (data as ApiResponse).property
      : data
  ) as PropertyWithExtras | undefined

  if (!rawProperty || !rawProperty.id) {
    notFound()
  }

  const property = rawProperty

  return (
    <div className="flex min-h-screen flex-col">
      <StructuredData property={property} />
      <Navbar />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Breadcrumb property={property} />
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-8 lg:col-span-2">
            <ImageGallery images={property.images} title={property.title} />
            <PropertyHeader property={property} />
            <KeySpecs property={property} />

            {/* Description */}
            <div className="space-y-3">
              <h2 className="font-heading text-xl font-bold text-navy-900">Description</h2>
              <p className="text-sm leading-relaxed text-navy-600 whitespace-pre-line">
                {property.description}
              </p>
            </div>

            <FeaturesAmenities property={property} />

            <MapPlaceholder property={property} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6 lg:col-span-1">
            <div className="lg:sticky lg:top-24 space-y-6">
              <OwnerCard property={property} />
              <LeadForm propertyId={property.id || ''} ownerId={property.owner} />
            </div>
          </div>
        </div>

        {/* Similar Properties */}
        <div className="mt-12">
          <SimilarProperties currentId={property.id || ''} />
        </div>
      </main>

      <Footer />
    </div>
  )
}
