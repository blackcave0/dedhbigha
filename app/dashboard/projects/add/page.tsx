'use client'

import { useState } from 'react'
import { ArrowLeft, Save } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'

export default function AddProjectPage() {
  const [name, setName] = useState('')
  const [location, setLocation] = useState('')
  const [units, setUnits] = useState('')
  const [description, setDescription] = useState('')
  const [saving, setSaving] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    await new Promise((r) => setTimeout(r, 1000))
    setSaving(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/projects" className="flex h-8 w-8 items-center justify-center rounded-lg border border-navy-200 text-navy-500 hover:bg-navy-50 transition-colors">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Add New Project</h1>
          <p className="text-sm text-navy-500">Create a new construction or development project</p>
        </div>
      </div>

      <Card padding="lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Input label="Project Name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Green Valley Township" required />
            </div>
            <Input label="Location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g., Shaheed Path, Lucknow" required />
            <Input label="Total Units" type="number" value={units} onChange={(e) => setUnits(e.target.value)} placeholder="e.g., 120" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
            <textarea
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-navy-200 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 resize-none"
              placeholder="Describe your project..."
            />
          </div>
          <div className="flex justify-end gap-3">
            <Link href="/dashboard/projects"><Button variant="outline" type="button">Cancel</Button></Link>
            <Button type="submit" loading={saving} leftIcon={<Save className="h-4 w-4" />}>Create Project</Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
