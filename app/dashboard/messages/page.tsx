'use client'

import { useState } from 'react'
import {
  Search,
  Send,
  Phone,
  MoreVertical,
  ChevronLeft,
  MessageCircle,
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Skeleton } from '@/components/ui/Skeleton'
import { cn } from '@/lib/utils'

interface Message {
  id: string
  sender: 'me' | 'them'
  text: string
  time: string
}

interface Conversation {
  id: string
  name: string
  avatar: string
  lastMessage: string
  time: string
  unread: number
  online: boolean
  messages: Message[]
}

const conversations: Conversation[] = [
  {
    id: '1',
    name: 'Rahul Sharma',
    avatar: 'RS',
    lastMessage: 'Is the property still available?',
    time: '2 min ago',
    unread: 2,
    online: true,
    messages: [
      { id: 'm1', sender: 'them', text: 'Hi, I saw your listing for the 3BHK apartment.', time: '10:30 AM' },
      { id: 'm2', sender: 'them', text: 'Is the property still available?', time: '10:31 AM' },
      { id: 'm3', sender: 'me', text: 'Yes, it is still available! Would you like to schedule a visit?', time: '10:35 AM' },
      { id: 'm4', sender: 'them', text: 'That would be great. Can I come by this weekend?', time: '10:36 AM' },
    ],
  },
  {
    id: '2',
    name: 'Priya Patel',
    avatar: 'PP',
    lastMessage: 'Thank you for the information!',
    time: '1 hour ago',
    unread: 0,
    online: false,
    messages: [
      { id: 'm5', sender: 'them', text: 'Hello, I am interested in the villa.', time: '9:00 AM' },
      { id: 'm6', sender: 'me', text: 'Hi Priya! The villa is available for site visit.', time: '9:15 AM' },
      { id: 'm7', sender: 'them', text: 'Thank you for the information!', time: '9:20 AM' },
    ],
  },
  {
    id: '3',
    name: 'Amit Kumar',
    avatar: 'AK',
    lastMessage: 'Can you share more details?',
    time: '3 hours ago',
    unread: 1,
    online: false,
    messages: [
      { id: 'm8', sender: 'them', text: 'Can you share more details?', time: '6:00 AM' },
    ],
  },
]

export default function MessagesPage() {
  const [search, setSearch] = useState('')
  const [activeId, setActiveId] = useState<string | null>(null)
  const [newMessage, setNewMessage] = useState('')

  const filtered = conversations.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()),
  )

  const active = conversations.find((c) => c.id === activeId)

  const handleSend = () => {
    if (!newMessage.trim()) return
    // TODO: implement actual send
    setNewMessage('')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy-900">Messages</h1>
        <p className="text-sm text-navy-500">
          Chat with buyers and sellers
        </p>
      </div>

      <Card padding="none" className="flex h-[calc(100vh-200px)] min-h-[480px] overflow-hidden">
        {/* Conversation List */}
        <div
          className={cn(
            'flex w-full flex-col border-r border-navy-100 md:w-80 lg:w-96',
            activeId && 'hidden md:flex',
          )}
        >
          <div className="border-b border-navy-100 p-3">
            <Input
              placeholder="Search conversations..."
              leftIcon={<Search className="h-4 w-4" />}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-navy-100">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-4">
                <MessageCircle className="h-8 w-8 text-navy-300 mb-2" />
                <p className="text-sm text-navy-500">No conversations found</p>
              </div>
            ) : (
              filtered.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => setActiveId(conv.id)}
                  className={cn(
                    'flex w-full items-start gap-3 p-4 text-left transition-colors hover:bg-navy-50',
                    activeId === conv.id && 'bg-primary-50',
                  )}
                >
                  <div className="relative shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-sm font-semibold text-primary-600">
                      {conv.avatar}
                    </div>
                    {conv.online && (
                      <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-navy-900">{conv.name}</p>
                      <p className="text-xs text-navy-400 shrink-0">{conv.time}</p>
                    </div>
                    <p className="text-xs text-navy-500 truncate mt-0.5">
                      {conv.lastMessage}
                    </p>
                  </div>
                  {conv.unread > 0 && (
                    <Badge variant="info" size="sm">
                      {conv.unread}
                    </Badge>
                  )}
                </button>
              ))
            )}
          </div>
        </div>

        {/* Message Thread */}
        <div
          className={cn(
            'flex flex-1 flex-col',
            !activeId && 'hidden md:flex',
          )}
        >
          {active ? (
            <>
              <div className="flex items-center justify-between border-b border-navy-100 px-4 py-3">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setActiveId(null)}
                    className="flex items-center justify-center rounded-lg p-1 text-navy-500 hover:bg-navy-100 md:hidden"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-100 text-sm font-semibold text-primary-600">
                    {active.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-navy-900">{active.name}</p>
                    <p className="text-xs text-green-600">
                      {active.online ? 'Online' : 'Offline'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="sm" leftIcon={<Phone className="h-4 w-4" />}>
                    Call
                  </Button>
                  <Button variant="ghost" size="sm" leftIcon={<MoreVertical className="h-4 w-4" />} />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {active.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={cn(
                      'flex',
                      msg.sender === 'me' ? 'justify-end' : 'justify-start',
                    )}
                  >
                    <div
                      className={cn(
                        'max-w-[75%] rounded-xl px-4 py-2 text-sm',
                        msg.sender === 'me'
                          ? 'bg-primary-500 text-white rounded-br-sm'
                          : 'bg-navy-100 text-navy-900 rounded-bl-sm',
                      )}
                    >
                      <p>{msg.text}</p>
                      <p
                        className={cn(
                          'mt-1 text-xs',
                          msg.sender === 'me' ? 'text-primary-100' : 'text-navy-400',
                        )}
                      >
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-navy-100 p-4">
                <form
                  onSubmit={(e) => { e.preventDefault(); handleSend() }}
                  className="flex items-center gap-3"
                >
                  <Input
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    containerClassName="flex-1"
                  />
                  <Button
                    type="submit"
                    size="md"
                    leftIcon={<Send className="h-4 w-4" />}
                    disabled={!newMessage.trim()}
                  >
                    Send
                  </Button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
              <div className="rounded-full bg-primary-50 p-4 mb-4">
                <MessageCircle className="h-10 w-10 text-primary-400" />
              </div>
              <h3 className="text-lg font-semibold text-navy-900 mb-1">
                Select a conversation
              </h3>
              <p className="text-sm text-navy-500 max-w-xs">
                Choose a conversation from the left to start messaging
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
