'use client';

import { useState } from 'react';
import { User, Bell, Palette, Shield, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

const tabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'billing', label: 'Billing', icon: CreditCard },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [name, setName] = useState('Demo User');
  const [email, setEmail] = useState('demo@browserforge.dev');

  return (
    <main className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold text-white mb-8">Settings</h1>

        <div className="flex gap-8">
          {/* Sidebar */}
          <nav className="w-48 flex-shrink-0">
            <div className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'bg-brand-600/20 text-brand-400'
                        : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </nav>

          {/* Content */}
          <div className="flex-1">
            {activeTab === 'profile' && (
              <Card>
                <CardHeader>
                  <h2 className="text-lg font-semibold text-white">Profile Settings</h2>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <Input
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <div className="pt-4">
                    <Button>Save Changes</Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'notifications' && (
              <Card>
                <CardHeader>
                  <h2 className="text-lg font-semibold text-white">Notification Preferences</h2>
                </CardHeader>
                <CardContent className="space-y-4">
                  <label className="flex items-center justify-between">
                    <span className="text-gray-300">Email notifications</span>
                    <input type="checkbox" defaultChecked className="w-5 h-5 rounded bg-gray-700 border-gray-600 text-brand-500 focus:ring-brand-500" />
                  </label>
                  <label className="flex items-center justify-between">
                    <span className="text-gray-300">Export complete alerts</span>
                    <input type="checkbox" defaultChecked className="w-5 h-5 rounded bg-gray-700 border-gray-600 text-brand-500 focus:ring-brand-500" />
                  </label>
                  <label className="flex items-center justify-between">
                    <span className="text-gray-300">Marketing emails</span>
                    <input type="checkbox" className="w-5 h-5 rounded bg-gray-700 border-gray-600 text-brand-500 focus:ring-brand-500" />
                  </label>
                </CardContent>
              </Card>
            )}

            {activeTab === 'appearance' && (
              <Card>
                <CardHeader>
                  <h2 className="text-lg font-semibold text-white">Appearance</h2>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-gray-300 text-sm font-medium">Theme</label>
                    <div className="mt-2 flex gap-3">
                      <button className="px-4 py-2 bg-gray-800 border border-brand-500 rounded-lg text-white text-sm">
                        Dark
                      </button>
                      <button className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-400 text-sm hover:border-gray-600">
                        Light
                      </button>
                      <button className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-400 text-sm hover:border-gray-600">
                        System
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'security' && (
              <Card>
                <CardHeader>
                  <h2 className="text-lg font-semibold text-white">Security</h2>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="secondary">Change Password</Button>
                  <Button variant="danger">Delete Account</Button>
                </CardContent>
              </Card>
            )}

            {activeTab === 'billing' && (
              <Card>
                <CardHeader>
                  <h2 className="text-lg font-semibold text-white">Billing</h2>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">Billing features coming soon.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
