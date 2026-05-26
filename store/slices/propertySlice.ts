'use client'

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { Property } from '@/lib/types'
import api from '@/lib/api'

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

interface PropertyState {
  properties: Property[]
  selectedProperty: Property | null
  totalCount: number
  filters: PropertyFilters
  loading: boolean
  error: string | null
}

const initialState: PropertyState = {
  properties: [],
  selectedProperty: null,
  totalCount: 0,
  filters: {},
  loading: false,
  error: null,
}

export const fetchProperties = createAsyncThunk(
  'property/fetchProperties',
  async (filters: PropertyFilters | undefined, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/properties', { params: filters })
      return data
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } }
        return rejectWithValue(axiosErr.response?.data?.message || 'Failed to fetch properties')
      }
      return rejectWithValue('Failed to fetch properties')
    }
  }
)

export const fetchPropertyById = createAsyncThunk(
  'property/fetchPropertyById',
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/properties/${id}`)
      return data
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } }
        return rejectWithValue(axiosErr.response?.data?.message || 'Failed to fetch property')
      }
      return rejectWithValue('Failed to fetch property')
    }
  }
)

export const createProperty = createAsyncThunk(
  'property/createProperty',
  async (propertyData: Partial<Property>, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/properties', propertyData)
      return data
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } }
        return rejectWithValue(axiosErr.response?.data?.message || 'Failed to create property')
      }
      return rejectWithValue('Failed to create property')
    }
  }
)

export const updateProperty = createAsyncThunk(
  'property/updateProperty',
  async ({ id, ...propertyData }: Partial<Property> & { id: string }, { rejectWithValue }) => {
    try {
      const { data } = await api.put(`/properties/${id}`, propertyData)
      return data
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } }
        return rejectWithValue(axiosErr.response?.data?.message || 'Failed to update property')
      }
      return rejectWithValue('Failed to update property')
    }
  }
)

export const deleteProperty = createAsyncThunk(
  'property/deleteProperty',
  async (id: string, { rejectWithValue }) => {
    try {
      await api.delete(`/properties/${id}`)
      return id
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } }
        return rejectWithValue(axiosErr.response?.data?.message || 'Failed to delete property')
      }
      return rejectWithValue('Failed to delete property')
    }
  }
)

export const searchProperties = createAsyncThunk(
  'property/searchProperties',
  async (query: string, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/properties/search', { params: { q: query } })
      return data
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } }
        return rejectWithValue(axiosErr.response?.data?.message || 'Search failed')
      }
      return rejectWithValue('Search failed')
    }
  }
)

const propertySlice = createSlice({
  name: 'property',
  initialState,
  reducers: {
    setFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload }
    },
    clearFilters(state) {
      state.filters = {}
    },
    clearSelectedProperty(state) {
      state.selectedProperty = null
    },
    clearPropertyError(state) {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    const pending = (state: PropertyState) => {
      state.loading = true
      state.error = null
    }
    const rejected = (state: PropertyState, action: { payload?: unknown }) => {
      state.loading = false
      state.error = (action.payload as string) || 'Something went wrong'
    }

    builder
      .addCase(fetchProperties.pending, pending)
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.loading = false
        state.properties = action.payload.properties ?? action.payload
        state.totalCount = action.payload.totalCount ?? action.payload.total ?? 0
      })
      .addCase(fetchProperties.rejected, rejected)
      .addCase(fetchPropertyById.pending, pending)
      .addCase(fetchPropertyById.fulfilled, (state, action) => {
        state.loading = false
        state.selectedProperty = action.payload.property ?? action.payload
      })
      .addCase(fetchPropertyById.rejected, rejected)
      .addCase(createProperty.pending, pending)
      .addCase(createProperty.fulfilled, (state, action) => {
        state.loading = false
        state.properties.unshift(action.payload.property ?? action.payload)
        state.totalCount++
      })
      .addCase(createProperty.rejected, rejected)
      .addCase(updateProperty.pending, pending)
      .addCase(updateProperty.fulfilled, (state, action) => {
        state.loading = false
        const updated = action.payload.property ?? action.payload
        const index = state.properties.findIndex((p) => p.id === updated.id)
        if (index !== -1) {
          state.properties[index] = updated
        }
        state.selectedProperty = updated
      })
      .addCase(updateProperty.rejected, rejected)
      .addCase(deleteProperty.pending, pending)
      .addCase(deleteProperty.fulfilled, (state, action) => {
        state.loading = false
        state.properties = state.properties.filter((p) => p.id !== action.payload)
        state.totalCount--
        if (state.selectedProperty?.id === action.payload) {
          state.selectedProperty = null
        }
      })
      .addCase(deleteProperty.rejected, rejected)
      .addCase(searchProperties.pending, pending)
      .addCase(searchProperties.fulfilled, (state, action) => {
        state.loading = false
        state.properties = action.payload.properties ?? action.payload
        state.totalCount = action.payload.totalCount ?? state.properties.length
      })
      .addCase(searchProperties.rejected, rejected)
  },
})

export const { setFilters, clearFilters, clearSelectedProperty, clearPropertyError } = propertySlice.actions
export default propertySlice.reducer
