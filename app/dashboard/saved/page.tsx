'use client'

import Link from 'next/link'
import { Heart, Trash2, MapPin, BedDouble, Bath, Maximize } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Skeleton } from '@/components/ui/Skeleton'

// Placeholder data — in production this would come from a useSavedProperties hook
const savedProperties = [
  {
    id: '1',
    title: '3BHK Luxury Apartment',
    location: 'Powai, Mumbai',
    price: '₹1.2 Cr',
    beds: 3,
    baths: 2,
    area: '1,500 sqft',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
    status: 'For Sale',
  },
  {
    id: '2',
    title: '4BHK Independent Villa',
    location: 'Whitefield, Bangalore',
    price: '₹2.5 Cr',
    beds: 4,
    baths: 3,
    area: '2,800 sqft',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop',
    status: 'For Sale',
  },
]

const statusVariant: Record<string, 'success' | 'warning' | 'info'> = {
  'For Sale': 'success',
  'For Rent': 'info',
  'Pending': 'warning',
}

export default function SavedPage() {
  const isLoading = false
  const properties = savedProperties

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy-900">Saved Properties</h1>
        <p className="text-sm text-navy-500">
          Properties you&apos;ve saved for later
        </p>
      </div>

      {isLoading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} padding="none">
              <Skeleton variant="rectangular" height={200} className="!rounded-b-none" />
              <div className="p-4 space-y-3">
                <Skeleton variant="text" width="80%" />
                <Skeleton variant="text" width="50%" />
                <Skeleton variant="text" width="60%" />
              </div>
            </Card>
          ))}
        </div>
      ) : properties.length === 0 ? (
        <Card padding="lg">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="rounded-full bg-red-50 p-4 mb-4">
              <Heart className="h-8 w-8 text-red-400" />
            </div>
            <h3 className="text-lg font-semibold text-navy-900 mb-1">
              No saved properties yet
            </h3>
            <p className="text-sm text-navy-500 mb-4 max-w-sm">
              Start exploring properties and save the ones you like. They&apos;ll appear here for
              quick access.
            </p>
            <Link href="/properties">
              <Button>Browse Properties</Button>
            </Link>
          </div>
        </Card>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {properties.map((property) => (
            <Card key={property.id} padding="none" hoverable>
              <Link href={`/properties/${property.id}`}>
                <div className="relative aspect-[4/3] overflow-hidden bg-navy-200">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant={statusVariant[property.status] ?? 'default'} size="sm">
                      {property.status}
                    </Badge>
                  </div>
                </div>
              </Link>
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <Link href={`/properties/${property.id}`}>
                    <h3 className="font-semibold text-navy-900 hover:text-primary-500 transition-colors">
                      {property.title}
                    </h3>
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="shrink-0 text-red-400 hover:text-red-600"
                    leftIcon={<Trash2 className="h-4 w-4" />}
                  >
                    Remove
                  </Button>
                </div>
                <div className="flex items-center gap-1 text-sm text-navy-400 mb-3">
                  <MapPin className="h-3.5 w-3.5 shrink-0" />
                  {property.location}
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-lg font-bold text-primary-500">{property.price}</p>
                  <div className="flex items-center gap-3 text-xs text-navy-500">
                    <span className="flex items-center gap-1">
                      <BedDouble className="h-3.5 w-3.5" /> {property.beds}
                    </span>
                    <span className="flex items-center gap-1">
                      <Bath className="h-3.5 w-3.5" /> {property.baths}
                    </span>
                    <span className="flex items-center gap-1">
                      <Maximize className="h-3.5 w-3.5" /> {property.area}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
