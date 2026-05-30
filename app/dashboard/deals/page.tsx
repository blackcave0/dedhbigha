'use client'

import { useState, useMemo } from 'react'
import { Handshake, Plus, Phone, Mail, ArrowRight, Search } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'

const stages = [
  { id: 'lead', label: 'Lead', color: 'bg-blue-100 text-blue-700' },
  { id: 'meeting', label: 'Meeting', color: 'bg-amber-100 text-amber-700' },
  { id: 'negotiation', label: 'Negotiation', color: 'bg-purple-100 text-purple-700' },
  { id: 'closed', label: 'Closed', color: 'bg-green-100 text-green-700' },
]

const deals = [
  { id: '1', title: '3BHK - Gomti Nagar', client: 'Rahul Sharma', value: '₹85L', stage: 'lead', date: '28 May' },
  { id: '2', title: 'Villa - Shaheed Path', client: 'Priya Patel', value: '₹2.5Cr', stage: 'meeting', date: '25 May' },
  { id: '3', title: 'Commercial - Hazratganj', client: 'Amit Verma', value: '₹4.5Cr', stage: 'negotiation', date: '20 May' },
  { id: '4', title: 'Plot - Indira Nagar', client: 'Sneha Gupta', value: '₹45L', stage: 'closed', date: '15 May' },
  { id: '5', title: '2BHK - Aliganj', client: 'Vikram Singh', value: '₹55L', stage: 'lead', date: '27 May' },
  { id: '6', title: 'Penthouse - Gomti Nagar', client: 'Neha Kapoor', value: '₹3.2Cr', stage: 'meeting', date: '22 May' },
  { id: '7', title: 'Shop - Hazratganj', client: 'Rohit Joshi', value: '₹1.8Cr', stage: 'negotiation', date: '18 May' },
  { id: '8', title: 'Duplex - Shaheed Path', client: 'Ananya Singh', value: '₹1.2Cr', stage: 'lead', date: '26 May' },
]

const stageOptions = [
  { value: '', label: 'All Stages' },
  ...stages.map((s) => ({ value: s.id, label: s.label })),
]

export default function DealsPage() {
  const [search, setSearch] = useState('')
  const [stageFilter, setStageFilter] = useState('')

  const filtered = useMemo(() => {
    let result = [...deals]
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter((d) => d.title.toLowerCase().includes(q) || d.client.toLowerCase().includes(q))
    }
    if (stageFilter) result = result.filter((d) => d.stage === stageFilter)
    return result
  }, [search, stageFilter])

  const getStageDeals = (stageId: string) => filtered.filter((d) => d.stage === stageId)

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Deals</h1>
          <p className="text-sm text-navy-500">Track your deal pipeline</p>
        </div>
        <Button leftIcon={<Plus className="h-4 w-4" />}>New Deal</Button>
      </div>

      <Card padding="md">
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="flex-1">
            <Input
              placeholder="Search deals..."
              leftIcon={<Search className="h-4 w-4" />}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="w-full sm:w-44">
            <Select
              options={stageOptions}
              value={stageFilter}
              onChange={(e) => setStageFilter(e.target.value)}
            />
          </div>
        </div>
      </Card>

      <div className="space-y-6">
        {stages.map((stage) => {
          const stageDeals = getStageDeals(stage.id)
          return (
            <Card key={stage.id} padding="md">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-semibold px-2.5 py-1 ${stage.color}`}>{stage.label}</span>
                  <span className="text-sm text-navy-400">({stageDeals.length})</span>
                </div>
              </div>
              {stageDeals.length === 0 ? (
                <p className="text-sm text-navy-400 text-center py-6">No deals in this stage</p>
              ) : (
                <div className="space-y-3">
                  {stageDeals.map((deal) => (
                    <div key={deal.id} className="border border-navy-100 p-4 hover:border-primary-200 transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-sm font-semibold text-navy-900">{deal.title}</h3>
                          <p className="text-xs text-navy-500">{deal.client}</p>
                        </div>
                        <span className="text-sm font-bold text-primary-500">{deal.value}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-navy-400">{deal.date}</p>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm"><Phone className="h-3.5 w-3.5" /></Button>
                          <Button variant="ghost" size="sm"><Mail className="h-3.5 w-3.5" /></Button>
                          <Button variant="ghost" size="sm"><ArrowRight className="h-3.5 w-3.5" /></Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          )
        })}
      </div>
    </div>
  )
}
