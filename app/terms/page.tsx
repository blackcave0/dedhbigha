'use client'

import { motion } from 'framer-motion'
import { Navbar, Footer } from '@/components/layout'

const sections = [
  {
    title: '1. Acceptance of Terms',
    content: 'By accessing or using DedhBigha, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not use our platform. We reserve the right to update these terms at any time, and continued use constitutes acceptance of changes.'
  },
  {
    title: '2. User Accounts',
    content: 'You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must provide accurate, current, and complete information during registration. We reserve the right to suspend or terminate accounts that violate our terms.'
  },
  {
    title: '3. Property Listings',
    content: 'Property owners and agents are responsible for the accuracy of their listings. All listings must include accurate information about the property, including price, location, specifications, and availability. Misleading or fraudulent listings are strictly prohibited and will result in account termination.'
  },
  {
    title: '4. User Conduct',
    content: 'Users agree not to: (a) use the platform for any unlawful purpose; (b) post false or misleading information; (c) harass, abuse, or harm other users; (d) interfere with the platform\'s operation; (e) collect user data without consent; or (f) engage in any activity that could damage our reputation.'
  },
  {
    title: '5. Transactions',
    content: 'DedhBigha is a platform that connects property owners with buyers and tenants. We facilitate introductions but are not a party to any transaction between users. All financial transactions, agreements, and legal documentation are the sole responsibility of the parties involved.'
  },
  {
    title: '6. Intellectual Property',
    content: 'All content on DedhBigha, including text, graphics, logos, and software, is our property or our licensors and is protected by intellectual property laws. Users may not reproduce, distribute, or create derivative works without our express consent.'
  },
  {
    title: '7. Privacy',
    content: 'Your use of DedhBigha is also governed by our Privacy Policy, which describes how we collect, use, and protect your personal information. By using our platform, you consent to our data practices as described in the Privacy Policy.'
  },
  {
    title: '8. Limitation of Liability',
    content: 'DedhBigha shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the platform. We do not guarantee the accuracy of listings or the behavior of users. Our total liability is limited to the amount paid by you to use our services.'
  },
  {
    title: '9. Termination',
    content: 'We reserve the right to suspend or terminate your account at any time for violation of these terms or for any other reason at our discretion. Upon termination, your right to use the platform ceases immediately. Provisions regarding intellectual property and limitation of liability survive termination.'
  },
  {
    title: '10. Governing Law',
    content: 'These terms shall be governed by and construed in accordance with the laws of India. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in Lucknow, Uttar Pradesh.'
  },
  {
    title: '11. Contact',
    content: 'For questions about these Terms of Service, please contact us at legal@dedhbigha.com or through our Contact page. We aim to respond to all inquiries within 48 hours.'
  },
]

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#F7F6F3] font-sans">
      <Navbar />
      <main>
        <section className="relative py-28 lg:py-36 bg-primary-500 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500 via-primary-600 to-primary-800" />
          <div className="mx-auto max-w-7xl px-6 lg:px-12 relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center max-w-3xl mx-auto">
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
                Terms of <span className="text-gold-400">Service</span>
              </h1>
              <p className="mt-4 text-white/50">Last updated: 30 May 2026</p>
            </motion.div>
          </div>
        </section>

        <section className="py-16 lg:py-20 px-6 lg:px-12">
          <div className="mx-auto max-w-3xl">
            <p className="text-gray-500 leading-relaxed mb-10">
              Please read these Terms of Service carefully before using DedhBigha. By accessing or using our platform, 
              you agree to be bound by these terms.
            </p>
            <div className="space-y-10">
              {sections.map((section, i) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <h2 className="font-heading text-xl font-bold text-primary-500 mb-3">{section.title}</h2>
                  <p className="text-gray-500 leading-relaxed text-sm">{section.content}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
