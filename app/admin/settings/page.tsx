'use client'

import { useState } from 'react'
import { Save, Globe, Mail, Bell, Shield, Eye, EyeOff, Key } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { cn } from '@/lib/utils'

function ToggleSwitch({ checked, onChange, label, description }: { checked: boolean; onChange: (v: boolean) => void; label: string; description?: string }) {
  return (
    <div className="flex items-center justify-between py-3">
      <div>
        <p className="text-sm font-medium text-white">{label}</p>
        {description && <p className="text-xs text-navy-400">{description}</p>}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200',
          checked ? 'bg-primary-500' : 'bg-navy-700',
        )}
      >
        <span className={cn('pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200', checked ? 'translate-x-5' : 'translate-x-0')} />
      </button>
    </div>
  )
}

export default function AdminSettingsPage() {
  const [siteName, setSiteName] = useState('DedhBigha')
  const [siteEmail, setSiteEmail] = useState('admin@dedhbigha.com')
  const [maintenanceMode, setMaintenanceMode] = useState(false)
  const [registrationOpen, setRegistrationOpen] = useState(true)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    await new Promise((r) => setTimeout(r, 1000))
    setSaving(false)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-sm text-navy-400">Manage platform configuration</p>
      </div>

      <Card padding="lg" className="bg-navy-900 border-navy-800">
        <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
          <Globe className="h-5 w-5 text-primary-400" /> General Settings
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Site Name" value={siteName} onChange={(e) => setSiteName(e.target.value)} containerClassName="[&_input]:bg-navy-800 [&_input]:border-navy-700 [&_input]:text-white [&_input]:placeholder:text-navy-500 [&_label]:text-navy-300" />
          <Input label="Admin Email" type="email" value={siteEmail} onChange={(e) => setSiteEmail(e.target.value)} containerClassName="[&_input]:bg-navy-800 [&_input]:border-navy-700 [&_input]:text-white [&_input]:placeholder:text-navy-500 [&_label]:text-navy-300" />
        </div>
      </Card>

      <Card padding="lg" className="bg-navy-900 border-navy-800">
        <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary-400" /> Platform Controls
        </h2>
        <div className="divide-y divide-navy-800">
          <ToggleSwitch
            checked={maintenanceMode}
            onChange={setMaintenanceMode}
            label="Maintenance Mode"
            description="When enabled, only admins can access the platform"
          />
          <ToggleSwitch
            checked={registrationOpen}
            onChange={setRegistrationOpen}
            label="Open Registration"
            description="Allow new users to register on the platform"
          />
        </div>
      </Card>

      <Card padding="lg" className="bg-navy-900 border-navy-800">
        <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
          <Bell className="h-5 w-5 text-primary-400" /> Notifications
        </h2>
        <div className="divide-y divide-navy-800">
          <ToggleSwitch
            checked={emailNotifications}
            onChange={setEmailNotifications}
            label="Email Notifications"
            description="Send email notifications for new registrations and reports"
          />
        </div>
      </Card>

      <div className="flex justify-end">
        <Button
          loading={saving}
          leftIcon={<Save className="h-4 w-4" />}
          onClick={handleSave}
        >
          Save Settings
        </Button>
      </div>
    </div>
  )
}
