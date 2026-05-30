'use client'

import { motion } from 'framer-motion'
import { Navbar, Footer } from '@/components/layout'

const sections = [
  {
    title: '1. Information We Collect',
    content: 'We collect information you provide directly to us, including your name, email address, phone number, and property details when you create an account, list a property, or contact us. We also automatically collect certain information when you visit our platform, including your IP address, browser type, device information, and usage data.'
  },
  {
    title: '2. How We Use Your Information',
    content: 'We use the information we collect to provide, maintain, and improve our services; to process transactions and send related information; to send you technical notices, updates, and support messages; to respond to your comments and questions; and to personalize your experience on our platform.'
  },
  {
    title: '3. Information Sharing',
    content: 'We do not sell your personal information. We may share your information with property buyers/sellers/tenants as necessary to facilitate transactions, with service providers who perform services on our behalf, or when required by law. We take appropriate measures to ensure that any third-party service providers handle your data with the same level of care.'
  },
  {
    title: '4. Data Security',
    content: 'We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. This includes encryption, secure socket layer (SSL) technology, and regular security audits. However, no method of transmission over the Internet is 100% secure.'
  },
  {
    title: '5. Your Rights',
    content: 'You have the right to access, update, or delete your personal information at any time through your account settings. You can also opt-out of marketing communications by updating your notification preferences or contacting us directly. We will respond to your requests within a reasonable timeframe.'
  },
  {
    title: '6. Cookies',
    content: 'We use cookies and similar tracking technologies to enhance your browsing experience, analyze website traffic, and understand where our visitors come from. You can control cookie preferences through your browser settings. Disabling cookies may affect some features of our platform.'
  },
  {
    title: '7. Third-Party Links',
    content: 'Our platform may contain links to third-party websites or services. We are not responsible for the privacy practices of these third parties. We encourage you to review their privacy policies before providing any personal information on their platforms.'
  },
  {
    title: '8. Children\'s Privacy',
    content: 'Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that a child has provided us with personal information, we will take steps to delete such information promptly.'
  },
  {
    title: '9. Changes to This Policy',
    content: 'We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the new policy on this page and updating the "Last Updated" date. Your continued use of the platform after changes constitutes acceptance of the updated policy.'
  },
  {
    title: '10. Contact Us',
    content: 'If you have any questions about this Privacy Policy or our data practices, please contact us at privacy@dedhbigha.com or through our Contact page. We are committed to addressing your concerns and protecting your privacy.'
  },
]

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#F7F6F3] font-sans">
      <Navbar />
      <main>
        <section className="relative py-28 lg:py-36 bg-primary-500 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500 via-primary-600 to-primary-800" />
          <div className="mx-auto max-w-7xl px-6 lg:px-12 relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center max-w-3xl mx-auto">
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
                Privacy <span className="text-gold-400">Policy</span>
              </h1>
              <p className="mt-4 text-white/50">Last updated: 30 May 2026</p>
            </motion.div>
          </div>
        </section>

        <section className="py-16 lg:py-20 px-6 lg:px-12">
          <div className="mx-auto max-w-3xl">
            <p className="text-gray-500 leading-relaxed mb-10">
              At DedhBigha, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, 
              and safeguard your information when you visit our platform.
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
