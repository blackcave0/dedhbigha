'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'

export type UserRole = 'BUYER' | 'OWNER' | 'DEALER' | 'BUILDER' | 'ADMIN'

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: UserRole
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (user: User, token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window === 'undefined') return null
    try {
      const stored = localStorage.getItem('auth_user')
      return stored ? JSON.parse(stored) : null
    } catch {
      localStorage.removeItem('auth_user')
      return null
    }
  })
  const [isLoading] = useState(false)

  const login = (userData: User, token: string) => {
    setUser(userData)
    localStorage.setItem('auth_user', JSON.stringify(userData))
    localStorage.setItem('auth_token', token)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('auth_user')
    localStorage.removeItem('auth_token')
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
