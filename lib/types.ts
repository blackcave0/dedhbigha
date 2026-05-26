export type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'BUILDER' | 'DEALER' | 'OWNER' | 'BUYER' | 'TENANT'

export interface User {
  id?: string
  name: string
  email?: string
  phone: string
  password?: string
  role: UserRole
  avatar?: string
  verified: boolean
  createdAt?: string
  updatedAt?: string
}

export type ListingType = 'Sale' | 'Rent' | 'Lease'
export type PropertyType = 'Flat' | 'Villa' | 'Plot' | 'Land' | 'Shop' | 'Office' | 'Warehouse'

export interface Property {
  id?: string
  title: string
  slug?: string
  description: string
  listingType: ListingType
  propertyType: PropertyType
  price: number
  area: number
  bedrooms?: number
  bathrooms?: number
  images: string[]
  videos?: string[]
  owner: string
  city: string
  state: string
  address: string
  coordinates?: {
    lat: number
    lng: number
  }
  featured: boolean
  verified: boolean
  createdAt?: string
  updatedAt?: string
}

export type LeadStatus = 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'CLOSED' | 'LOST'

export interface Lead {
  id?: string
  propertyId?: string
  buyerId?: string
  ownerId: string
  name: string
  email?: string
  phone: string
  message?: string
  status: LeadStatus
  createdAt?: string
  updatedAt?: string
}
