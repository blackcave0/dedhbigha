'use client'

import { useState, useMemo, useCallback, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  SlidersHorizontal,
  X,
  MapPin,
  Bed,
  Bath,
  Square,
  Heart,
  Grid3X3,
  Map,
  Search,
  Building2,
  Loader2,
} from 'lucide-react'
import Link from 'next/link'
import { Navbar, Footer, MobileBottomNav } from '@/components/layout'
import { Button } from '@/components/ui/Button'
import { Select } from '@/components/ui/Select'
import { BottomSheet } from '@/components/ui/BottomSheet'
import { Skeleton } from '@/components/ui/Skeleton'

const localities = [
  { value: 'gomti-nagar', label: 'Gomti Nagar' },
  { value: 'hazratganj', label: 'Hazratganj' },
  { value: 'aliganj', label: 'Aliganj' },
  { value: 'indira-nagar', label: 'Indira Nagar' },
  { value: 'mahanagar', label: 'Mahanagar' },
  { value: 'rajajipuram', label: 'Rajajipuram' },
  { value: 'alambagh', label: 'Alambagh' },
  { value: 'shaheed-path', label: 'Shaheed Path' },
  { value: 'sushant-golf-city', label: 'Sushant Golf City' },
  { value: 'vrindavan-yojna', label: 'Vrindavan Yojna' },
]

const propertyTypeOptions = [
  { value: 'flat', label: 'Flat / Apartment' },
  { value: 'villa', label: 'Villa / House' },
  { value: 'plot', label: 'Plot / Land' },
  { value: 'penthouse', label: 'Penthouse' },
  { value: 'commercial', label: 'Commercial' },
]

const shortPropertyTypeLabels: Record<string, string> = {
  flat: 'Flat',
  villa: 'Villa',
  plot: 'Plot',
  penthouse: 'Penthouse',
  commercial: 'Commercial',
}

const listingTypeOptions = [
  { value: 'sale', label: 'For Sale' },
  { value: 'rent', label: 'For Rent' },
  { value: 'lease', label: 'For Lease' },
]

const bhkOptions = [
  { value: '1', label: '1 BHK' },
  { value: '2', label: '2 BHK' },
  { value: '3', label: '3 BHK' },
  { value: '4', label: '4+ BHK' },
]

const moveInOptions = [
  { value: 'ready', label: 'Ready to Move' },
  { value: 'within-3', label: 'Within 3 Months' },
  { value: 'within-6', label: 'Within 6 Months' },
  { value: 'construction', label: 'Under Construction' },
]

const advisorOptions = [
  { value: 'owner', label: 'Owner' },
  { value: 'dealer', label: 'Dealer' },
  { value: 'builder', label: 'Builder' },
]

const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'area', label: 'Area: Largest First' },
]

const mockProperties = Array.from({ length: 16 }, (_, i) => {
  const areas = ['Gomti Nagar', 'Hazratganj', 'Aliganj', 'Indira Nagar', 'Mahanagar', 'Rajajipuram', 'Shaheed Path', 'Sushant Golf City']
  const titles = [
    '3BHK Apartment in Gomti Nagar Extension',
    '4BHK Independent House near Hazratganj',
    '2BHK Flat in Indira Nagar Sector 19',
    '1BHK Fully Furnished near Aliganj',
    '3BHK Villa in Sushant Golf City',
    'Commercial Office on Shaheed Path',
    '4BHK Duplex in Mahanagar Colony',
    '2BHK in Rajajipuram Prime Location',
    'Plot for Construction in Vrindavan Yojna',
    '3BHK Penthouse in Gomti Nagar',
    'Studio Apartment near Hazratganj Metro',
    'Retail Shop in Alambagh Market',
    '4BHK Luxury Villa with Garden',
    '1BHK Budget Flat in Aliganj',
    '3BHK Corner House in Indira Nagar',
    'Commercial Space on Faizabad Road',
  ]
  const prices = ['₹ 72 Lac', '₹ 1.8 Cr', '₹ 38 Lac', '₹ 18K/mo', '₹ 85 Lac', '₹ 2.2 Cr', '₹ 1.5 Cr', '₹ 42 Lac', '₹ 55 Lac', '₹ 3.2 Cr', '₹ 14K/mo', '₹ 68 Lac', '₹ 2.8 Cr', '₹ 24 Lac', '₹ 65 Lac', '₹ 1.2 Cr']
  const badges = ['For Sale', 'For Sale', 'For Sale', 'For Rent', 'For Sale', 'For Lease', 'For Sale', 'For Sale', 'For Sale', 'For Sale', 'For Rent', 'For Sale', 'For Sale', 'For Sale', 'For Sale', 'For Lease']
  const badgeVariants = ['success', 'success', 'success', 'info', 'success', 'warning', 'success', 'success', 'success', 'success', 'info', 'success', 'success', 'success', 'success', 'warning'] as const
  const beds = [3, 4, 2, 1, 3, 0, 4, 2, 0, 3, 1, 0, 4, 1, 3, 0]
  const baths = [2, 3, 2, 1, 2, 2, 3, 1, 0, 2, 1, 1, 3, 1, 2, 1]
  const areaSizes = ['1,650 sqft', '2,800 sqft', '1,100 sqft', '650 sqft', '1,850 sqft', '2,400 sqft', '2,600 sqft', '1,050 sqft', '1,800 sqft', '2,200 sqft', '350 sqft', '800 sqft', '3,200 sqft', '700 sqft', '1,550 sqft', '1,200 sqft']
  const listedBy = ['Owner', 'Dealer', 'Owner', 'Owner', 'Builder', 'Dealer', 'Owner', 'Dealer', 'Owner', 'Builder', 'Owner', 'Dealer', 'Builder', 'Owner', 'Dealer', 'Owner']

  return {
    id: i + 1,
    title: titles[i],
    location: `${areas[i % areas.length]}, Lucknow`,
    price: prices[i],
    beds: beds[i],
    baths: baths[i],
    area: areaSizes[i],
    image: `https://picsum.photos/seed/sr${i + 1}/600/400`,
    badge: badges[i],
    badgeVariant: badgeVariants[i],
    listedBy: listedBy[i],
    isWishlisted: i % 5 === 0,
    moveIn: ['Ready to Move', 'Ready to Move', 'Within 3 Months', 'Ready to Move', 'Under Construction', 'Ready to Move', 'Within 6 Months', 'Ready to Move', 'Ready to Move', 'Under Construction', 'Ready to Move', 'Within 3 Months', 'Ready to Move', 'Ready to Move', 'Within 6 Months', 'Ready to Move'][i],
    furnished: ['Fully', 'Semi', 'Semi', 'Fully', 'Unfurnished', 'Semi', 'Fully', 'Semi', 'Semi', 'Fully', 'Fully', 'Semi', 'Semi', 'Unfurnished', 'Semi', 'Semi'][i],
  }
})

type ViewMode = 'grid' | 'list' | 'map'

interface Filters {
  propertyTypes: string[]
  listingType: string
  minPrice: string
  maxPrice: string
  bedrooms: string
  bathrooms: string
  locality: string
  moveIn: string
  advisorType: string
  searchQuery: string
}

const defaultFilters: Filters = {
  propertyTypes: [],
  listingType: '',
  minPrice: '',
  maxPrice: '',
  bedrooms: '',
  bathrooms: '',
  locality: '',
  moveIn: '',
  advisorType: '',
  searchQuery: '',
}

const quickChips = [
  { label: 'Ready to Move', key: 'moveIn' as const, value: 'ready' },
  { label: 'Owner Listed', key: 'advisorType' as const, value: 'owner' },
  { label: 'Under ₹50L', key: 'maxPrice' as const, value: '50' },
  { label: '2 BHK', key: 'bedrooms' as const, value: '2' },
]

const budgetChips = [
  { label: 'Under ₹30L', min: '', max: '30' },
  { label: '₹30–50L', min: '30', max: '50' },
  { label: '₹50L–1Cr', min: '50', max: '100' },
  { label: 'Above ₹1Cr', min: '100', max: '' },
]

/* ───────── Desktop Sidebar Filter Content ───────── */
function FilterContent({
  filters,
  onFilterChange,
  onPropertyTypeToggle,
}: {
  filters: Filters
  onFilterChange: (key: keyof Filters, value: string | string[]) => void
  onPropertyTypeToggle: (type: string) => void
}) {
  return (
    <div className="space-y-6">
      <div>
        <h4 className="mb-3 text-sm font-semibold text-navy-900">Search</h4>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          <input
            placeholder="Locality, project..."
            value={filters.searchQuery}
            onChange={(e) => onFilterChange('searchQuery', e.target.value)}
            className="w-full h-10 pl-9 pr-3 rounded-lg border border-navy-200 text-sm outline-none focus:border-primary-400 transition-colors"
          />
        </div>
      </div>

      <div>
        <h4 className="mb-3 text-sm font-semibold text-navy-900">Property Type</h4>
        <div className="space-y-1">
          {propertyTypeOptions.map((type) => (
            <label
              key={type.value}
              className="flex cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 transition-colors hover:bg-navy-50"
            >
              <input
                type="checkbox"
                checked={filters.propertyTypes.includes(type.value)}
                onChange={() => onPropertyTypeToggle(type.value)}
                className="h-4 w-4 rounded border-navy-300 text-primary-500 focus:ring-primary-500"
              />
              <span className="text-sm text-navy-700">{type.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="mb-3 text-sm font-semibold text-navy-900">Listing Type</h4>
        <Select
          placeholder="All Types"
          value={filters.listingType}
          onChange={(e) => onFilterChange('listingType', e.target.value)}
          options={listingTypeOptions}
        />
      </div>

      <div>
        <h4 className="mb-3 text-sm font-semibold text-navy-900">Price Range</h4>
        <div className="flex items-center gap-2">
          <input
            placeholder="Min"
            value={filters.minPrice}
            onChange={(e) => onFilterChange('minPrice', e.target.value)}
            className="w-full h-9 px-3 rounded-lg border border-navy-200 text-sm outline-none focus:border-primary-400 transition-colors"
          />
          <span className="text-navy-300">-</span>
          <input
            placeholder="Max"
            value={filters.maxPrice}
            onChange={(e) => onFilterChange('maxPrice', e.target.value)}
            className="w-full h-9 px-3 rounded-lg border border-navy-200 text-sm outline-none focus:border-primary-400 transition-colors"
          />
        </div>
      </div>

      <div>
        <h4 className="mb-3 text-sm font-semibold text-navy-900">Bedrooms</h4>
        <Select
          placeholder="Any"
          value={filters.bedrooms}
          onChange={(e) => onFilterChange('bedrooms', e.target.value)}
          options={bhkOptions}
        />
      </div>

      <div>
        <h4 className="mb-3 text-sm font-semibold text-navy-900">Bathrooms</h4>
        <Select
          placeholder="Any"
          value={filters.bathrooms}
          onChange={(e) => onFilterChange('bathrooms', e.target.value)}
          options={bhkOptions}
        />
      </div>

      <div>
        <h4 className="mb-3 text-sm font-semibold text-navy-900">Locality</h4>
        <Select
          placeholder="All Lucknow"
          value={filters.locality}
          onChange={(e) => onFilterChange('locality', e.target.value)}
          options={localities}
        />
      </div>

      <div>
        <h4 className="mb-3 text-sm font-semibold text-navy-900">Move-in Timeline</h4>
        <Select
          placeholder="Any"
          value={filters.moveIn}
          onChange={(e) => onFilterChange('moveIn', e.target.value)}
          options={moveInOptions}
        />
      </div>

      <div>
        <h4 className="mb-3 text-sm font-semibold text-navy-900">Listed By</h4>
        <div className="flex flex-wrap gap-2">
          {advisorOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => onFilterChange('advisorType', filters.advisorType === opt.value ? '' : opt.value)}
              className={`px-3.5 py-2 rounded-lg text-xs font-medium transition-all ${
                filters.advisorType === opt.value
                  ? 'bg-primary-500 text-white shadow-sm'
                  : 'bg-navy-50 text-navy-600 hover:bg-navy-100'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl bg-navy-50 p-4 space-y-1">
        <p className="text-xs text-navy-500 flex items-center gap-1.5">
          <MapPin className="h-3 w-3" />
          City: <span className="font-medium text-navy-700">Lucknow</span>
        </p>
        <p className="text-xs text-navy-500 flex items-center gap-1.5">
          <Building2 className="h-3 w-3" />
          State: <span className="font-medium text-navy-700">Uttar Pradesh</span>
        </p>
      </div>
    </div>
  )
}

/* ───────── Mobile Bottom-Sheet Filter Content ───────── */
function MobileFilterContent({
  filters,
  onFilterChange,
  onPropertyTypeToggle,
  onClear,
  onClose,
}: {
  filters: Filters
  onFilterChange: (key: keyof Filters, value: string | string[]) => void
  onPropertyTypeToggle: (type: string) => void
  onClear: () => void
  onClose: () => void
}) {
  const isBudgetActive = (min: string, max: string) =>
    filters.minPrice === min && filters.maxPrice === max

  const handleBudget = (min: string, max: string) => {
    if (isBudgetActive(min, max)) {
      onFilterChange('minPrice', '')
      onFilterChange('maxPrice', '')
    } else {
      onFilterChange('minPrice', min)
      onFilterChange('maxPrice', max)
    }
  }

  return (
    <div className="flex flex-col h-full min-h-[60dvh]">
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6">
        <div>
          <h4 className="text-sm font-semibold text-navy-900 mb-3">Property Type</h4>
          <div className="flex flex-wrap gap-2">
            {propertyTypeOptions.map((t) => (
              <button
                key={t.value}
                onClick={() => onPropertyTypeToggle(t.value)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  filters.propertyTypes.includes(t.value)
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {shortPropertyTypeLabels[t.value] || t.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-navy-900 mb-3">Budget</h4>
          <div className="flex flex-wrap gap-2">
            {budgetChips.map((chip) => (
              <button
                key={chip.label}
                onClick={() => handleBudget(chip.min, chip.max)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isBudgetActive(chip.min, chip.max)
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {chip.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-navy-900 mb-3">BHK</h4>
          <div className="flex flex-wrap gap-2">
            {bhkOptions.map((b) => (
              <button
                key={b.value}
                onClick={() => onFilterChange('bedrooms', filters.bedrooms === b.value ? '' : b.value)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  filters.bedrooms === b.value
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {b.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-navy-900 mb-3">Move-in Timeline</h4>
          <div className="flex flex-wrap gap-2">
            {moveInOptions.map((m) => (
              <button
                key={m.value}
                onClick={() => onFilterChange('moveIn', filters.moveIn === m.value ? '' : m.value)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  filters.moveIn === m.value
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-navy-900 mb-3">Listing Type</h4>
          <div className="flex flex-wrap gap-2">
            {listingTypeOptions.map((l) => (
              <button
                key={l.value}
                onClick={() => onFilterChange('listingType', filters.listingType === l.value ? '' : l.value)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  filters.listingType === l.value
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-gray-100 px-5 py-4 flex gap-3">
        <button
          onClick={() => { onClear(); onClose() }}
          className="flex-1 py-3 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
        >
          Clear All
        </button>
        <button
          onClick={onClose}
          className="flex-1 py-3 rounded-xl bg-primary-500 text-sm font-semibold text-white hover:bg-primary-600 transition-colors"
        >
          Apply
        </button>
      </div>
    </div>
  )
}

/* ───────── Active Filter Tag ───────── */
function ActiveFilterTag({ children, onRemove }: { children: React.ReactNode; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-2.5 lg:px-3 py-1 text-[11px] lg:text-xs font-medium text-primary-600">
      {children}
      <button onClick={onRemove} className="ml-0.5 rounded-full p-0.5 hover:bg-primary-100 transition-colors" aria-label="Remove filter">
        <X className="h-3 w-3" />
      </button>
    </span>
  )
}

/* ───────── Skeleton Card ───────── */
function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <Skeleton variant="rectangular" className="h-36 w-full !rounded-none" />
      <div className="p-2.5 space-y-2">
        <Skeleton variant="text" className="w-1/2" />
        <Skeleton variant="text" className="w-3/4" />
        <Skeleton variant="text" className="w-1/3" />
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════
   MAIN SEARCH PAGE
   ══════════════════════════════════════════════════ */
export default function SearchPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [sortBy, setSortBy] = useState('newest')
  const [isMobileFilterOpen, setMobileFilterOpen] = useState(false)
  const [filters, setFilters] = useState<Filters>(defaultFilters)
  const [visibleCount, setVisibleCount] = useState(9)
  const [isLoadingMore, setIsLoadingMore] = useState(false)

  const sentinelRef = useRef<HTMLDivElement>(null)
  const resultsPerPage = 9

  /* ── Derived Data ── */
  const filteredProperties = useMemo(() => {
    let result = [...mockProperties]

    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase()
      result = result.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q)
      )
    }

    if (filters.propertyTypes.length > 0) {
      const typeMap: Record<string, string[]> = {
        flat: ['Flat', 'Apartment', 'Studio'],
        villa: ['Villa', 'House', 'Independent', 'Duplex'],
        plot: ['Plot', 'Land', 'Construction'],
        penthouse: ['Penthouse'],
        commercial: ['Commercial', 'Office', 'Shop', 'Retail'],
      }
      const keywords = filters.propertyTypes.flatMap(t => typeMap[t] || [])
      result = result.filter(p =>
        keywords.some(k => p.title.toLowerCase().includes(k.toLowerCase()))
      )
    }

    if (filters.listingType) {
      result = result.filter(p =>
        p.badge.toLowerCase().includes(filters.listingType === 'sale' ? 'sale' : filters.listingType === 'rent' ? 'rent' : 'lease')
      )
    }

    if (filters.minPrice) {
      const min = parseInt(filters.minPrice.replace(/[^0-9]/g, ''))
      result = result.filter(p => {
        const val = parseInt(p.price.replace(/[^0-9]/g, ''))
        return val >= min
      })
    }

    if (filters.maxPrice) {
      const max = parseInt(filters.maxPrice.replace(/[^0-9]/g, ''))
      result = result.filter(p => {
        const val = parseInt(p.price.replace(/[^0-9]/g, ''))
        return val <= max
      })
    }

    if (filters.bedrooms) {
      const bed = parseInt(filters.bedrooms)
      result = result.filter(p => bed === 4 ? p.beds >= 4 : p.beds === bed)
    }

    if (filters.bathrooms) {
      const bath = parseInt(filters.bathrooms)
      result = result.filter(p => bath === 4 ? p.baths >= 4 : p.baths === bath)
    }

    if (filters.locality) {
      const loc = filters.locality.replace(/-/g, ' ')
      result = result.filter(p =>
        p.location.toLowerCase().includes(loc)
      )
    }

    if (filters.advisorType) {
      result = result.filter(p =>
        p.listedBy.toLowerCase() === filters.advisorType
      )
    }

    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => {
          const va = parseInt(a.price.replace(/[^0-9]/g, ''))
          const vb = parseInt(b.price.replace(/[^0-9]/g, ''))
          return va - vb
        })
        break
      case 'price-high':
        result.sort((a, b) => {
          const va = parseInt(a.price.replace(/[^0-9]/g, ''))
          const vb = parseInt(b.price.replace(/[^0-9]/g, ''))
          return vb - va
        })
        break
      case 'area':
        result.sort((a, b) => {
          const va = parseInt(a.area.replace(/[^0-9]/g, ''))
          const vb = parseInt(b.area.replace(/[^0-9]/g, ''))
          return vb - va
        })
        break
      default:
        break
    }

    return result
  }, [filters, sortBy])

  const totalItems = filteredProperties.length
  const totalPages = Math.ceil(totalItems / resultsPerPage)
  const hasMore = visibleCount < totalItems
  const currentPage = Math.ceil(visibleCount / resultsPerPage)
  const visibleResults = useMemo(
    () => filteredProperties.slice(0, visibleCount),
    [filteredProperties, visibleCount]
  )

  /* ── Handlers ── */
  const handleFilterChange = useCallback((key: keyof Filters, value: string | string[]) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
    setVisibleCount(resultsPerPage)
  }, [])

  const handlePropertyTypeToggle = useCallback((type: string) => {
    setFilters((prev) => ({
      ...prev,
      propertyTypes: prev.propertyTypes.includes(type)
        ? prev.propertyTypes.filter((t) => t !== type)
        : [...prev.propertyTypes, type],
    }))
    setVisibleCount(resultsPerPage)
  }, [])

  const clearAllFilters = useCallback(() => {
    setFilters(defaultFilters)
    setVisibleCount(resultsPerPage)
  }, [])

  const hasActiveFilters = Object.values(filters).some(v =>
    Array.isArray(v) ? v.length > 0 : v !== ''
  )

  const activeFilterCount = Object.entries(filters).reduce((count, [, value]) => {
    if (Array.isArray(value)) return count + value.length
    if (value !== '') return count + 1
    return count
  }, 0)

  /* ── Quick Chip ── */
  const isChipActive = useCallback(
    (chip: typeof quickChips[number]) => filters[chip.key] === chip.value,
    [filters]
  )

  const toggleQuickChip = useCallback(
    (chip: typeof quickChips[number]) => {
      const isActive = filters[chip.key] === chip.value
      handleFilterChange(chip.key, isActive ? '' : chip.value)
    },
    [filters, handleFilterChange]
  )

  /* ── Infinite Scroll / Load More ── */
  const handleLoadMore = useCallback(() => {
    if (isLoadingMore || !hasMore) return
    setIsLoadingMore(true)
    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + resultsPerPage, totalItems))
      setIsLoadingMore(false)
    }, 500)
  }, [isLoadingMore, hasMore, totalItems])

  const goToPage = useCallback(
    (page: number) => {
      setVisibleCount(Math.min(page * resultsPerPage, totalItems))
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    [totalItems]
  )

  /* Intersection Observer for infinite scroll */
  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel || !hasMore || isLoadingMore) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore && !isLoadingMore) {
          handleLoadMore()
        }
      },
      { rootMargin: '300px' }
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [hasMore, isLoadingMore, handleLoadMore])

  /* ── Pagination Helpers ── */
  const getPageNumbers = useCallback(() => {
    const pages: (number | 'ellipsis')[] = []
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      pages.push(1)
      if (currentPage > 3) pages.push('ellipsis')
      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)
      for (let i = start; i <= end; i++) pages.push(i)
      if (currentPage < totalPages - 2) pages.push('ellipsis')
      pages.push(totalPages)
    }
    return pages
  }, [totalPages, currentPage])

  const badgeColors: Record<string, string> = {
    success: 'bg-green-500/90',
    info: 'bg-blue-500/90',
    warning: 'bg-orange-500/90',
  }

  /* ═══════════ RENDER ═══════════ */
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1">
        {/* ═══════════ STICKY: SEARCH HEADER + MOBILE FILTER BAR ═══════════ */}
        <div className="sticky top-16 z-40 bg-white border-b border-gray-100 mt-15">
          {/* ── Search Header ── */}
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="flex items-center gap-3 py-2.5 lg:py-3">
              {/* Mobile search input */}
              <div className="flex-1 lg:hidden relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search Lucknow properties..."
                  value={filters.searchQuery}
                  onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
                  className="w-full h-10 pl-9 pr-3 rounded-xl border border-gray-200 text-sm bg-gray-50 outline-none focus:border-primary-400 focus:bg-white transition-colors"
                />
              </div>

              {/* Desktop result count */}
              <p className="hidden lg:block text-sm text-gray-500 truncate">
                <span className="font-semibold text-navy-900">{totalItems}</span>
                {' '}properties found
                {filters.locality && (
                  <span className="hidden lg:inline">
                    {' '}in <span className="font-medium text-navy-700 capitalize">{filters.locality.replace(/-/g, ' ')}</span>
                  </span>
                )}
              </p>

              {/* Mobile filter button */}
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="flex items-center gap-2 rounded-xl border border-gray-200 px-3.5 py-2 text-sm font-medium text-navy-700 transition-colors hover:bg-gray-50 lg:hidden shrink-0"
                aria-label="Open filters"
              >
                <SlidersHorizontal className="h-4 w-4" />
                {activeFilterCount > 0 && (
                  <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-primary-500 px-1.5 text-[10px] font-bold text-white">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              {/* Desktop: view toggle + sort */}
              <div className="hidden lg:flex items-center gap-2 shrink-0">
                <div className="flex items-center rounded-lg border border-gray-200 p-0.5">
                  {([
                    { mode: 'grid' as ViewMode, icon: Grid3X3 },
                    { mode: 'list' as ViewMode, icon: Grid3X3 }, // replaced List with Grid3X3 as fallback
                  ]).map(({ mode, icon: Icon }) => (
                    <button
                      key={mode}
                      onClick={() => setViewMode(mode)}
                      className={`rounded-md p-1.5 transition-colors ${
                        viewMode === mode
                          ? 'bg-primary-500 text-white'
                          : 'text-gray-400 hover:text-navy-700'
                      }`}
                      aria-label={`${mode} view`}
                      aria-pressed={viewMode === mode}
                    >
                      <Icon className="h-4 w-4" />
                    </button>
                  ))}
                  <button
                    onClick={() => setViewMode('map')}
                    className={`rounded-md p-1.5 transition-colors ${
                      viewMode === 'map'
                        ? 'bg-primary-500 text-white'
                        : 'text-gray-400 hover:text-navy-700'
                    }`}
                    aria-label="Map view"
                    aria-pressed={viewMode === 'map'}
                  >
                    <Map className="h-4 w-4" />
                  </button>
                </div>

                <Select
                  placeholder="Sort"
                  value={sortBy}
                  onChange={(e) => { setSortBy(e.target.value); setVisibleCount(resultsPerPage) }}
                  options={sortOptions}
                  containerClassName="w-40 mb-0"
                />
              </div>
            </div>
          </div>

          {/* ── Mobile Filter Bar (quick chips + view toggles) ── */}
          <div className="lg:hidden border-t border-gray-100">
            <div className="flex items-center gap-2 px-4 py-2 overflow-x-auto scrollbar-none">
              <div className="flex gap-2 whitespace-nowrap">
                {quickChips.map((chip) => (
                  <button
                    key={chip.label}
                    onClick={() => toggleQuickChip(chip)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                      isChipActive(chip)
                        ? 'bg-primary-500 text-white border-primary-500'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {chip.label}
                  </button>
                ))}
              </div>

              <div className="shrink-0 flex items-center gap-1 ml-auto pl-2 border-l border-gray-100">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-md transition-colors ${
                    viewMode === 'grid' ? 'bg-primary-500 text-white' : 'text-gray-400 hover:text-navy-600'
                  }`}
                  aria-label="Grid view"
                >
                  <Grid3X3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('map')}
                  className={`p-1.5 rounded-md transition-colors ${
                    viewMode === 'map' ? 'bg-primary-500 text-white' : 'text-gray-400 hover:text-navy-600'
                  }`}
                  aria-label="Map view"
                >
                  <Map className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════ MAIN CONTENT ═══════════ */}
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:py-6">
          <div className="flex gap-8">
            {/* ── Desktop Filter Sidebar ── */}
            <aside className="hidden w-64 shrink-0 lg:block">
              <div className="sticky top-[120px] rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                <div className="mb-5 flex items-center justify-between">
                  <h3 className="font-heading text-base font-bold text-navy-900">Filters</h3>
                  {hasActiveFilters && (
                    <button
                      onClick={clearAllFilters}
                      className="text-xs font-medium text-primary-500 hover:text-primary-600 transition-colors"
                    >
                      Clear All
                    </button>
                  )}
                </div>
                <FilterContent
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onPropertyTypeToggle={handlePropertyTypeToggle}
                />
              </div>
            </aside>

            {/* ── Mobile Filter BottomSheet ── */}
            <BottomSheet
              isOpen={isMobileFilterOpen}
              onClose={() => setMobileFilterOpen(false)}
              title="Filters"
            >
              <MobileFilterContent
                filters={filters}
                onFilterChange={handleFilterChange}
                onPropertyTypeToggle={handlePropertyTypeToggle}
                onClear={clearAllFilters}
                onClose={() => setMobileFilterOpen(false)}
              />
            </BottomSheet>

            {/* ── Results Area ── */}
            <div className="flex-1 min-w-0">
              {/* Mobile result count */}
              <p className="text-sm text-gray-500 mb-3 lg:hidden">
                <span className="font-semibold text-navy-900">{totalItems}</span>
                {' '}properties found
              </p>

              {/* Active Filter Tags */}
              <AnimatePresence>
                {hasActiveFilters && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="mb-3 flex flex-wrap items-center gap-2"
                  >
                    {filters.propertyTypes.map((type) => (
                      <ActiveFilterTag key={type} onRemove={() => handlePropertyTypeToggle(type)}>
                        {shortPropertyTypeLabels[type] || type}
                      </ActiveFilterTag>
                    ))}
                    {filters.listingType && (
                      <ActiveFilterTag onRemove={() => handleFilterChange('listingType', '')}>
                        {listingTypeOptions.find(t => t.value === filters.listingType)?.label}
                      </ActiveFilterTag>
                    )}
                    {filters.bedrooms && (
                      <ActiveFilterTag onRemove={() => handleFilterChange('bedrooms', '')}>
                        {bhkOptions.find(t => t.value === filters.bedrooms)?.label}
                      </ActiveFilterTag>
                    )}
                    {filters.bathrooms && (
                      <ActiveFilterTag onRemove={() => handleFilterChange('bathrooms', '')}>
                        {filters.bathrooms}+ Bath
                      </ActiveFilterTag>
                    )}
                    {filters.locality && (
                      <ActiveFilterTag onRemove={() => handleFilterChange('locality', '')}>
                        {localities.find(t => t.value === filters.locality)?.label}
                      </ActiveFilterTag>
                    )}
                    {filters.moveIn && (
                      <ActiveFilterTag onRemove={() => handleFilterChange('moveIn', '')}>
                        {moveInOptions.find(t => t.value === filters.moveIn)?.label}
                      </ActiveFilterTag>
                    )}
                    {filters.advisorType && (
                      <ActiveFilterTag onRemove={() => handleFilterChange('advisorType', '')}>
                        {advisorOptions.find(t => t.value === filters.advisorType)?.label}
                      </ActiveFilterTag>
                    )}
                    {(filters.minPrice || filters.maxPrice) && (
                      <ActiveFilterTag onRemove={() => { handleFilterChange('minPrice', ''); handleFilterChange('maxPrice', '') }}>
                        {filters.minPrice ? `₹${filters.minPrice}` : '₹0'} - {filters.maxPrice ? `₹${filters.maxPrice}` : 'Any'}
                      </ActiveFilterTag>
                    )}
                    <button
                      onClick={clearAllFilters}
                      className="text-xs font-medium text-gray-400 hover:text-navy-600 transition-colors"
                    >
                      Clear all
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ── Map View Placeholder ── */}
              {viewMode === 'map' && (
                <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-100 bg-gray-50 py-16 lg:py-20 px-6 text-center">
                  <Map className="h-10 w-10 lg:h-12 lg:w-12 text-gray-300 mb-4" />
                  <h3 className="font-heading text-base lg:text-lg font-bold text-navy-900">Map View</h3>
                  <p className="mt-1 text-sm text-gray-500 max-w-sm">
                    Interactive map view is coming soon. You&apos;ll be able to explore properties by location across Lucknow.
                  </p>
                  <button
                    onClick={() => setViewMode('grid')}
                    className="mt-4 text-sm font-medium text-primary-500 hover:text-primary-600 transition-colors"
                  >
                    Switch to Grid View
                  </button>
                </div>
              )}

              {/* ── Empty State ── */}
              {viewMode !== 'map' && visibleResults.length === 0 && (
                <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-100 bg-gray-50 py-12 lg:py-20 px-6 text-center">
                  <div className="flex h-12 w-12 lg:h-16 lg:w-16 items-center justify-center rounded-2xl bg-gray-200 mb-4">
                    <Search className="h-6 w-6 lg:h-7 lg:w-7 text-gray-400" />
                  </div>
                  <h3 className="font-heading text-lg lg:text-xl font-bold text-navy-900">No properties match your filters</h3>
                  <p className="mt-1.5 text-sm text-gray-500 max-w-md">
                    Try expanding your budget, removing some filters, or exploring nearby areas in Lucknow.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3 justify-center">
                    <Button variant="outline" onClick={clearAllFilters}>
                      Clear All Filters
                    </Button>
                    <Link href="/search">
                      <Button variant="ghost">
                        Browse All Properties
                      </Button>
                    </Link>
                  </div>
                  <div className="mt-8">
                    <p className="text-xs text-gray-400 mb-3">Popular areas in Lucknow</p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {['Gomti Nagar', 'Hazratganj', 'Indira Nagar', 'Aliganj'].map((area) => (
                        <Link
                          key={area}
                          href={`/search?area=${area.toLowerCase().replace(/\s+/g, '-')}`}
                          className="px-3.5 py-1.5 rounded-full bg-white border border-gray-200 text-xs font-medium text-navy-600 hover:border-primary-200 hover:text-primary-600 transition-all"
                        >
                          {area}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ── Property Grid ── */}
              {viewMode !== 'map' && visibleResults.length > 0 && (
                <>
                  <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 lg:gap-4">
                    {visibleResults.map((prop, i) => (
                      <motion.div
                        key={prop.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.25, delay: i * 0.02 }}
                      >
                        <Link
                          href={`/properties/${prop.id}`}
                          className="group block bg-white rounded-xl lg:rounded-2xl border border-gray-100 overflow-hidden lg:hover:border-gray-200 lg:hover:shadow-sm transition-all cursor-pointer"
                        >
                          {/* Image */}
                          <div className="relative w-full h-36 lg:h-auto lg:aspect-[4/3] overflow-hidden bg-navy-50">
                            <img
                              src={prop.image}
                              alt={prop.title}
                              className="h-full w-full object-cover lg:group-hover:scale-105 transition-transform duration-700 ease-out"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent pointer-events-none" />

                            {/* Badge */}
                            <div className="absolute top-2 left-2 lg:top-3 lg:left-3">
                              <span className={`text-[10px] lg:text-xs font-medium px-2 lg:px-2.5 py-0.5 lg:py-1 rounded-full lg:backdrop-blur-sm text-white ${badgeColors[prop.badgeVariant] || 'bg-gray-500/90'}`}>
                                {prop.badge}
                              </span>
                            </div>

                            {/* Listed by (desktop only) */}
                            <div className="absolute top-3 right-3 hidden lg:flex gap-2">
                              <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-white/80 text-navy-700 backdrop-blur-sm">
                                {prop.listedBy}
                              </span>
                            </div>

                            {/* Wishlist */}
                            <button
                              className="absolute top-2 right-2 lg:bottom-3 lg:top-auto flex h-7 w-7 lg:h-8 lg:w-8 items-center justify-center rounded-full bg-white/80 lg:backdrop-blur-sm transition-colors lg:hover:bg-white lg:hover:text-primary-500"
                              aria-label={prop.isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                              onClick={(e) => { e.preventDefault(); e.stopPropagation() }}
                            >
                              <Heart className={`h-3.5 w-3.5 lg:h-4 lg:w-4 ${prop.isWishlisted ? 'fill-primary-500 text-primary-500' : 'text-navy-700'}`} />
                            </button>
                          </div>

                          {/* Details */}
                          <div className="p-2.5 lg:p-4">
                            <p className="text-base lg:text-lg font-bold text-primary-500">{prop.price}</p>
                            <h3 className="mt-0.5 text-[13px] lg:text-sm font-semibold text-navy-900 truncate">{prop.title}</h3>
                            <p className="flex items-center gap-1 text-[11px] lg:text-xs text-gray-500 truncate mt-0.5">
                              <MapPin className="h-3 w-3 shrink-0" />
                              <span className="truncate">{prop.location}</span>
                            </p>

                            {/* Metadata row */}
                            <div className="flex items-center gap-2 lg:gap-3 text-[11px] lg:text-xs text-gray-600 pt-1.5 lg:pt-3 border-t border-gray-100 mt-1.5 lg:mt-3">
                              {prop.beds > 0 && (
                                <span className="flex items-center gap-1">
                                  <Bed className="h-3 w-3 lg:h-3.5 lg:w-3.5" />
                                  {prop.beds}
                                </span>
                              )}
                              <span className="flex items-center gap-1">
                                <Bath className="h-3 w-3 lg:h-3.5 lg:w-3.5" />
                                {prop.baths}
                              </span>
                              <span className="flex items-center gap-1">
                                <Square className="h-3 w-3 lg:h-3.5 lg:w-3.5" />
                                <span className="hidden lg:inline">{prop.area}</span>
                                <span className="lg:hidden">{prop.area.replace(/,?\s*sqft/, '')}</span>
                              </span>
                              <span className="hidden lg:flex items-center gap-1 text-gray-400 ml-auto">
                                {prop.moveIn}
                              </span>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>

                  {/* ── Skeleton Loaders (during load more) ── */}
                  {isLoadingMore && (
                    <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 lg:gap-4 mt-3">
                      {[1, 2, 3].map((i) => (
                        <SkeletonCard key={i} />
                      ))}
                    </div>
                  )}

                  {/* ── Infinite Scroll Sentinel + Load More (mobile) ── */}
                  {hasMore && (
                    <div
                      ref={sentinelRef}
                      className="flex justify-center py-6 lg:hidden"
                    >
                      {isLoadingMore ? (
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Loading...
                        </div>
                      ) : (
                        <button
                          onClick={handleLoadMore}
                          className="px-6 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-navy-700 hover:bg-gray-50 transition-colors"
                        >
                          Load More
                        </button>
                      )}
                    </div>
                  )}

                  {/* ── Desktop Pagination ── */}
                  {totalPages > 1 && (
                    <div className="hidden lg:flex mt-10 items-center justify-center gap-1">
                      <button
                        onClick={() => goToPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                        aria-label="Previous page"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                      </button>
                      {getPageNumbers().map((page, i) =>
                        page === 'ellipsis' ? (
                          <span key={`e-${i}`} className="flex h-9 items-center px-1 text-gray-400 text-sm">...</span>
                        ) : (
                          <button
                            key={page}
                            onClick={() => goToPage(page)}
                            className={`flex h-9 min-w-[36px] items-center justify-center rounded-lg px-2 text-sm font-medium transition-colors ${
                              currentPage === page
                                ? 'bg-primary-500 text-white shadow-sm'
                                : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
                            }`}
                            aria-label={`Page ${page}`}
                            aria-current={currentPage === page ? 'page' : undefined}
                          >
                            {page}
                          </button>
                        )
                      )}
                      <button
                        onClick={() => goToPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                        aria-label="Next page"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                      </button>
                    </div>
                  )}

                  {/* ── Mobile "Show all loaded" indicator ── */}
                  {!hasMore && totalItems > resultsPerPage && (
                    <p className="text-center text-xs text-gray-400 py-4 lg:hidden">
                      Showing all {totalItems} properties
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  )
}
