'use client'

import { useState } from 'react'
import {
  User,
  Mail,
  Phone,
  Lock,
  Camera,
  Bell,
  Mail as MailIcon,
  MessageCircle,
  Eye,
  Save,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Skeleton } from '@/components/ui/Skeleton'
import { useAuth } from '@/store/auth'
import { useProfile } from '@/lib/hooks'
import { cn } from '@/lib/utils'

interface ToggleSwitchProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label: string
  description?: string
}

function ToggleSwitch({ checked, onChange, label, description }: ToggleSwitchProps) {
  return (
    <div className="flex items-center justify-between py-3">
      <div>
        <p className="text-sm font-medium text-navy-900">{label}</p>
        {description && (
          <p className="text-xs text-navy-500">{description}</p>
        )}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
          checked ? 'bg-primary-500' : 'bg-navy-200',
        )}
      >
        <span
          className={cn(
            'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200',
            checked ? 'translate-x-5' : 'translate-x-0',
          )}
        />
      </button>
    </div>
  )
}

export default function SettingsPage() {
  const { user } = useAuth()
  const { data: profile, isLoading } = useProfile()

  const [name, setName] = useState(user?.name ?? '')
  const [email, setEmail] = useState(user?.email ?? '')
  const [phone, setPhone] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [saving, setSaving] = useState(false)

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    smsAlerts: false,
    leadNotifications: true,
    marketingEmails: false,
    propertyViews: true,
  })

  const handleSaveProfile = async () => {
    setSaving(true)
    // TODO: implement profile update mutation
    await new Promise((r) => setTimeout(r, 1000))
    setSaving(false)
  }

  const handleChangePassword = async () => {
    setSaving(true)
    // TODO: implement password change mutation
    await new Promise((r) => setTimeout(r, 1000))
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
    setSaving(false)
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Settings</h1>
          <p className="text-sm text-navy-500">Manage your account settings</p>
        </div>
        <Card padding="md">
          <div className="space-y-4">
            <Skeleton variant="circular" width={80} height={80} />
            <Skeleton variant="text" width="60%" />
            <Skeleton variant="text" width="40%" />
            <Skeleton variant="text" width="50%" />
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy-900">Settings</h1>
        <p className="text-sm text-navy-500">Manage your account settings</p>
      </div>

      <Card padding="lg">
        <h2 className="text-lg font-semibold text-navy-900 mb-6">Profile Information</h2>

        <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6 mb-8">
          <div className="relative">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary-100 text-2xl font-bold text-primary-600 overflow-hidden">
              {user?.avatar ? (
                <img src={user.avatar} alt="" className="h-full w-full object-cover" />
              ) : (
                user?.name?.charAt(0).toUpperCase() ?? 'U'
              )}
            </div>
            <button
              type="button"
              className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-primary-500 text-white shadow hover:bg-primary-600 transition-colors"
            >
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
          <Input
            label="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            leftIcon={<User className="h-4 w-4" />}
          />
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            leftIcon={<Mail className="h-4 w-4" />}
          />
          <Input
            label="Phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            leftIcon={<Phone className="h-4 w-4" />}
          />
        </div>

        <div className="mt-6 flex justify-end">
          <Button
            loading={saving}
            leftIcon={<Save className="h-4 w-4" />}
            onClick={handleSaveProfile}
          >
            Save Changes
          </Button>
        </div>
      </Card>

      <Card padding="lg">
        <h2 className="text-lg font-semibold text-navy-900 mb-6">Change Password</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <Input
            label="Current Password"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            leftIcon={<Lock className="h-4 w-4" />}
          />
          <Input
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            leftIcon={<Lock className="h-4 w-4" />}
          />
          <Input
            label="Confirm New Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            leftIcon={<Lock className="h-4 w-4" />}
          />
        </div>
        <div className="mt-6 flex justify-end">
          <Button
            variant="outline"
            loading={saving}
            onClick={handleChangePassword}
            disabled={!currentPassword || !newPassword || !confirmPassword}
          >
            Update Password
          </Button>
        </div>
      </Card>

      <Card padding="lg">
        <h2 className="text-lg font-semibold text-navy-900 mb-6">
          Notification Preferences
        </h2>
        <div className="divide-y divide-navy-100">
          <ToggleSwitch
            checked={notifications.emailAlerts}
            onChange={(v) => setNotifications((n) => ({ ...n, emailAlerts: v }))}
            label="Email Alerts"
            description="Receive email notifications for important updates"
          />
          <ToggleSwitch
            checked={notifications.smsAlerts}
            onChange={(v) => setNotifications((n) => ({ ...n, smsAlerts: v }))}
            label="SMS Alerts"
            description="Get text messages for urgent notifications"
          />
          <ToggleSwitch
            checked={notifications.leadNotifications}
            onChange={(v) => setNotifications((n) => ({ ...n, leadNotifications: v }))}
            label="Lead Notifications"
            description="Get notified when you receive a new lead"
          />
          <ToggleSwitch
            checked={notifications.marketingEmails}
            onChange={(v) => setNotifications((n) => ({ ...n, marketingEmails: v }))}
            label="Marketing Emails"
            description="Receive promotional offers and updates"
          />
          <ToggleSwitch
            checked={notifications.propertyViews}
            onChange={(v) => setNotifications((n) => ({ ...n, propertyViews: v }))}
            label="Property View Alerts"
            description="Get notified when your properties get views"
          />
        </div>
      </Card>
    </div>
  )
}
