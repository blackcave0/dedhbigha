'use client'

import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Phone, User, Lock, Shield, Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { useAuth, type UserRole } from '@/store/auth'

type AuthTab = 'login' | 'register' | 'otp'

interface FormErrors {
  [key: string]: string
}

const dummyUsers = [
  { email: 'buyer@dedhbigha.com', password: 'password123', role: 'BUYER' as UserRole, name: 'Rahul Buyer', label: 'Buyer' },
  { email: 'owner@dedhbigha.com', password: 'password123', role: 'OWNER' as UserRole, name: 'Priya Owner', label: 'Owner / Seller' },
  { email: 'dealer@dedhbigha.com', password: 'password123', role: 'DEALER' as UserRole, name: 'Amit Dealer', label: 'Dealer' },
  { email: 'builder@dedhbigha.com', password: 'password123', role: 'BUILDER' as UserRole, name: 'Sneha Builder', label: 'Builder' },
  { email: 'admin@dedhbigha.com', password: 'admin123', role: 'ADMIN' as UserRole, name: 'Admin User', label: 'Admin' },
]

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<AuthTab>('login')
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [showDummy, setShowDummy] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

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
    await new Promise((r) => setTimeout(r, 800))
    const matched = dummyUsers.find(
      (u) => u.email === loginForm.email && u.password === loginForm.password,
    )
    if (matched) {
      login(
        { id: matched.role === 'ADMIN' ? 'admin-1' : `user-${Math.random().toString(36).slice(2, 8)}`, name: matched.name, email: matched.email, role: matched.role },
        'mock-token',
      )
      router.push('/dashboard')
    } else {
      setErrors({ email: 'Invalid email or password. Try the demo credentials below.' })
    }
    setLoading(false)
  }

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault()
    if (!validateRegister()) return
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1000))
    login(
      { id: `user-${Math.random().toString(36).slice(2, 8)}`, name: registerForm.name, email: registerForm.email, role: registerForm.role as UserRole },
      'mock-token',
    )
    router.push('/dashboard')
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

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Image Panel — always visible */}
      <div className="relative h-64 sm:h-72 lg:h-auto lg:w-[520px] xl:w-[600px] flex-shrink-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-500 via-primary-500 to-indigo-600" />
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: "url('https://picsum.photos/seed/lucknow-auth2/1200/1600')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 lg:bg-gradient-to-r lg:from-rose-500/20 lg:via-primary-500/10 lg:to-indigo-600/20" />
        <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-amber-400/20 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute top-1/3 right-0 h-40 w-40 rounded-full bg-rose-300/20 blur-2xl" />
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M0 0h1v1H0z'/%3E%3C/g%3E%3C/svg%3E")` }} />

        <div className="relative z-10 flex flex-col justify-between h-full p-6 sm:p-8 lg:p-12">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <div className="flex h-9 w-9 lg:h-10 lg:w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
              <Shield className="h-4 w-4 lg:h-5 lg:w-5 text-white" />
            </div>
            <span className="text-lg lg:text-xl font-bold tracking-tight text-white drop-shadow-sm">
              Dedh<span className="text-amber-300">Bigha</span>
            </span>
          </Link>

          {/* Desktop content */}
          <div className="hidden lg:block space-y-8">
            <div className="space-y-3">
              <p className="text-amber-300 font-semibold text-sm tracking-widest uppercase">Trusted by 50,000+</p>
              <h1 className="text-4xl xl:text-5xl font-bold text-white leading-[1.1] drop-shadow-lg">
                Find your
                <br />
                <span className="text-amber-300">dream home</span>
                <br />
                in Lucknow
              </h1>
              <p className="text-base text-white/70 max-w-sm leading-relaxed">
                India&apos;s most trusted real estate platform. Buy, sell, or rent with confidence.
              </p>
            </div>
            <div className="flex gap-8">
              {[
                { num: '10K+', label: 'Properties' },
                { num: '50K+', label: 'Customers' },
                { num: '4.8', label: 'Rating' },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-2xl font-bold text-white">{s.num}</p>
                  <p className="text-xs text-white/50">{s.label}</p>
                </div>
              ))}
            </div>
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-9 w-9 rounded-full border-2 border-white/80 bg-cover bg-center"
                  style={{ backgroundImage: `url('https://i.pravatar.cc/100?img=${i + 10}')` }}
                />
              ))}
              <div className="h-9 w-9 rounded-full border-2 border-white/80 bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <span className="text-[10px] font-bold text-white">2K+</span>
              </div>
            </div>
          </div>

          {/* Mobile content */}
          <div className="lg:hidden text-center">
            <h1 className="text-xl sm:text-2xl font-bold text-white drop-shadow-md">
              Find your <span className="text-amber-300">dream home</span>
            </h1>
            <p className="text-xs sm:text-sm text-white/60 mt-1">Buy, sell, or rent with confidence</p>
          </div>
        </div>
      </div>

      {/* Form Panel */}
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-rose-50 via-white to-indigo-50 px-4 sm:px-6 py-8 lg:py-12">
        <div className="w-full max-w-sm">
          {/* Tabs */}
          <div className="flex gap-0.5 mb-8 bg-white rounded-xl p-1 shadow-sm border border-navy-100">
            {(['login', 'register', 'otp'] as AuthTab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab); setErrors({}) }}
                className={`flex-1 rounded-lg py-2.5 text-sm font-semibold transition-all ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-primary-500 to-indigo-600 text-white shadow-md'
                    : 'text-navy-400 hover:text-navy-600'
                }`}
              >
                {tab === 'login' ? 'Login' : tab === 'register' ? 'Register' : 'OTP'}
              </button>
            ))}
          </div>

          {/* Form card */}
          <div className="bg-white rounded-2xl shadow-xl shadow-rose-200/30 border border-rose-100/50 p-6 sm:p-8">
            <div className="text-center mb-6">
              <h1 className="text-xl sm:text-2xl font-bold text-navy-900">
                {activeTab === 'login' ? 'Welcome back' : activeTab === 'register' ? 'Get started' : 'Verify'}
              </h1>
              <p className="text-sm text-navy-400 mt-1">
                {activeTab === 'login' && 'Sign in to your account'}
                {activeTab === 'register' && 'Create your free account'}
                {activeTab === 'otp' && 'Enter the verification code'}
              </p>
            </div>

            <AnimatePresence mode="wait">
              {activeTab === 'login' && (
                <motion.form
                  key="login"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.15 }}
                  onSubmit={handleLogin}
                  className="space-y-4"
                >
                  <Input label="Email" type="text" placeholder="your@email.com" value={loginForm.email} onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })} error={errors.email} leftIcon={<Mail className="h-4 w-4" />} />
                  <Input label="Password" type="password" placeholder="Enter your password" value={loginForm.password} onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })} error={errors.password} leftIcon={<Lock className="h-4 w-4" />} />
                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="h-4 w-4 rounded border-navy-300 text-primary-500 focus:ring-primary-500/20" />
                      <span className="text-navy-500">Remember</span>
                    </label>
                    <Link href="/auth/forgot-password" className="font-medium text-primary-500 hover:text-primary-600">Forgot password?</Link>
                  </div>
                  <Button type="submit" fullWidth loading={loading} size="lg">Sign in</Button>
                </motion.form>
              )}

              {activeTab === 'register' && (
                <motion.form
                  key="register"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.15 }}
                  onSubmit={handleRegister}
                  className="space-y-4"
                >
                  <Input label="Full name" type="text" placeholder="John Doe" value={registerForm.name} onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })} error={errors.name} leftIcon={<User className="h-4 w-4" />} />
                  <Input label="Email" type="email" placeholder="john@email.com" value={registerForm.email} onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })} error={errors.email} leftIcon={<Mail className="h-4 w-4" />} />
                  <Input label="Phone" type="tel" placeholder="9876543210" value={registerForm.phone} onChange={(e) => setRegisterForm({ ...registerForm, phone: e.target.value })} error={errors.phone} leftIcon={<Phone className="h-4 w-4" />} />
                  <Input label="Password" type="password" placeholder="Minimum 6 characters" value={registerForm.password} onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })} error={errors.password} leftIcon={<Lock className="h-4 w-4" />} />
                  <Select label="I am a" placeholder="Select role" value={registerForm.role} onChange={(e) => setRegisterForm({ ...registerForm, role: e.target.value })} error={errors.role} options={[
                    { value: 'BUYER', label: 'Buyer' }, { value: 'OWNER', label: 'Owner' }, { value: 'DEALER', label: 'Dealer' }, { value: 'BUILDER', label: 'Builder' },
                  ]} />
                  <Button type="submit" fullWidth loading={loading} size="lg">Create account</Button>
                </motion.form>
              )}

              {activeTab === 'otp' && (
                <motion.form
                  key="otp"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.15 }}
                  onSubmit={handleOtpSubmit}
                  className="space-y-5"
                >
                  <Input label="Email or phone" type="text" placeholder="your@email.com" value={otpForm.contact} onChange={(e) => setOtpForm({ ...otpForm, contact: e.target.value })} leftIcon={<Mail className="h-4 w-4" />} />
                  <div>
                    <label className="block text-sm font-medium text-navy-700 mb-2.5">OTP</label>
                    <div className="flex justify-center gap-3">
                      {otpForm.otp.map((digit, index) => (
                        <input key={index} id={`otp-${index}`} type="text" maxLength={1} value={digit} onChange={(e) => handleOtpChange(index, e.target.value)} onKeyDown={(e) => handleOtpKeyDown(index, e)} className="h-12 w-11 rounded-lg border border-navy-200 text-center text-lg font-semibold text-navy-900 transition-all focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20" />
                      ))}
                    </div>
                  </div>
                  <div className="text-center text-sm text-navy-400">
                    Didn&apos;t get it? <button type="button" className="font-semibold text-primary-500 hover:text-primary-600">Resend</button>
                  </div>
                  <Button type="submit" fullWidth loading={loading} size="lg">Verify</Button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Demo Credentials */}
          <div className="mt-4">
            <button
              type="button"
              onClick={() => setShowDummy(!showDummy)}
              className="w-full flex items-center justify-center gap-2 py-3 text-sm text-navy-400 hover:text-primary-500 transition-colors rounded-xl border border-dashed border-navy-200 hover:border-primary-300 bg-white/60"
            >
              <Shield className="h-4 w-4" />
              {showDummy ? 'Hide' : 'Quick login'} — demo accounts
              {showDummy ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
            </button>
            {showDummy && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-2 space-y-1"
              >
                {dummyUsers.map((u) => (
                  <button
                    key={u.email}
                    type="button"
                    onClick={() => { setLoginForm({ email: u.email, password: u.password }); setErrors({}); setActiveTab('login') }}
                    className="w-full flex items-center justify-between rounded-lg px-4 py-2.5 text-sm transition-colors hover:bg-rose-50/50 border border-transparent hover:border-rose-200 bg-white/60"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-semibold text-navy-600 min-w-[80px]">{u.label}</span>
                      <span className="text-navy-400 truncate">{u.email}</span>
                    </div>
                    <span className="text-xs font-mono text-navy-300 bg-navy-50 px-2 py-0.5 rounded shrink-0">{u.password}</span>
                  </button>
                ))}
              </motion.div>
            )}
          </div>

          <p className="mt-6 text-center text-xs text-navy-300">
            By continuing, you agree to our{' '}
            <Link href="/terms" className="font-medium text-primary-500 hover:text-primary-600">Terms</Link>
            {' & '}
            <Link href="/privacy" className="font-medium text-primary-500 hover:text-primary-600">Privacy</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
