'use client'

import { useState } from 'react'
import { User, Mail, Phone, Camera, MapPin, Save } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { useAuth } from '@/store/auth'

export default function ProfilePage() {
  const { user } = useAuth()
  const [name, setName] = useState(user?.name ?? '')
  const [email, setEmail] = useState(user?.email ?? '')
  const [phone, setPhone] = useState('')
  const [location, setLocation] = useState('')
  const [bio, setBio] = useState('')
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    await new Promise((r) => setTimeout(r, 1000))
    setSaving(false)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy-900">Profile</h1>
        <p className="text-sm text-navy-500">Manage your public profile information</p>
      </div>

      <Card padding="lg">
        <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6 mb-8">
          <div className="relative">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary-100 text-3xl font-bold text-primary-600">
              {user?.name?.charAt(0).toUpperCase() ?? 'U'}
            </div>
            <button className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-primary-500 text-white shadow hover:bg-primary-600 transition-colors">
              <Camera className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="text-center sm:text-left">
            <p className="text-lg font-semibold text-navy-900">{user?.name ?? 'User'}</p>
            <p className="text-sm text-navy-500 capitalize">{user?.role?.toLowerCase() ?? 'Buyer'}</p>
            <p className="text-xs text-navy-400 mt-1">Click the camera icon to change photo</p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Full Name" value={name} onChange={(e) => setName(e.target.value)} leftIcon={<User className="h-4 w-4" />} />
          <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} leftIcon={<Mail className="h-4 w-4" />} />
          <Input label="Phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} leftIcon={<Phone className="h-4 w-4" />} />
          <Input label="Location" value={location} onChange={(e) => setLocation(e.target.value)} leftIcon={<MapPin className="h-4 w-4" />} />
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Bio</label>
          <textarea
            rows={4}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full border border-navy-200 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 resize-none"
            placeholder="Tell us a little about yourself..."
          />
        </div>

        <div className="mt-6 flex justify-end">
          <Button loading={saving} leftIcon={<Save className="h-4 w-4" />} onClick={handleSave}>Save Changes</Button>
        </div>
      </Card>
    </div>
  )
}
