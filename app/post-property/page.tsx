'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useCreateProperty } from '@/lib/hooks'
import { useAuth } from '@/store/auth'
import { Navbar, Footer } from '@/components/layout'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { cn } from '@/lib/utils'
import {
  ChevronLeft, ChevronRight, Check, CheckCircle2,
  FileText, MapPin, IndianRupee, SlidersHorizontal,
  Image as ImageIcon, FileCheck, Upload, X,
  Plus, Building2, Home, Landmark, Warehouse,
  Store, Briefcase, Monitor,
} from 'lucide-react'
import type { ListingType, PropertyType } from '@/lib/types'

const STEPS = [
  { label: 'Basic Info', icon: FileText },
  { label: 'Location', icon: MapPin },
  { label: 'Pricing', icon: IndianRupee },
  { label: 'Specifications', icon: SlidersHorizontal },
  { label: 'Media', icon: ImageIcon },
  { label: 'Review', icon: FileCheck },
] as const

const LISTING_TYPES: { value: string; label: string }[] = [
  { value: 'Sale', label: 'For Sale' },
  { value: 'Rent', label: 'For Rent' },
  { value: 'Lease', label: 'For Lease' },
]

const PROPERTY_TYPES: { value: string; label: string }[] = [
  { value: 'Flat', label: 'Flat / Apartment' },
  { value: 'Villa', label: 'Villa / House' },
  { value: 'Plot', label: 'Plot' },
  { value: 'Land', label: 'Land' },
  { value: 'Shop', label: 'Shop' },
  { value: 'Office', label: 'Office' },
  { value: 'Warehouse', label: 'Warehouse' },
]

const FURNISHING_OPTIONS = [
  { value: 'Furnished', label: 'Fully Furnished' },
  { value: 'Semi-Furnished', label: 'Semi Furnished' },
  { value: 'Unfurnished', label: 'Unfurnished' },
]

const AMENITIES = [
  { value: 'parking', label: 'Parking' },
  { value: 'swimming', label: 'Swimming Pool' },
  { value: 'gym', label: 'Gym' },
  { value: 'security', label: '24/7 Security' },
  { value: 'power backup', label: 'Power Backup' },
  { value: 'wifi', label: 'Wi-Fi' },
  { value: 'garden', label: 'Garden' },
  { value: 'clubhouse', label: 'Clubhouse' },
  { value: 'lift', label: 'Lift' },
  { value: 'ac', label: 'Air Conditioning' },
  { value: 'visitor parking', label: 'Visitor Parking' },
  { value: 'waste disposal', label: 'Waste Disposal' },
  { value: 'water storage', label: 'Water Storage' },
  { value: 'kids play area', label: 'Kids Play Area' },
  { value: 'sports facility', label: 'Sports Facility' },
  { value: 'rain water harvesting', label: 'Rain Water Harvesting' },
]

interface FormState {
  title: string
  description: string
  listingType: ListingType | ''
  propertyType: PropertyType | ''
  address: string
  city: string
  state: string
  coordinates: { lat: string; lng: string }
  price: string
  area: string
  currency: string
  bedrooms: string
  bathrooms: string
  floors: string
  furnishing: string
  parking: string
  features: string[]
  images: string[]
  videos: string[]
}

const initialState: FormState = {
  title: '',
  description: '',
  listingType: '',
  propertyType: '',
  address: '',
  city: '',
  state: '',
  coordinates: { lat: '', lng: '' },
  price: '',
  area: '',
  currency: 'INR',
  bedrooms: '',
  bathrooms: '',
  floors: '',
  furnishing: '',
  parking: '',
  features: [],
  images: [],
  videos: [],
}

function StepIndicator({ currentStep }: { currentStep: number }) {
  return (
    <div className="mb-10">
      <div className="flex items-center justify-between">
        {STEPS.map((step, i) => {
          const isCompleted = i < currentStep
          const isCurrent = i === currentStep
          const Icon = step.icon
          return (
            <div key={step.label} className="flex flex-col items-center">
              <div
                className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-semibold transition-all',
                  isCompleted && 'border-primary-500 bg-primary-500 text-white',
                  isCurrent && 'border-primary-500 text-primary-500 bg-primary-50',
                  !isCompleted && !isCurrent && 'border-navy-200 text-navy-400 bg-white',
                )}
              >
                {isCompleted ? <Check className="h-5 w-5" /> : <Icon className="h-4 w-4" />}
              </div>
              <span
                className={cn(
                  'mt-1.5 hidden text-xs font-medium sm:block',
                  isCurrent && 'text-primary-500',
                  isCompleted && 'text-navy-900',
                  !isCompleted && !isCurrent && 'text-navy-400',
                )}
              >
                {step.label}
              </span>
            </div>
          )
        })}
      </div>
      <div className="relative mt-3">
        <div className="absolute top-0 h-[2px] w-full bg-navy-200" />
        <div
          className="absolute top-0 h-[2px] bg-primary-500 transition-all duration-300"
          style={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }}
        />
      </div>
    </div>
  )
}

function AmenityCheckbox({
  label,
  checked,
  onChange,
}: {
  label: string
  checked: boolean
  onChange: () => void
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={cn(
        'flex items-center gap-2.5 rounded-lg border px-3 py-2.5 text-sm font-medium transition-all',
        checked
          ? 'border-primary-500 bg-primary-50 text-primary-600'
          : 'border-navy-200 bg-white text-navy-600 hover:border-navy-300 hover:bg-navy-50',
      )}
    >
      <div
        className={cn(
          'flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-all',
          checked
            ? 'border-primary-500 bg-primary-500 text-white'
            : 'border-navy-300 bg-white',
        )}
      >
        {checked && <Check className="h-3 w-3" />}
      </div>
      {label}
    </button>
  )
}

function ImageUploadArea({
  images,
  onAdd,
  onRemove,
}: {
  images: string[]
  onAdd: (url: string) => void
  onRemove: (index: number) => void
}) {
  const [urlInput, setUrlInput] = useState('')

  const handleAddUrl = () => {
    const trimmed = urlInput.trim()
    if (trimmed && (trimmed.startsWith('http://') || trimmed.startsWith('https://'))) {
      onAdd(trimmed)
      setUrlInput('')
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          placeholder="Paste image URL..."
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddUrl())}
          containerClassName="flex-1"
        />
        <Button variant="outline" onClick={handleAddUrl} disabled={!urlInput.trim()}>
          <Plus className="h-4 w-4" />
          Add
        </Button>
      </div>

      {images.length === 0 ? (
        <div
          className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-navy-200 bg-navy-50/50 px-6 py-12 transition-colors hover:border-primary-300 hover:bg-primary-50/30"
          onClick={() => document.getElementById('image-url-input')?.focus()}
        >
          <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-primary-100">
            <Upload className="h-6 w-6 text-primary-500" />
          </div>
          <p className="font-medium text-navy-700">Add property images</p>
          <p className="mt-1 text-xs text-navy-400">
            Paste image URLs above. Add at least one image.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {images.map((url, i) => (
            <div key={i} className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-navy-100">
              <img src={url} alt={`Property image ${i + 1}`} className="h-full w-full object-cover" />
              <button
                onClick={() => onRemove(i)}
                className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-black/50 text-white opacity-0 transition-opacity group-hover:opacity-100"
                aria-label="Remove image"
              >
                <X className="h-3.5 w-3.5" />
              </button>
              <Badge variant="default" size="sm" className="absolute bottom-1.5 left-1.5 bg-black/50 text-white border-0">
                {i + 1}
              </Badge>
            </div>
          ))}
          <button
            onClick={() => document.getElementById('image-url-input')?.focus()}
            className="flex aspect-[4/3] items-center justify-center rounded-lg border-2 border-dashed border-navy-200 text-navy-400 transition-colors hover:border-primary-300 hover:text-primary-500"
          >
            <Plus className="h-6 w-6" />
          </button>
        </div>
      )}
    </div>
  )
}

function validateStep(step: number, form: FormState): Record<string, string> {
  const errors: Record<string, string> = {}

  switch (step) {
    case 0:
      if (!form.title || form.title.length < 5) errors.title = 'Title must be at least 5 characters'
      if (!form.description || form.description.length < 20) errors.description = 'Description must be at least 20 characters'
      if (!form.listingType) errors.listingType = 'Select listing type'
      if (!form.propertyType) errors.propertyType = 'Select property type'
      break
    case 1:
      if (!form.address || form.address.length < 5) errors.address = 'Address must be at least 5 characters'
      if (!form.city || form.city.length < 2) errors.city = 'City is required'
      if (!form.state || form.state.length < 2) errors.state = 'State is required'
      break
    case 2:
      if (!form.price || Number(form.price) <= 0) errors.price = 'Price must be greater than 0'
      if (!form.area || Number(form.area) <= 0) errors.area = 'Area must be greater than 0'
      break
    case 3:
      break
    case 4:
      if (form.images.length === 0) errors.images = 'At least one image is required'
      break
    case 5:
      break
  }

  return errors
}

function SummaryRow({ label, value }: { label: string; value: string | number | undefined | null }) {
  if (!value && value !== 0) return null
  return (
    <div className="flex items-start justify-between gap-4 border-b border-navy-100 py-2.5 last:border-0">
      <span className="text-sm text-navy-500">{label}</span>
      <span className="text-right text-sm font-medium text-navy-900 max-w-[60%]">{value}</span>
    </div>
  )
}

export default function PostPropertyPage() {
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<FormState>(initialState)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showSuccess, setShowSuccess] = useState(false)
  const createProperty = useCreateProperty()

  const updateField = useCallback(<K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => {
      const next = { ...prev }
      delete next[key]
      return next
    })
  }, [])

  const toggleFeature = useCallback((feature: string) => {
    setForm((prev) => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...prev.features, feature],
    }))
  }, [])

  const pricePerSqft = form.price && form.area && Number(form.area) > 0
    ? Math.round(Number(form.price) / Number(form.area))
    : 0

  const handleNext = () => {
    const validationErrors = validateStep(step, form)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length === 0) {
      setStep((prev) => Math.min(prev + 1, STEPS.length - 1))
    }
  }

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 0))
    setErrors({})
  }

  const handleSubmit = async () => {
    try {
      await createProperty.mutateAsync({
        title: form.title,
        description: form.description,
        listingType: form.listingType as ListingType,
        propertyType: form.propertyType as PropertyType,
        price: Number(form.price),
        area: Number(form.area),
        bedrooms: form.bedrooms ? Number(form.bedrooms) : undefined,
        bathrooms: form.bathrooms ? Number(form.bathrooms) : undefined,
        images: form.images,
        videos: form.videos.length > 0 ? form.videos : undefined,
        owner: user?.id || '',
        city: form.city,
        state: form.state,
        address: form.address,
        coordinates: form.coordinates.lat && form.coordinates.lng
          ? { lat: Number(form.coordinates.lat), lng: Number(form.coordinates.lng) }
          : undefined,
      } as Parameters<typeof createProperty.mutateAsync>[0])
      setShowSuccess(true)
    } catch {
      // Error handled by query client
    }
  }

  const canProceed = Object.keys(validateStep(step, form)).length === 0

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 sm:px-6">
        <div className="mb-6">
          <h1 className="font-heading text-3xl font-bold text-navy-900">Post a Property</h1>
          <p className="mt-1 text-sm text-navy-500">
            List your property on DedhBigha and reach millions of buyers.
          </p>
        </div>

        <StepIndicator currentStep={step} />

        <Card padding="lg">
          {/* Step 1: Basic Info */}
          {step === 0 && (
            <div className="space-y-5">
              <h2 className="font-heading text-xl font-semibold text-navy-900">Basic Information</h2>
              <Input
                label="Property Title"
                placeholder="e.g. 3BHK Luxury Apartment in Powai"
                value={form.title}
                onChange={(e) => updateField('title', e.target.value)}
                error={errors.title}
              />
              <div className="w-full">
                <label className="mb-1.5 block text-sm font-medium text-navy-700">Description</label>
                <textarea
                  placeholder="Describe your property in detail..."
                  value={form.description}
                  onChange={(e) => updateField('description', e.target.value)}
                  rows={5}
                  className={cn(
                    'w-full rounded-lg border bg-white px-3 py-2 text-sm text-navy-900 placeholder:text-navy-300 transition-colors duration-200',
                    'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500',
                    errors.description
                      ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                      : 'border-navy-200 hover:border-navy-300',
                  )}
                />
                {errors.description && (
                  <p className="mt-1 text-xs text-red-500">{errors.description}</p>
                )}
                <p className="mt-1 text-right text-xs text-navy-400">
                  {form.description.length} / 20 min
                </p>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Select
                  label="Listing Type"
                  placeholder="Select listing type"
                  options={LISTING_TYPES}
                  value={form.listingType}
                  onChange={(e) => updateField('listingType', e.target.value as ListingType)}
                  error={errors.listingType}
                />
                <Select
                  label="Property Type"
                  placeholder="Select property type"
                  options={PROPERTY_TYPES}
                  value={form.propertyType}
                  onChange={(e) => updateField('propertyType', e.target.value as PropertyType)}
                  error={errors.propertyType}
                />
              </div>
            </div>
          )}

          {/* Step 2: Location */}
          {step === 1 && (
            <div className="space-y-5">
              <h2 className="font-heading text-xl font-semibold text-navy-900">Location Details</h2>
              <Input
                label="Address"
                placeholder="Full address of the property"
                value={form.address}
                onChange={(e) => updateField('address', e.target.value)}
                error={errors.address}
              />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input
                  label="City"
                  placeholder="e.g. Mumbai"
                  value={form.city}
                  onChange={(e) => updateField('city', e.target.value)}
                  error={errors.city}
                />
                <Input
                  label="State"
                  placeholder="e.g. Maharashtra"
                  value={form.state}
                  onChange={(e) => updateField('state', e.target.value)}
                  error={errors.state}
                />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input
                  label="Latitude (optional)"
                  placeholder="e.g. 19.0760"
                  type="number"
                  step="any"
                  value={form.coordinates.lat}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      coordinates: { ...prev.coordinates, lat: e.target.value },
                    }))
                  }
                />
                <Input
                  label="Longitude (optional)"
                  placeholder="e.g. 72.8777"
                  type="number"
                  step="any"
                  value={form.coordinates.lng}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      coordinates: { ...prev.coordinates, lng: e.target.value },
                    }))
                  }
                />
              </div>
            </div>
          )}

          {/* Step 3: Pricing & Area */}
          {step === 2 && (
            <div className="space-y-5">
              <h2 className="font-heading text-xl font-semibold text-navy-900">Pricing & Area</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input
                  label="Price (₹)"
                  type="number"
                  placeholder="e.g. 7500000"
                  value={form.price}
                  onChange={(e) => updateField('price', e.target.value)}
                  error={errors.price}
                  leftIcon={<IndianRupee className="h-4 w-4" />}
                />
                <Input
                  label="Total Area (sq.ft)"
                  type="number"
                  placeholder="e.g. 1200"
                  value={form.area}
                  onChange={(e) => updateField('area', e.target.value)}
                  error={errors.area}
                  rightIcon={<span className="text-xs text-navy-400">sq.ft</span>}
                />
              </div>
              {pricePerSqft > 0 && (
                <div className="rounded-lg bg-primary-50 px-4 py-3">
                  <p className="text-sm text-navy-600">
                    Price per sq.ft:{' '}
                    <span className="font-semibold text-primary-600">
                      ₹{pricePerSqft.toLocaleString('en-IN')}/sq.ft
                    </span>
                  </p>
                </div>
              )}
              <Select
                label="Currency"
                options={[{ value: 'INR', label: '₹ INR' }]}
                value={form.currency}
                onChange={(e) => updateField('currency', e.target.value)}
              />
            </div>
          )}

          {/* Step 4: Specifications */}
          {step === 3 && (
            <div className="space-y-5">
              <h2 className="font-heading text-xl font-semibold text-navy-900">Specifications</h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <Input
                  label="Bedrooms"
                  type="number"
                  placeholder="3"
                  value={form.bedrooms}
                  onChange={(e) => updateField('bedrooms', e.target.value)}
                />
                <Input
                  label="Bathrooms"
                  type="number"
                  placeholder="2"
                  value={form.bathrooms}
                  onChange={(e) => updateField('bathrooms', e.target.value)}
                />
                <Input
                  label="Total Floors"
                  type="number"
                  placeholder="1"
                  value={form.floors}
                  onChange={(e) => updateField('floors', e.target.value)}
                />
                <Input
                  label="Parking"
                  type="number"
                  placeholder="1"
                  value={form.parking}
                  onChange={(e) => updateField('parking', e.target.value)}
                />
              </div>
              <Select
                label="Furnishing Status"
                placeholder="Select furnishing"
                options={FURNISHING_OPTIONS}
                value={form.furnishing}
                onChange={(e) => updateField('furnishing', e.target.value)}
              />
              <div className="space-y-2">
                <label className="block text-sm font-medium text-navy-700">Additional Features</label>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {AMENITIES.map((amenity) => (
                    <AmenityCheckbox
                      key={amenity.value}
                      label={amenity.label}
                      checked={form.features.includes(amenity.value)}
                      onChange={() => toggleFeature(amenity.value)}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Media */}
          {step === 4 && (
            <div className="space-y-5">
              <h2 className="font-heading text-xl font-semibold text-navy-900">Media</h2>
              <ImageUploadArea
                images={form.images}
                onAdd={(url) => updateField('images', [...form.images, url])}
                onRemove={(i) => updateField('images', form.images.filter((_, idx) => idx !== i))}
              />
              {errors.images && (
                <p className="text-xs text-red-500">{errors.images}</p>
              )}
              <div className="space-y-2">
                <Input
                  label="Video URL (optional)"
                  placeholder="YouTube or Vimeo URL"
                  value={form.videos[0] || ''}
                  onChange={(e) =>
                    updateField(
                      'videos',
                      e.target.value ? [e.target.value] : [],
                    )
                  }
                />
                <p className="text-xs text-navy-400">
                  Add a walkthrough video link to attract more buyers.
                </p>
              </div>
            </div>
          )}

          {/* Step 6: Review & Submit */}
          {step === 5 && (
            <div className="space-y-5">
              <h2 className="font-heading text-xl font-semibold text-navy-900">Review & Submit</h2>
              <div className="space-y-1">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-accent-gold">Basic Info</h3>
                <SummaryRow label="Title" value={form.title} />
                <SummaryRow label="Listing Type" value={form.listingType} />
                <SummaryRow label="Property Type" value={form.propertyType} />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-accent-gold">Location</h3>
                <SummaryRow label="Address" value={form.address} />
                <SummaryRow label="City" value={form.city} />
                <SummaryRow label="State" value={form.state} />
                {form.coordinates.lat && form.coordinates.lng && (
                  <SummaryRow
                    label="Coordinates"
                    value={`${form.coordinates.lat}, ${form.coordinates.lng}`}
                  />
                )}
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-accent-gold">Pricing & Area</h3>
                <SummaryRow
                  label="Price"
                  value={`₹${Number(form.price).toLocaleString('en-IN')}`}
                />
                <SummaryRow
                  label="Area"
                  value={`${Number(form.area).toLocaleString('en-IN')} sq.ft`}
                />
                {pricePerSqft > 0 && (
                  <SummaryRow
                    label="Price/sq.ft"
                    value={`₹${pricePerSqft.toLocaleString('en-IN')}`}
                  />
                )}
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-accent-gold">Specifications</h3>
                <SummaryRow label="Bedrooms" value={form.bedrooms || 'N/A'} />
                <SummaryRow label="Bathrooms" value={form.bathrooms || 'N/A'} />
                <SummaryRow label="Floors" value={form.floors || 'N/A'} />
                <SummaryRow label="Furnishing" value={form.furnishing || 'N/A'} />
                {form.features.length > 0 && (
                  <SummaryRow label="Features" value={form.features.length > 3 ? `${form.features.length} selected` : form.features.join(', ')} />
                )}
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-accent-gold">Media</h3>
                <SummaryRow label="Images" value={`${form.images.length} image(s)`} />
                {form.videos.length > 0 && <SummaryRow label="Video URL" value={form.videos[0]} />}
              </div>
            </div>
          )}
        </Card>

        {/* Navigation */}
        <div className="mt-6 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={step === 0 ? () => router.push('/') : handleBack}
            leftIcon={<ChevronLeft className="h-4 w-4" />}
          >
            {step === 0 ? 'Cancel' : 'Previous'}
          </Button>

          {step < STEPS.length - 1 ? (
            <Button onClick={handleNext} rightIcon={<ChevronRight className="h-4 w-4" />}>
              Next Step
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              loading={createProperty.isPending}
              rightIcon={<Check className="h-4 w-4" />}
            >
              Submit Property
            </Button>
          )}
        </div>
      </main>

      <Footer />

      <Modal
        isOpen={showSuccess}
        onClose={() => {
          setShowSuccess(false)
          router.push('/')
        }}
        size="sm"
        title="Property Posted!"
      >
        <div className="py-4 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
          <p className="mb-6 text-sm text-navy-600">
            Your property has been submitted successfully. It will be reviewed and listed shortly.
          </p>
          <div className="flex flex-col gap-3">
            <Button
              fullWidth
              onClick={() => {
                setShowSuccess(false)
                router.push('/')
              }}
            >
              Go to Home
            </Button>
            <Button
              variant="outline"
              fullWidth
              onClick={() => {
                setShowSuccess(false)
                setForm(initialState)
                setStep(0)
              }}
            >
              Post Another Property
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
