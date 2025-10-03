import { useTheme } from 'next-themes'; 
import { Save, Bell, Shield, Palette, Globe, Mail, Smartphone } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Switch } from '../components/ui/switch';
import { Separator } from '../components/ui/separator';

export function Settings() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="p-6 max-w-4xl">
      <div className="mb-6">
        <h2 className="text-gray-900 mb-1">Settings</h2>
        <p className="text-gray-500">Manage your account and application preferences</p>
      </div>

      <div className="space-y-6">
        {/* General Settings */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <Globe className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-gray-900">General Settings</h3>
              <p className="text-gray-500">Basic application settings</p>
            </div>
          </div>
          <Separator className="mb-4" />
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="businessName">Business Name</Label>
                <Input
                  id="businessName"
                  defaultValue="Dynasty Dairy"
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="timezone">Timezone</Label>
                <Input
                  id="timezone"
                  defaultValue="Asia/Kolkata (IST)"
                  className="mt-1.5"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="currency">Currency</Label>
                <Input
                  id="currency"
                  defaultValue="INR (₹)"
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="language">Language</Label>
                <Input
                  id="language"
                  defaultValue="English"
                  className="mt-1.5"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
              <Bell className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h3 className="text-gray-900">Notification Settings</h3>
              <p className="text-gray-500">Manage your notification preferences</p>
            </div>
          </div>
          <Separator className="mb-4" />
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-900">New Orders</p>
                <p className="text-gray-500">Get notified when new orders are placed</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-900">Delivery Updates</p>
                <p className="text-gray-500">Receive updates on delivery status</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-900">Payment Notifications</p>
                <p className="text-gray-500">Alert for successful and failed payments</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-900">Low Stock Alerts</p>
                <p className="text-gray-500">Get notified when stock is running low</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-900">Customer Messages</p>
                <p className="text-gray-500">Notifications for customer inquiries</p>
              </div>
              <Switch />
            </div>
          </div>
        </div>

        {/* Email & SMS Settings */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
              <Mail className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="text-gray-900">Email & SMS Settings</h3>
              <p className="text-gray-500">Configure email and SMS notifications</p>
            </div>
          </div>
          <Separator className="mb-4" />
          <div className="space-y-4">
            <div>
              <Label htmlFor="notificationEmail">Notification Email</Label>
              <Input
                id="notificationEmail"
                type="email"
                defaultValue="admin@dynasty.com"
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="notificationPhone">Notification Phone</Label>
              <Input
                id="notificationPhone"
                type="tel"
                defaultValue="+91 98765 43210"
                className="mt-1.5"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-900">Send Daily Summary Email</p>
                <p className="text-gray-500">Receive daily business summary via email</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-900">SMS Alerts</p>
                <p className="text-gray-500">Receive critical alerts via SMS</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h3 className="text-gray-900">Security Settings</h3>
              <p className="text-gray-500">Manage your account security</p>
            </div>
          </div>
          <Separator className="mb-4" />
          <div className="space-y-4">
            <div>
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input
                id="currentPassword"
                type="password"
                placeholder="••••••••"
                className="mt-1.5"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  placeholder="••••••••"
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  className="mt-1.5"
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-900">Two-Factor Authentication</p>
                <p className="text-gray-500">Add an extra layer of security</p>
              </div>
              <Switch />
            </div>
          </div>
        </div>

        {/* Appearance Settings */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
            <Palette className="w-5 h-5 text-orange-600" />
          </div>
          <div>
            <h3 className="text-gray-900">Appearance</h3>
            <p className="text-gray-500">Customize the look and feel</p>
          </div>
        </div>
        <Separator className="mb-4" />
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-900">Dark Mode</p>
              <p className="text-gray-500">Switch to dark theme</p>
            </div>
              <Switch
              checked={theme === 'dark'}
              onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-900">Compact View</p>
              <p className="text-gray-500">Reduce spacing for more content</p>
            </div>
            <Switch />
          </div>
        </div>
      </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Save className="w-4 h-4 mr-2" />
            Save All Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
