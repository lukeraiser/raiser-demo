'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';

interface Message {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  avatar?: string;
  reactions?: { emoji: string; count: number }[];
  replies?: number;
}

interface Channel {
  id: string;
  name: string;
  type: 'channel' | 'direct';
  unread: number;
  isActive?: boolean;
  lastMessage?: string;
}

const mockChannels: Channel[] = [
  { id: '1', name: 'general', type: 'channel', unread: 3, isActive: true, lastMessage: 'New Arts Council funding round announced!' },
  { id: '2', name: 'grant-writing', type: 'channel', unread: 12, lastMessage: 'Anyone have experience with Heritage Lottery?' },
  { id: '3', name: 'success-stories', type: 'channel', unread: 5, lastMessage: 'Just secured £50k for youth program! 🎉' },
  { id: '4', name: 'funding-opportunities', type: 'channel', unread: 8, lastMessage: 'New environmental grant deadline approaching' },
  { id: '5', name: 'help-and-support', type: 'channel', unread: 0, lastMessage: 'How do I customize my dashboard?' },
  { id: '6', name: 'impact-reporting', type: 'channel', unread: 2, lastMessage: 'Tips for measuring social impact' },
];

const mockDirectMessages: Channel[] = [
  { id: 'dm1', name: 'Sarah Miller', type: 'direct', unread: 2, lastMessage: 'Thanks for the grant template!' },
  { id: 'dm2', name: 'James Wilson', type: 'direct', unread: 0, lastMessage: 'Let\'s connect about the arts project' },
  { id: 'dm3', name: 'Support Team', type: 'direct', unread: 1, lastMessage: 'Here\'s how to set up your profile' },
];

const mockMessages: Message[] = [
  {
    id: '1',
    author: 'Emily Parker',
    content: '🎉 Just submitted our Arts Council application! Happy to share tips on the process if anyone\'s interested.',
    timestamp: '11:45 AM',
    reactions: [
      { emoji: '🎉', count: 5 },
      { emoji: '👏', count: 3 }
    ],
    replies: 4
  },
  {
    id: '2',
    author: 'Michael Chen',
    content: 'That\'s fantastic! Would love to hear more about your approach. We\'re planning to apply next round.',
    timestamp: '11:48 AM',
    reactions: [
      { emoji: '💡', count: 2 }
    ],
    replies: 1
  },
  {
    id: '3',
    author: 'Sarah Miller',
    content: 'Here\'s a great template we used for our successful application last year: [Grant Template.docx]',
    timestamp: '11:52 AM',
    reactions: [
      { emoji: '🙏', count: 8 },
      { emoji: '⭐', count: 4 }
    ],
    replies: 2
  },
  {
    id: '4',
    author: 'Support Team',
    content: 'Quick reminder: We\'re hosting a grant writing workshop tomorrow at 2 PM! Join here: [Meeting Link]',
    timestamp: '12:01 PM',
    reactions: [
      { emoji: '📅', count: 12 }
    ],
    replies: 6
  }
];

export default function CommunityPage() {
  const [activeChannel, setActiveChannel] = useState('general');
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto mt-16 bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="flex h-[calc(100vh-8rem)]">
          {/* Left Sidebar - Updated with light theme */}
          <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
            {/* User Profile */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center">
                  <span className="text-sm font-medium text-white">JD</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">John Doe</h3>
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span className="text-xs text-gray-500">Active</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Channels */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="mb-6">
                <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">Channels</h4>
                {mockChannels.map((channel) => (
                  <button
                    key={channel.id}
                    onClick={() => setActiveChannel(channel.name)}
                    className={`w-full text-left px-3 py-2 rounded-lg mb-1 flex items-center justify-between transition-colors ${
                      channel.isActive 
                        ? 'bg-pink-50 text-pink-600' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400">#</span>
                      <span className="text-sm">{channel.name}</span>
                    </div>
                    {channel.unread > 0 && (
                      <span className="bg-pink-100 text-pink-600 text-xs px-2 py-1 rounded-full">
                        {channel.unread}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* Direct Messages */}
              <div>
                <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">Direct Messages</h4>
                {mockDirectMessages.map((dm) => (
                  <button
                    key={dm.id}
                    className={`w-full text-left px-3 py-2 rounded-lg mb-1 flex items-center justify-between transition-colors hover:bg-gray-50`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span className="text-sm text-gray-700">{dm.name}</span>
                    </div>
                    {dm.unread > 0 && (
                      <span className="bg-pink-100 text-pink-600 text-xs px-2 py-1 rounded-full">
                        {dm.unread}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Chat Area */}
          <div className="flex-1 flex flex-col">
            {/* Channel Header */}
            <div className="px-6 py-4 border-b flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <span>#</span>
                  <span>{activeChannel}</span>
                </h2>
                <p className="text-sm text-gray-500">
                  {mockChannels.find(c => c.name === activeChannel)?.lastMessage}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <button className="text-gray-500 hover:text-gray-700">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
                <button className="text-gray-500 hover:text-gray-700">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </button>
                <button className="text-gray-500 hover:text-gray-700">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {messages.map((message) => (
                <div key={message.id} className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-medium">{message.author[0]}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{message.author}</span>
                      <span className="text-xs text-gray-500">{message.timestamp}</span>
                    </div>
                    <p className="text-gray-800 mt-1">{message.content}</p>
                    {(message.reactions || message.replies) && (
                      <div className="flex items-center gap-3 mt-2">
                        {message.reactions?.map((reaction, index) => (
                          <button
                            key={index}
                            className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200"
                          >
                            <span>{reaction.emoji}</span>
                            <span>{reaction.count}</span>
                          </button>
                        ))}
                        {message.replies && (
                          <button className="text-sm text-gray-500 hover:text-gray-700">
                            {message.replies} replies
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="text-gray-400 hover:text-gray-600">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t">
              <div className="flex items-end gap-4">
                <div className="flex-1 bg-gray-100 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <button className="text-gray-500 hover:text-gray-700">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                      </svg>
                    </button>
                    <button 
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      😊
                    </button>
                  </div>
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder={`Message #${activeChannel}`}
                    className="w-full bg-transparent border-0 focus:ring-0 p-0 text-gray-800 placeholder-gray-400 resize-none"
                    rows={1}
                  />
                </div>
                <button className="bg-pink-600 text-white rounded-lg px-4 py-2 hover:bg-pink-700">
                  Send
                </button>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Thread/Details */}
          <div className="w-64 border-l bg-gray-50">
            <div className="p-4 border-b">
              <h3 className="font-semibold text-gray-700">Channel Details</h3>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">About</h4>
                  <p className="text-sm text-gray-600">
                    Share and discuss grant opportunities, writing tips, and success stories.
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Members</h4>
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-pink-600 border-2 border-white flex items-center justify-center">
                      <span className="text-xs text-white">JD</span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-blue-600 border-2 border-white flex items-center justify-center">
                      <span className="text-xs text-white">SM</span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-green-600 border-2 border-white flex items-center justify-center">
                      <span className="text-xs text-white">EP</span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center">
                      <span className="text-xs">+12</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Pinned Items</h4>
                  <div className="space-y-2">
                    <div className="text-sm text-gray-600 hover:text-gray-900 cursor-pointer">
                      📌 Grant Writing Guidelines
                    </div>
                    <div className="text-sm text-gray-600 hover:text-gray-900 cursor-pointer">
                      📌 Upcoming Deadlines
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 