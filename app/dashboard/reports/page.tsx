'use client'

import { motion } from 'framer-motion'
import { BarChart3, TrendingUp, Users, Building2, Eye, MessageCircle, DollarSign, Download, Calendar } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

const statCards = [
  { label: 'Total Properties', value: '156', change: '+12%', icon: Building2, color: 'text-primary-500', bg: 'bg-primary-50' },
  { label: 'Total Views', value: '12,847', change: '+8%', icon: Eye, color: 'text-green-600', bg: 'bg-green-50' },
  { label: 'Total Leads', value: '342', change: '+18%', icon: MessageCircle, color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Conversion Rate', value: '2.7%', change: '+0.5%', icon: TrendingUp, color: 'text-accent-gold', bg: 'bg-yellow-50' },
]

const monthlyData = [
  { month: 'Jan', views: 1200, leads: 45 },
  { month: 'Feb', views: 1800, leads: 62 },
  { month: 'Mar', views: 2400, leads: 78 },
  { month: 'Apr', views: 2100, leads: 55 },
  { month: 'May', views: 2800, leads: 92 },
  { month: 'Jun', views: 3100, leads: 105 },
]

const maxViews = Math.max(...monthlyData.map((d) => d.views))
const maxLeads = Math.max(...monthlyData.map((d) => d.leads))

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Reports</h1>
          <p className="text-sm text-navy-500">Analytics and performance reports for your properties</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" leftIcon={<Calendar className="h-4 w-4" />}>Last 30 Days</Button>
          <Button variant="outline" size="sm" leftIcon={<Download className="h-4 w-4" />}>Export CSV</Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label} padding="md" hoverable>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-navy-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-navy-900">{stat.value}</p>
                  <span className="text-xs font-medium text-green-600">{stat.change} vs last month</span>
                </div>
                <div className={`rounded-lg p-2.5 ${stat.bg}`}>
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      <Card padding="lg">
        <h2 className="text-lg font-semibold text-navy-900 mb-6">Monthly Performance</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-6 text-sm text-navy-500 mb-4">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded bg-primary-500" /> Views
            </div>
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded bg-gold-400" /> Leads
            </div>
          </div>
          {monthlyData.map((data) => (
            <div key={data.month} className="flex items-center gap-4">
              <span className="w-10 text-xs font-medium text-navy-500">{data.month}</span>
              <div className="flex-1 space-y-1.5">
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-3 bg-navy-100 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(data.views / maxViews) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                      className="h-full bg-primary-500"
                    />
                  </div>
                  <span className="text-xs text-navy-600 w-12 text-right">{data.views}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-navy-100 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(data.leads / maxLeads) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                      className="h-full bg-gold-400"
                    />
                  </div>
                  <span className="text-xs text-navy-600 w-12 text-right">{data.leads}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid gap-6 sm:grid-cols-2">
        <Card padding="md">
          <div className="flex items-center gap-3 mb-4">
            <div className="rounded-lg bg-blue-50 p-2.5"><Users className="h-5 w-5 text-blue-600" /></div>
            <div>
              <h3 className="text-sm font-semibold text-navy-900">Top Performing Areas</h3>
              <p className="text-xs text-navy-500">By number of views</p>
            </div>
          </div>
          <div className="space-y-3">
            {[
              { area: 'Gomti Nagar', views: 4800 },
              { area: 'Indira Nagar', views: 3600 },
              { area: 'Shaheed Path', views: 2900 },
              { area: 'Hazratganj', views: 2100 },
              { area: 'Aliganj', views: 1500 },
            ].map((item, i) => (
              <div key={item.area} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-navy-300 w-4">{i + 1}</span>
                  <span className="text-navy-700">{item.area}</span>
                </div>
                <span className="font-medium text-navy-900">{item.views.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card padding="md">
          <div className="flex items-center gap-3 mb-4">
            <div className="rounded-lg bg-green-50 p-2.5"><DollarSign className="h-5 w-5 text-green-600" /></div>
            <div>
              <h3 className="text-sm font-semibold text-navy-900">Revenue Summary</h3>
              <p className="text-xs text-navy-500">Monthly revenue breakdown</p>
            </div>
          </div>
          <div className="space-y-3">
            {[
              { label: 'Premium Subscriptions', amount: '₹84,000' },
              { label: 'Featured Listings', amount: '₹45,000' },
              { label: 'Verification Fees', amount: '₹18,000' },
              { label: 'Other Income', amount: '₹12,000' },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between text-sm">
                <span className="text-navy-700">{item.label}</span>
                <span className="font-medium text-navy-900">{item.amount}</span>
              </div>
            ))}
            <div className="pt-3 border-t border-navy-100 flex items-center justify-between text-sm font-bold">
              <span className="text-navy-900">Total (MTD)</span>
              <span className="text-primary-500">₹1,59,000</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
