'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Mail, ArrowLeft, CheckCircle, Send, Shield } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    await new Promise((r) => setTimeout(r, 1000))
    setSending(false)
    setSent(true)
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Image Panel — always visible */}
      <div className="relative h-52 sm:h-56 lg:h-auto lg:w-[520px] xl:w-[600px] flex-shrink-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-500 via-primary-500 to-indigo-600" />
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: "url('https://picsum.photos/seed/lucknow-auth3/1200/1600')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 lg:bg-gradient-to-r lg:from-rose-500/20 lg:via-primary-500/10 lg:to-indigo-600/20" />
        <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-amber-400/20 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl" />
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
          <div className="hidden lg:block space-y-4">
            <p className="text-amber-300 font-semibold text-sm tracking-widest uppercase">Need help?</p>
            <h1 className="text-4xl xl:text-5xl font-bold text-white leading-[1.1] drop-shadow-lg">
              Trouble
              <br />
              <span className="text-amber-300">signing in?</span>
            </h1>
            <p className="text-base text-white/70 max-w-sm leading-relaxed">
              Enter your email and we&apos;ll send you a link to reset your password.
            </p>
          </div>

          {/* Mobile content */}
          <div className="lg:hidden text-center">
            <h1 className="text-lg sm:text-xl font-bold text-white drop-shadow-md">
              Trouble <span className="text-amber-300">signing in?</span>
            </h1>
          </div>
        </div>
      </div>

      {/* Form Panel */}
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-rose-50 via-white to-indigo-50 px-4 sm:px-6 py-8 lg:py-12">
        <div className="w-full max-w-sm">
          <div className="bg-white rounded-2xl shadow-xl shadow-rose-200/30 border border-rose-100/50 p-6 sm:p-8">
            {sent ? (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-4 space-y-6"
              >
                <div className="flex justify-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-50">
                    <CheckCircle className="h-7 w-7 text-green-500" />
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-navy-900 mb-1">Check your email</h2>
                  <p className="text-sm text-navy-400">
                    We sent a reset link to <strong className="text-navy-700">{email}</strong>
                  </p>
                </div>
                <Link href="/auth" className="block">
                  <Button variant="outline" fullWidth leftIcon={<ArrowLeft className="h-4 w-4" />}>Back to login</Button>
                </Link>
              </motion.div>
            ) : (
              <>
                <div className="text-center mb-7">
                  <h1 className="text-xl sm:text-2xl font-bold text-navy-900">Forgot password?</h1>
                  <p className="text-sm text-navy-400 mt-1">We&apos;ll send you a reset link.</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <Input label="Email address" type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} leftIcon={<Mail className="h-4 w-4" />} required />
                  <Button type="submit" fullWidth loading={sending} size="lg" leftIcon={<Send className="h-4 w-4" />}>Send reset link</Button>
                  <div className="text-center">
                    <Link href="/auth" className="inline-flex items-center gap-1.5 text-sm font-medium text-navy-400 hover:text-primary-500 transition-colors">
                      <ArrowLeft className="h-4 w-4" /> Back to login
                    </Link>
                  </div>
                </form>
              </>
            )}
          </div>

          <p className="mt-6 text-center text-xs text-navy-300">
            Remember your password?{' '}
            <Link href="/auth" className="font-medium text-primary-500 hover:text-primary-600">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
