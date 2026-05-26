'use client'

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { User } from '@/lib/types'
import api from '@/lib/api'

interface AuthState {
  user: User | null
  token: string | null
  loading: boolean
  error: string | null
  isAuthenticated: boolean
}

function loadInitialState(): AuthState {
  if (typeof window === 'undefined') {
    return { user: null, token: null, loading: false, error: null, isAuthenticated: false }
  }
  const token = localStorage.getItem('token')
  let user: User | null = null
  try {
    const raw = localStorage.getItem('user')
    user = raw ? JSON.parse(raw) : null
  } catch {
    user = null
  }
  return { user, token, loading: false, error: null, isAuthenticated: !!token }
}

const initialState: AuthState = loadInitialState()

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials: { emailOrPhone: string; password: string }, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/auth/login', credentials)
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      return data
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } }
        return rejectWithValue(axiosErr.response?.data?.message || 'Login failed')
      }
      return rejectWithValue('Login failed')
    }
  }
)

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData: { name: string; email?: string; phone: string; password: string; role?: string }, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/auth/register', userData)
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      return data
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } }
        return rejectWithValue(axiosErr.response?.data?.message || 'Registration failed')
      }
      return rejectWithValue('Registration failed')
    }
  }
)

export const verifyOtp = createAsyncThunk(
  'auth/verifyOtp',
  async (payload: { emailOrPhone: string; otp: string }, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/auth/verify-otp', payload)
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      return data
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } }
        return rejectWithValue(axiosErr.response?.data?.message || 'OTP verification failed')
      }
      return rejectWithValue('OTP verification failed')
    }
  }
)

export const googleLogin = createAsyncThunk(
  'auth/googleLogin',
  async (token: string, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/auth/google', { token })
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      return data
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } }
        return rejectWithValue(axiosErr.response?.data?.message || 'Google login failed')
      }
      return rejectWithValue('Google login failed')
    }
  }
)

export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (payload: { emailOrPhone: string }, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/auth/forgot-password', payload)
      return data
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } }
        return rejectWithValue(axiosErr.response?.data?.message || 'Forgot password request failed')
      }
      return rejectWithValue('Forgot password request failed')
    }
  }
)

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (payload: { token: string; password: string }, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/auth/reset-password', payload)
      return data
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } }
        return rejectWithValue(axiosErr.response?.data?.message || 'Password reset failed')
      }
      return rejectWithValue('Password reset failed')
    }
  }
)

export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/auth/refresh')
      localStorage.setItem('token', data.token)
      return data
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } }
        return rejectWithValue(axiosErr.response?.data?.message || 'Token refresh failed')
      }
      return rejectWithValue('Token refresh failed')
    }
  }
)

export const logout = createAsyncThunk(
  'auth/logout',
  async () => {
    try {
      await api.post('/auth/logout')
    } catch {
      // swallow
    }
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }
)

export const loadUser = createAsyncThunk(
  'auth/loadUser',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/auth/me')
      localStorage.setItem('user', JSON.stringify(data.user ?? data))
      return data
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } }
        return rejectWithValue(axiosErr.response?.data?.message || 'Failed to load user')
      }
      return rejectWithValue('Failed to load user')
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null
    },
    setUser(state, action) {
      state.user = action.payload
      state.isAuthenticated = true
    },
  },
  extraReducers: (builder) => {
    const pending = (state: AuthState) => {
      state.loading = true
      state.error = null
    }
    const rejected = (state: AuthState, action: { payload?: unknown }) => {
      state.loading = false
      state.error = (action.payload as string) || 'Something went wrong'
    }

    builder
      .addCase(loginUser.pending, pending)
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
        state.token = action.payload.token
        state.isAuthenticated = true
      })
      .addCase(loginUser.rejected, rejected)
      .addCase(registerUser.pending, pending)
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
        state.token = action.payload.token
        state.isAuthenticated = true
      })
      .addCase(registerUser.rejected, rejected)
      .addCase(verifyOtp.pending, pending)
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
        state.token = action.payload.token
        state.isAuthenticated = true
      })
      .addCase(verifyOtp.rejected, rejected)
      .addCase(googleLogin.pending, pending)
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
        state.token = action.payload.token
        state.isAuthenticated = true
      })
      .addCase(googleLogin.rejected, rejected)
      .addCase(forgotPassword.pending, pending)
      .addCase(forgotPassword.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(forgotPassword.rejected, rejected)
      .addCase(resetPassword.pending, pending)
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(resetPassword.rejected, rejected)
      .addCase(refreshToken.pending, pending)
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.loading = false
        state.token = action.payload.token
      })
      .addCase(refreshToken.rejected, rejected)
      .addCase(logout.fulfilled, (state) => {
        state.user = null
        state.token = null
        state.loading = false
        state.error = null
        state.isAuthenticated = false
      })
      .addCase(loadUser.pending, pending)
      .addCase(loadUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user ?? action.payload
        state.isAuthenticated = true
      })
      .addCase(loadUser.rejected, (state) => {
        state.loading = false
        state.user = null
        state.token = null
        state.isAuthenticated = false
      })
  },
})

export const { clearError, setUser } = authSlice.actions
export default authSlice.reducer
