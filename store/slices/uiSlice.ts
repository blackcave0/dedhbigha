'use client'

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Toast {
  id: string
  type: 'success' | 'error' | 'info' | 'warning'
  message: string
  duration?: number
}

interface UiState {
  sidebarOpen: boolean
  searchDrawerOpen: boolean
  theme: 'light' | 'dark'
  toast: Toast | null
}

const initialState: UiState = {
  sidebarOpen: false,
  searchDrawerOpen: false,
  theme: 'light',
  toast: null,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.sidebarOpen = !state.sidebarOpen
    },
    setSidebarOpen(state, action: PayloadAction<boolean>) {
      state.sidebarOpen = action.payload
    },
    toggleSearchDrawer(state) {
      state.searchDrawerOpen = !state.searchDrawerOpen
    },
    setSearchDrawerOpen(state, action: PayloadAction<boolean>) {
      state.searchDrawerOpen = action.payload
    },
    setTheme(state, action: PayloadAction<'light' | 'dark'>) {
      state.theme = action.payload
    },
    toggleTheme(state) {
      state.theme = state.theme === 'light' ? 'dark' : 'light'
    },
    showToast(state, action: PayloadAction<Omit<Toast, 'id'>>) {
      state.toast = { ...action.payload, id: Date.now().toString() }
    },
    dismissToast(state) {
      state.toast = null
    },
  },
})

export const {
  toggleSidebar,
  setSidebarOpen,
  toggleSearchDrawer,
  setSearchDrawerOpen,
  setTheme,
  toggleTheme,
  showToast,
  dismissToast,
} = uiSlice.actions
export default uiSlice.reducer
