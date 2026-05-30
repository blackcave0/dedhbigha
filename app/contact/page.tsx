'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Mail, Phone, MapPin, MessageCircle,
  ArrowRight, Send, CheckCircle,
} from 'lucide-react'
import { Navbar, Footer } from '@/components/layout'

const contactMethods = [
  { icon: Phone, title: 'Phone', details: '+91 12345 67890', desc: 'Mon-Sat, 10 AM - 7 PM' },
  { icon: Mail, title: 'Email', details: 'hello@dedhbigha.com', desc: 'We reply within 24 hours' },
  { icon: MapPin, title: 'Office', details: 'Gomti Nagar, Lucknow', desc: 'Uttar Pradesh, India' },
  { icon: MessageCircle, title: 'Live Chat', details: 'Chat with us', desc: 'Available during business hours' },
]

export default function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    // TODO: implement actual contact form submission
    await new Promise((r) => setTimeout(r, 1000))
    setSending(false)
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-[#F7F6F3] font-sans">
      <Navbar />
      <main>
        <section className="relative min-h-[55vh] flex items-center bg-primary-500 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500 via-primary-600 to-primary-800" />
          <div className="mx-auto max-w-7xl px-6 lg:px-12 relative z-10 w-full pt-28 pb-16 lg:pt-36 lg:pb-24">
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-center max-w-3xl mx-auto">
              <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] text-white">
                Get in{' '}
                <span className="text-gold-400">Touch</span>
              </h1>
              <p className="mt-6 text-lg text-white/50 leading-relaxed max-w-2xl mx-auto">
                Have a question, feedback, or need assistance? We are here to help.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-20 lg:py-28 px-6 lg:px-12 -mt-16 relative z-20">
          <div className="mx-auto max-w-7xl">
            <div className="grid lg:grid-cols-4 gap-4 mb-14">
              {contactMethods.map((method, i) => (
                <motion.div
                  key={method.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-white border border-gray-200 p-6 text-center hover:shadow-md transition-all"
                >
                  <div className="flex h-12 w-12 items-center justify-center bg-primary-100 text-primary-500 mx-auto mb-4"
                    style={{ clipPath: 'polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)' }}
                  >
                    <method.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-heading text-sm font-bold text-primary-500">{method.title}</h3>
                  <p className="text-sm text-gray-800 font-medium mt-2">{method.details}</p>
                  <p className="text-xs text-gray-400 mt-1">{method.desc}</p>
                </motion.div>
              ))}
            </div>

            <div className="grid lg:grid-cols-5 gap-10 items-start">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-3 bg-white border border-gray-200 p-8 sm:p-10"
              >
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="flex h-16 w-16 items-center justify-center bg-green-100 text-green-500 mx-auto mb-4 rounded-full">
                      <CheckCircle className="h-8 w-8" />
                    </div>
                    <h3 className="font-heading text-xl font-bold text-primary-500 mb-2">Message Sent!</h3>
                    <p className="text-gray-500">Thank you for reaching out. We will get back to you within 24 hours.</p>
                  </div>
                ) : (
                  <>
                    <h2 className="font-heading text-2xl font-bold text-primary-500 mb-6">Send us a Message</h2>
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                          <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 transition-colors"
                            placeholder="Your name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 transition-colors"
                            placeholder="your@email.com"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Subject</label>
                        <input
                          type="text"
                          required
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          className="w-full border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 transition-colors"
                          placeholder="How can we help?"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Message</label>
                        <textarea
                          required
                          rows={5}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          className="w-full border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 transition-colors resize-none"
                          placeholder="Tell us more about your query..."
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={sending}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 text-white font-bold text-sm hover:bg-primary-600 transition-all disabled:opacity-50"
                        style={{ clipPath: 'polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%)' }}
                      >
                        {sending ? 'Sending...' : 'Send Message'} <Send className="h-4 w-4" />
                      </button>
                    </form>
                  </>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-2 bg-primary-500 p-8 sm:p-10"
                style={{ clipPath: 'polygon(16px 0, 100% 0, 100% 100%, 0 100%)' }}
              >
                <h3 className="font-heading text-xl font-bold text-white mb-4">Why Contact Us?</h3>
                <ul className="space-y-4">
                  {[
                    'Questions about property listings',
                    'Need help with your account',
                    'Report a suspicious listing',
                    'Partnership and advertising inquiries',
                    'Feedback and suggestions',
                    'Technical support',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-white/70">
                      <ArrowRight className="h-4 w-4 text-gold-400 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 pt-6 border-t border-white/10">
                  <p className="text-sm text-white/50">Response time</p>
                  <p className="text-lg font-bold text-gold-400">Within 24 hours</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
