'use client'

import { useState, useMemo } from 'react'
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Ban,
  CheckCircle,
  Users as UsersIcon,
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { Skeleton } from '@/components/ui/Skeleton'

const ITEMS_PER_PAGE = 10

interface User {
  id: string
  name: string
  email: string
  phone: string
  role: string
  status: 'ACTIVE' | 'BANNED'
  joinedAt: string
}

const mockUsers: User[] = [
  { id: '1', name: 'Rahul Sharma', email: 'rahul@example.com', phone: '+91 98765 43210', role: 'OWNER', status: 'ACTIVE', joinedAt: '2026-01-15' },
  { id: '2', name: 'Priya Patel', email: 'priya@example.com', phone: '+91 98765 43211', role: 'BUYER', status: 'ACTIVE', joinedAt: '2026-02-20' },
  { id: '3', name: 'Amit Kumar', email: 'amit@example.com', phone: '+91 98765 43212', role: 'DEALER', status: 'ACTIVE', joinedAt: '2026-03-10' },
  { id: '4', name: 'Sneha Reddy', email: 'sneha@example.com', phone: '+91 98765 43213', role: 'BUILDER', status: 'BANNED', joinedAt: '2026-03-22' },
  { id: '5', name: 'Vikram Singh', email: 'vikram@example.com', phone: '+91 98765 43214', role: 'BUYER', status: 'ACTIVE', joinedAt: '2026-04-01' },
  { id: '6', name: 'Ananya Gupta', email: 'ananya@example.com', phone: '+91 98765 43215', role: 'OWNER', status: 'ACTIVE', joinedAt: '2026-04-15' },
  { id: '7', name: 'Rohit Verma', email: 'rohit@example.com', phone: '+91 98765 43216', role: 'DEALER', status: 'BANNED', joinedAt: '2026-04-20' },
  { id: '8', name: 'Neha Joshi', email: 'neha@example.com', phone: '+91 98765 43217', role: 'BUILDER', status: 'ACTIVE', joinedAt: '2026-05-01' },
  { id: '9', name: 'Deepak Nair', email: 'deepak@example.com', phone: '+91 98765 43218', role: 'BUYER', status: 'ACTIVE', joinedAt: '2026-05-10' },
  { id: '10', name: 'Kavita Desai', email: 'kavita@example.com', phone: '+91 98765 43219', role: 'OWNER', status: 'ACTIVE', joinedAt: '2026-05-15' },
]

const roleOptions = [
  { value: '', label: 'All Roles' },
  { value: 'BUYER', label: 'Buyer' },
  { value: 'OWNER', label: 'Owner' },
  { value: 'DEALER', label: 'Dealer' },
  { value: 'BUILDER', label: 'Builder' },
  { value: 'ADMIN', label: 'Admin' },
]

export default function AdminUsersPage() {
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('')
  const [page, setPage] = useState(1)
  const [banTarget, setBanTarget] = useState<User | null>(null)
  const [users, setUsers] = useState(mockUsers)

  const filtered = useMemo(() => {
    let result = [...users]
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(
        (u) =>
          u.name.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q) ||
          u.phone.includes(q),
      )
    }
    if (roleFilter) result = result.filter((u) => u.role === roleFilter)
    return result
  }, [users, search, roleFilter])

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  const toggleBan = (user: User) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === user.id
          ? { ...u, status: u.status === 'ACTIVE' ? 'BANNED' : 'ACTIVE' }
          : u,
      ),
    )
    setBanTarget(null)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy-900">User Management</h1>
        <p className="text-sm text-navy-500">Manage all platform users</p>
      </div>

      <Card padding="md">
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="flex-1">
            <Input
              placeholder="Search users..."
              leftIcon={<Search className="h-4 w-4" />}
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1) }}
            />
          </div>
          <div className="w-full sm:w-44">
            <Select
              options={roleOptions}
              value={roleFilter}
              onChange={(e) => { setRoleFilter(e.target.value); setPage(1) }}
            />
          </div>
        </div>
      </Card>

      <Card padding="none">
        {paginated.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="rounded-full bg-navy-100 p-4 mb-4">
              <UsersIcon className="h-8 w-8 text-navy-400" />
            </div>
            <h3 className="text-lg font-semibold text-navy-900 mb-1">No users found</h3>
            <p className="text-sm text-navy-500">Try adjusting your search or filters</p>
          </div>
        ) : (
          <>
            <div className="hidden md:block">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-navy-100 text-left text-xs font-semibold uppercase text-navy-500">
                    <th className="px-4 py-3">User</th>
                    <th className="px-4 py-3">Role</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Joined</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-navy-100">
                  {paginated.map((user) => (
                    <tr key={user.id} className="hover:bg-navy-50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-100 text-sm font-semibold text-primary-600">
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-navy-900">{user.name}</p>
                            <p className="text-xs text-navy-400">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant="default" size="sm">
                          {user.role}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <Badge
                          variant={user.status === 'ACTIVE' ? 'success' : 'danger'}
                          size="sm"
                        >
                          {user.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-sm text-navy-500">
                        {new Date(user.joinedAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Button
                          variant={user.status === 'BANNED' ? 'outline' : 'danger'}
                          size="sm"
                          leftIcon={
                            user.status === 'BANNED' ? (
                              <CheckCircle className="h-3.5 w-3.5" />
                            ) : (
                              <Ban className="h-3.5 w-3.5" />
                            )
                          }
                          onClick={() => setBanTarget(user)}
                        >
                          {user.status === 'BANNED' ? 'Activate' : 'Ban'}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="divide-y divide-navy-100 md:hidden">
              {paginated.map((user) => (
                <div key={user.id} className="p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-100 text-sm font-semibold text-primary-600">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-navy-900">{user.name}</p>
                        <p className="text-xs text-navy-400">{user.email}</p>
                      </div>
                    </div>
                    <Badge variant={user.status === 'ACTIVE' ? 'success' : 'danger'} size="sm">
                      {user.status}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-navy-500">
                      <Badge variant="default" size="sm">{user.role}</Badge>
                      <span>{new Date(user.joinedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
                    </div>
                    <Button
                      variant={user.status === 'BANNED' ? 'outline' : 'danger'}
                      size="sm"
                      leftIcon={
                        user.status === 'BANNED' ? (
                          <CheckCircle className="h-3.5 w-3.5" />
                        ) : (
                          <Ban className="h-3.5 w-3.5" />
                        )
                      }
                      onClick={() => setBanTarget(user)}
                    >
                      {user.status === 'BANNED' ? 'Activate' : 'Ban'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-between border-t border-navy-100 px-4 py-3">
                <p className="text-sm text-navy-500">Page {page} of {totalPages}</p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page <= 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    leftIcon={<ChevronLeft className="h-4 w-4" />}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page >= totalPages}
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    rightIcon={<ChevronRight className="h-4 w-4" />}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </Card>

      <Modal
        isOpen={!!banTarget}
        onClose={() => setBanTarget(null)}
        title={banTarget?.status === 'BANNED' ? 'Activate User' : 'Ban User'}
        size="sm"
      >
        <p className="text-sm text-navy-600 mb-4">
          {banTarget?.status === 'BANNED'
            ? `Are you sure you want to activate "${banTarget?.name}"? They will regain access to the platform.`
            : `Are you sure you want to ban "${banTarget?.name}"? They will lose access to the platform.`}
        </p>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => setBanTarget(null)}>
            Cancel
          </Button>
          <Button
            variant={banTarget?.status === 'BANNED' ? 'primary' : 'danger'}
            onClick={() => banTarget && toggleBan(banTarget)}
          >
            {banTarget?.status === 'BANNED' ? 'Activate' : 'Ban'}
          </Button>
        </div>
      </Modal>
    </div>
  )
}
