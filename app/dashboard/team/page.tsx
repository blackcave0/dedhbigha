'use client'

import { useState, useMemo } from 'react'
import { Users, Plus, Phone, Mail, Search } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Select } from '@/components/ui/Select'

const team = [
  { id: '1', name: 'Amit Sharma', role: 'Project Manager', email: 'amit@builder.com', phone: '+91 98765 43210', status: 'ACTIVE', initial: 'AS' },
  { id: '2', name: 'Priya Verma', role: 'Site Engineer', email: 'priya@builder.com', phone: '+91 98765 43211', status: 'ACTIVE', initial: 'PV' },
  { id: '3', name: 'Rahul Singh', role: 'Sales Head', email: 'rahul@builder.com', phone: '+91 98765 43212', status: 'ACTIVE', initial: 'RS' },
  { id: '4', name: 'Neha Gupta', role: 'Architect', email: 'neha@builder.com', phone: '+91 98765 43213', status: 'INACTIVE', initial: 'NG' },
  { id: '5', name: 'Vikram Joshi', role: 'Interior Designer', email: 'vikram@builder.com', phone: '+91 98765 43214', status: 'ACTIVE', initial: 'VJ' },
  { id: '6', name: 'Sneha Kapoor', role: 'Legal Advisor', email: 'sneha@builder.com', phone: '+91 98765 43215', status: 'INACTIVE', initial: 'SK' },
]

const statusOptions = [
  { value: '', label: 'All Status' },
  { value: 'ACTIVE', label: 'Active' },
  { value: 'INACTIVE', label: 'Inactive' },
]

export default function TeamPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  const filtered = useMemo(() => {
    let result = [...team]
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter((m) => m.name.toLowerCase().includes(q) || m.role.toLowerCase().includes(q))
    }
    if (statusFilter) result = result.filter((m) => m.status === statusFilter)
    return result
  }, [search, statusFilter])

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Team</h1>
          <p className="text-sm text-navy-500">Manage your team members</p>
        </div>
        <Button leftIcon={<Plus className="h-4 w-4" />}>Add Member</Button>
      </div>

      <Card padding="md">
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="flex-1">
            <Input placeholder="Search team members..." leftIcon={<Search className="h-4 w-4" />} value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className="w-full sm:w-44">
            <Select options={statusOptions} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} />
          </div>
        </div>
      </Card>

      {filtered.length === 0 ? (
        <Card padding="lg">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Users className="h-10 w-10 text-navy-300 mb-3" />
            <h3 className="text-lg font-semibold text-navy-900 mb-1">No team members yet</h3>
            <p className="text-sm text-navy-500">Add members to your team to collaborate on projects.</p>
          </div>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {filtered.map((member) => (
            <Card key={member.id} padding="md" hoverable>
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-100 text-base font-bold text-primary-600">
                  {member.initial}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-sm font-semibold text-navy-900">{member.name}</h3>
                      <p className="text-xs text-navy-500">{member.role}</p>
                    </div>
                    <Badge variant={member.status === 'ACTIVE' ? 'success' : 'default'} size="sm">{member.status}</Badge>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <a href={`mailto:${member.email}`} className="flex items-center gap-1 text-xs text-navy-500 hover:text-primary-500 transition-colors">
                      <Mail className="h-3 w-3" /> Email
                    </a>
                    <a href={`tel:${member.phone}`} className="flex items-center gap-1 text-xs text-navy-500 hover:text-primary-500 transition-colors">
                      <Phone className="h-3 w-3" /> Call
                    </a>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
