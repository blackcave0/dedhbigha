'use client'

import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {   Mail, Phone, User, Lock, Globe, Shield, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Card } from '@/components/ui/Card'
import { useAuth, type UserRole } from '@/store/auth'

type AuthTab = 'login' | 'register' | 'otp'

interface FormErrors {
  [key: string]: string
}

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<AuthTab>('login')
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const { login } = useAuth()

  const [loginForm, setLoginForm] = useState({ email: '', password: '' })
  const [registerForm, setRegisterForm] = useState({
    name: '', email: '', phone: '', password: '', role: '',
  })
  const [otpForm, setOtpForm] = useState({ contact: '', otp: Array(6).fill('') })

  const validateLogin = () => {
    const errs: FormErrors = {}
    if (!loginForm.email) errs.email = 'Email or phone is required'
    if (!loginForm.password) errs.password = 'Password is required'
    else if (loginForm.password.length < 6) errs.password = 'Password must be at least 6 characters'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const validateRegister = () => {
    const errs: FormErrors = {}
    if (!registerForm.name.trim()) errs.name = 'Name is required'
    if (!registerForm.email) errs.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerForm.email)) errs.email = 'Invalid email address'
    if (!registerForm.phone) errs.phone = 'Phone is required'
    else if (!/^[6-9]\d{9}$/.test(registerForm.phone)) errs.phone = 'Enter a valid 10-digit phone number'
    if (!registerForm.password) errs.password = 'Password is required'
    else if (registerForm.password.length < 6) errs.password = 'Password must be at least 6 characters'
    if (!registerForm.role) errs.role = 'Please select a role'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()
    if (!validateLogin()) return
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1000))
    login(
      {
        id: '1',
        name: 'User',
        email: loginForm.email,
        role: 'BUYER',
      },
      'mock-token',
    )
    setLoading(false)
  }

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault()
    if (!validateRegister()) return
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1000))
    login(
      {
        id: '1',
        name: registerForm.name,
        email: registerForm.email,
        role: registerForm.role as UserRole,
      },
      'mock-token',
    )
    setLoading(false)
  }

  const handleOtpChange = (index: number, value: string) => {
    if (value && !/^\d$/.test(value)) return
    const newOtp = [...otpForm.otp]
    newOtp[index] = value
    setOtpForm({ ...otpForm, otp: newOtp })
    if (value && index < 5) {
      const next = document.getElementById(`otp-${index + 1}`)
      next?.focus()
    }
  }

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otpForm.otp[index] && index > 0) {
      const prev = document.getElementById(`otp-${index - 1}`)
      prev?.focus()
    }
  }

  const handleOtpSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1000))
    setLoading(false)
  }

  const tabVariants = {
    enter: { opacity: 0, x: 20 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-navy-50 to-white px-4 py-12">
      <div className="w-full max-w-md">
        {/* Back to Home */}
        <Link
          href="/"
          className="mb-6 flex items-center gap-1.5 text-sm text-gray-500 transition-colors hover:text-navy-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        {/* Logo */}
        <Link href="/" className="mb-8 flex items-center justify-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-500">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <span className="font-heading text-2xl font-bold text-navy-900">
            Dedh<span className="text-primary-500">Bigha</span>
          </span>
        </Link>

        {/* Tab Switcher */}
        <Card padding="none" className="mb-6 overflow-hidden">
          <div className="flex border-b border-navy-100">
            {[
              { key: 'login' as const, label: 'Login' },
              { key: 'register' as const, label: 'Register' },
              { key: 'otp' as const, label: 'OTP' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => { setActiveTab(tab.key); setErrors({}) }}
                className={`relative flex-1 px-4 py-3 text-sm font-semibold transition-colors ${
                  activeTab === tab.key
                    ? 'text-primary-600'
                    : 'text-gray-500 hover:text-navy-900'
                }`}
              >
                {activeTab === tab.key && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-6">
            <AnimatePresence mode="wait">
              {/* Login Tab */}
              {activeTab === 'login' && (
                <motion.form
                  key="login"
                  variants={tabVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.2 }}
                  onSubmit={handleLogin}
                >
                  <div className="space-y-4">
                    <Input
                      label="Email or Phone"
                      type="text"
                      placeholder="Enter your email or phone"
                      value={loginForm.email}
                      onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                      error={errors.email}
                      leftIcon={<Mail className="h-4 w-4" />}
                    />
                    <Input
                      label="Password"
                      type="password"
                      placeholder="Enter your password"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                      error={errors.password}
                      leftIcon={<Lock className="h-4 w-4" />}
                    />
                    <div className="flex items-center justify-end">
                      <Link
                        href="/auth/forgot-password"
                        className="text-xs font-medium text-primary-500 hover:text-primary-600"
                      >
                        Forgot Password?
                      </Link>
                    </div>
                    <Button type="submit" fullWidth loading={loading}>
                      Sign In
                    </Button>
                  </div>
                </motion.form>
              )}

              {/* Register Tab */}
              {activeTab === 'register' && (
                <motion.form
                  key="register"
                  variants={tabVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.2 }}
                  onSubmit={handleRegister}
                >
                  <div className="space-y-4">
                    <Input
                      label="Full Name"
                      type="text"
                      placeholder="Enter your full name"
                      value={registerForm.name}
                      onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                      error={errors.name}
                      leftIcon={<User className="h-4 w-4" />}
                    />
                    <Input
                      label="Email Address"
                      type="email"
                      placeholder="Enter your email"
                      value={registerForm.email}
                      onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                      error={errors.email}
                      leftIcon={<Mail className="h-4 w-4" />}
                    />
                    <Input
                      label="Phone Number"
                      type="tel"
                      placeholder="Enter your 10-digit phone number"
                      value={registerForm.phone}
                      onChange={(e) => setRegisterForm({ ...registerForm, phone: e.target.value })}
                      error={errors.phone}
                      leftIcon={<Phone className="h-4 w-4" />}
                    />
                    <Input
                      label="Password"
                      type="password"
                      placeholder="Create a strong password"
                      value={registerForm.password}
                      onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                      error={errors.password}
                      leftIcon={<Lock className="h-4 w-4" />}
                    />
                    <Select
                      label="I am a"
                      placeholder="Select your role"
                      value={registerForm.role}
                      onChange={(e) => setRegisterForm({ ...registerForm, role: e.target.value })}
                      error={errors.role}
                      options={[
                        { value: 'BUYER', label: 'Buyer' },
                        { value: 'OWNER', label: 'Owner' },
                        { value: 'DEALER', label: 'Dealer' },
                        { value: 'BUILDER', label: 'Builder' },
                      ]}
                    />
                    <Button type="submit" fullWidth loading={loading}>
                      Create Account
                    </Button>
                  </div>
                </motion.form>
              )}

              {/* OTP Tab */}
              {activeTab === 'otp' && (
                <motion.form
                  key="otp"
                  variants={tabVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.2 }}
                  onSubmit={handleOtpSubmit}
                >
                  <div className="space-y-5">
                    <Input
                      label="Email or Phone"
                      type="text"
                      placeholder="Enter registered email or phone"
                      value={otpForm.contact}
                      onChange={(e) => setOtpForm({ ...otpForm, contact: e.target.value })}
                      leftIcon={<Mail className="h-4 w-4" />}
                    />
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-navy-700">
                        Enter OTP
                      </label>
                      <div className="flex justify-center gap-2">
                        {otpForm.otp.map((digit, index) => (
                          <input
                            key={index}
                            id={`otp-${index}`}
                            type="text"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleOtpChange(index, e.target.value)}
                            onKeyDown={(e) => handleOtpKeyDown(index, e)}
                            className="h-12 w-10 rounded-lg border border-navy-200 text-center text-lg font-semibold text-navy-900 transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-center text-xs text-gray-500">
                      Didn&apos;t receive the code?{' '}
                      <button type="button" className="font-medium text-primary-500 hover:text-primary-600">
                        Resend OTP
                      </button>
                    </p>
                    <Button type="submit" fullWidth loading={loading}>
                      Verify OTP
                    </Button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Card>

        {/* Social Login */}
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-navy-200" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-gradient-to-br from-navy-50 to-white px-2 text-gray-500">
              Or continue with
            </span>
          </div>
        </div>

        <Button
          fullWidth
          variant="outline"
          leftIcon={<Globe className="h-4 w-4" />}
          className="border-gray-300 text-navy-700 hover:bg-gray-50"
        >
          {activeTab === 'login' ? 'Sign in' : 'Sign up'} with Google
        </Button>

        <p className="mt-6 text-center text-xs text-gray-500">
          By continuing, you agree to our{' '}
          <Link href="/terms" className="font-medium text-primary-500 hover:text-primary-600">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link href="/privacy" className="font-medium text-primary-500 hover:text-primary-600">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  )
}
