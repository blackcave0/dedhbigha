'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Plus, Search, MapPin, Building2, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Badge } from '@/components/ui/Badge'

const projects = [
  { id: '1', name: 'Green Valley Township', location: 'Shaheed Path', units: 120, status: 'ACTIVE', progress: 65, launchDate: 'Jan 2026' },
  { id: '2', name: 'Lakeview Apartments', location: 'Gomti Nagar Extension', units: 48, status: 'ACTIVE', progress: 30, launchDate: 'Mar 2026' },
  { id: '3', name: 'Royal Palm Villas', location: 'Indira Nagar', units: 24, status: 'COMING_SOON', progress: 0, launchDate: 'Jul 2026' },
  { id: '4', name: 'City Center Commercial', location: 'Hazratganj', units: 36, status: 'COMPLETED', progress: 100, launchDate: 'Jan 2025' },
  { id: '5', name: 'Riverside Heights', location: 'Shaheed Path', units: 72, status: 'ACTIVE', progress: 20, launchDate: 'Apr 2026' },
  { id: '6', name: 'Sector 15 Residency', location: 'Sultanpur Road', units: 96, status: 'COMING_SOON', progress: 0, launchDate: 'Sep 2026' },
]

const statusOptions = [
  { value: '', label: 'All Status' },
  { value: 'ACTIVE', label: 'Active' },
  { value: 'COMING_SOON', label: 'Coming Soon' },
  { value: 'COMPLETED', label: 'Completed' },
]

export default function ProjectsPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  const filtered = useMemo(() => {
    let result = [...projects]
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter((p) => p.name.toLowerCase().includes(q) || p.location.toLowerCase().includes(q))
    }
    if (statusFilter) result = result.filter((p) => p.status === statusFilter)
    return result
  }, [search, statusFilter])

  const statusBadge: Record<string, 'success' | 'info' | 'default'> = {
    ACTIVE: 'success',
    COMING_SOON: 'info',
    COMPLETED: 'default',
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">My Projects</h1>
          <p className="text-sm text-navy-500">Manage your construction and development projects</p>
        </div>
        <Link href="/dashboard/projects/add">
          <Button leftIcon={<Plus className="h-4 w-4" />}>Add New Project</Button>
        </Link>
      </div>

      <Card padding="md">
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="flex-1">
            <Input placeholder="Search projects..." leftIcon={<Search className="h-4 w-4" />} value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className="w-full sm:w-44">
            <Select options={statusOptions} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} />
          </div>
        </div>
      </Card>

      {filtered.length === 0 ? (
        <Card padding="lg">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Building2 className="h-10 w-10 text-navy-300 mb-3" />
            <h3 className="text-lg font-semibold text-navy-900 mb-1">No projects found</h3>
            <p className="text-sm text-navy-500">Projects will appear here once created.</p>
          </div>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {filtered.map((project) => (
            <Card key={project.id} padding="md" hoverable>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-base font-semibold text-navy-900">{project.name}</h3>
                  <div className="flex items-center gap-1 text-sm text-navy-500 mt-1">
                    <MapPin className="h-3.5 w-3.5" /> {project.location}
                  </div>
                </div>
                <Badge variant={statusBadge[project.status] ?? 'default'} size="sm">{project.status.replace('_', ' ')}</Badge>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                <div><span className="text-navy-500">Total Units:</span><p className="font-medium text-navy-900">{project.units}</p></div>
                <div><span className="text-navy-500">Launch:</span><p className="font-medium text-navy-900">{project.launchDate}</p></div>
              </div>
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-navy-500">Progress</span>
                  <span className="font-medium text-navy-700">{project.progress}%</span>
                </div>
                <div className="h-2 bg-navy-100 overflow-hidden">
                  <div className="h-full bg-primary-500 transition-all duration-500" style={{ width: `${project.progress}%` }} />
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-navy-100">
                <Link href={`/dashboard/projects/${project.id}`} className="inline-flex items-center gap-1 text-xs font-semibold text-primary-500 hover:text-primary-600 transition-colors">
                  View Details <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
