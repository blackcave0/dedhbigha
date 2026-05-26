'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/lib/api'
import type { Property, Lead } from '@/lib/types'

interface PropertyFilters {
  listingType?: string
  propertyType?: string
  city?: string
  state?: string
  minPrice?: number
  maxPrice?: number
  bedrooms?: number
  page?: number
  limit?: number
  sort?: string
  [key: string]: unknown
}

interface PaginatedResponse<T> {
  properties: T[]
  totalCount: number
  total?: number
  page?: number
  limit?: number
}

interface DashboardStats {
  totalProperties: number
  totalLeads: number
  totalViews: number
  activeListings: number
  [key: string]: unknown
}

export function useProperties(filters?: PropertyFilters) {
  return useQuery({
    queryKey: ['properties', filters],
    queryFn: async () => {
      const { data } = await api.get<PaginatedResponse<Property>>('/properties', {
        params: filters,
      })
      return data
    },
  })
}

export function useProperty(id: string) {
  return useQuery({
    queryKey: ['property', id],
    queryFn: async () => {
      const { data } = await api.get<{ property: Property } | Property>(
        `/properties/${id}`
      )
      return data
    },
    enabled: !!id,
  })
}

export function useCreateProperty() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (propertyData: Partial<Property>) => {
      const { data } = await api.post('/properties', propertyData)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] })
    },
  })
}

export function useUpdateProperty() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({
      id,
      ...propertyData
    }: Partial<Property> & { id: string }) => {
      const { data } = await api.put(`/properties/${id}`, propertyData)
      return data
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['properties'] })
      queryClient.invalidateQueries({ queryKey: ['property', variables.id] })
    },
  })
}

export function useDeleteProperty() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/properties/${id}`)
      return id
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] })
    },
  })
}

export function useLeads() {
  return useQuery({
    queryKey: ['leads'],
    queryFn: async () => {
      const { data } = await api.get<Lead[]>('/leads')
      return data
    },
  })
}

export function useCreateLead() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (leadData: Partial<Lead>) => {
      const { data } = await api.post('/leads', leadData)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] })
    },
  })
}

export function useProfile() {
  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data } = await api.get('/auth/me')
      return data
    },
  })
}

export function useDashboardStats() {
  return useQuery({
    queryKey: ['dashboardStats'],
    queryFn: async () => {
      const { data } = await api.get<DashboardStats>('/dashboard/stats')
      return data
    },
  })
}
