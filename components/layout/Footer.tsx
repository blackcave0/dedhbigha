import Link from 'next/link'
import { Home } from 'lucide-react'

const footerSections = [
  {
    title: 'Quick Links',
    links: [
      { label: 'About', href: '/about' },
      { label: 'For Sellers', href: '/for-sellers' },
      { label: 'For Tenants', href: '/for-tenants' },
      { label: 'Contact', href: '/contact' },
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Services', href: '/services' },
      { label: 'Guides & Articles', href: '/guides' },
      { label: 'Pricing & Plans', href: '/pricing' },
      { label: 'Verified Properties', href: '/verified' },
      { label: 'Trust & Safety', href: '/safety' },
    ],
  },
  {
    title: 'Popular Areas',
    links: [
      { label: 'Gomti Nagar', href: '/search?area=gomti-nagar' },
      { label: 'Shaheed Path', href: '/search?area=shaheed-path' },
      { label: 'Indira Nagar', href: '/search?area=indira-nagar' },
      { label: 'Hazratganj', href: '/search?area=hazratganj' },
      { label: 'Aliganj', href: '/search?area=aliganj' },
      { label: 'Faizabad Road', href: '/search?area=faizabad-road' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_3fr]">
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl">
                {/* <Home className="h-4.5 w-4.5 text-white" /> */}
                <img src="/logo.png" alt="" className='w-full h-full object-cover' />
              </div>
              <span className="font-heading text-xl font-bold text-primary-500 tracking-tight">
                Dedh<span className="text-accent-gold">Bigha</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-gray-500 leading-relaxed max-w-xs">
              Lucknow&apos;s most trusted real estate platform. Find verified properties, new launches, and expert advisors.
            </p>
            <div className="mt-6 flex gap-3">
              {[
                { label: 'X', href: 'https://x.com/dedhbigha', title: 'X (Twitter)' },
                { label: 'IG', href: 'https://instagram.com/dedhbigha', title: 'Instagram' },
                { label: 'LI', href: 'https://linkedin.com/company/dedhbigha', title: 'LinkedIn' },
                { label: 'FB', href: 'https://facebook.com/dedhbigha', title: 'Facebook' },
                { label: 'YT', href: 'https://youtube.com/@dedhbigha', title: 'YouTube' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-xs font-medium text-gray-500 hover:border-primary-300 hover:text-primary-600 transition-colors"
                  aria-label={s.title}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            {footerSections.map((group) => (
              <div key={group.title}>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
                  {group.title}
                </h3>
                <ul className="space-y-2.5">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-gray-600 hover:text-primary-600 transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} DedhBigha. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-400">
            <Link href="/sitemap" className="hover:text-primary-600 transition-colors">Sitemap</Link>
            <span className="w-1 h-1 rounded-full bg-gray-300" />
            <Link href="/privacy" className="hover:text-primary-600 transition-colors">Privacy</Link>
            <span className="w-1 h-1 rounded-full bg-gray-300" />
            <Link href="/terms" className="hover:text-primary-600 transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}