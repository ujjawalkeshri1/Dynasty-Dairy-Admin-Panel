import { User, Mail, Phone, MapPin, Calendar, Shield, Edit } from 'lucide-react';
import { Button } from '../components/ui/button';
interface ProfileProps {
  onNavigateToEdit: () => void; 
}
export function Profile({ onNavigateToEdit }: ProfileProps) {
  return (
    <div className="p-6">
      {/* Profile Header */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-6">
            <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-4xl">SR</span>
            </div>
            <div>
              <h2 className="text-gray-900 mb-1">Suresh Rao</h2>
              <p className="text-gray-600 mb-4">Super Admin</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>suresh.rao@dynasty.com</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>+91 98765 00001</span>
                </div>
              </div>
            </div>
          </div>
          <Button variant="outline" className="border-gray-300" onClick={onNavigateToEdit}>
            <Edit className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Personal Information */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-gray-900 mb-4">Personal Information</h3>
          <div className="space-y-4">
            <div>
              <label className="text-gray-600 block mb-1">Full Name</label>
              <div className="text-gray-900">Suresh Rao</div>
            </div>
            <div>
              <label className="text-gray-600 block mb-1">Email Address</label>
              <div className="text-gray-900">suresh.rao@dynasty.com</div>
            </div>
            <div>
              <label className="text-gray-600 block mb-1">Phone Number</label>
              <div className="text-gray-900">+91 98765 00001</div>
            </div>
            <div>
              <label className="text-gray-600 block mb-1">Location</label>
              <div className="flex items-center gap-2 text-gray-900">
                <MapPin className="w-4 h-4" />
                <span>Mumbai, Maharashtra</span>
              </div>
            </div>
            <div>
              <label className="text-gray-600 block mb-1">Date Joined</label>
              <div className="flex items-center gap-2 text-gray-900">
                <Calendar className="w-4 h-4" />
                <span>January 15, 2023</span>
              </div>
            </div>
          </div>
        </div>

        {/* Account Information */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-gray-900 mb-4">Account Information</h3>
          <div className="space-y-4">
            <div>
              <label className="text-gray-600 block mb-1">User ID</label>
              <div className="text-gray-900">ADMIN-001</div>
            </div>
            <div>
              <label className="text-gray-600 block mb-1">Role</label>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-blue-600" />
                <span className="text-gray-900">Super Admin</span>
              </div>
            </div>
            <div>
              <label className="text-gray-600 block mb-1">Department</label>
              <div className="text-gray-900">Operations & Management</div>
            </div>
            <div>
              <label className="text-gray-600 block mb-1">Status</label>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Active</span>
              </div>
            </div>
            <div>
              <label className="text-gray-600 block mb-1">Last Login</label>
              <div className="text-gray-900">Oct 3, 2025 at 9:30 AM</div>
            </div>
          </div>
        </div>

        {/* Permissions */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-gray-900 mb-4">Permissions & Access</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700">Dashboard Access</span>
              <span className="text-green-600">✓ Granted</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700">Product Management</span>
              <span className="text-green-600">✓ Granted</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700">Order Management</span>
              <span className="text-green-600">✓ Granted</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700">Customer Management</span>
              <span className="text-green-600">✓ Granted</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700">Financial Access</span>
              <span className="text-green-600">✓ Granted</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700">System Settings</span>
              <span className="text-green-600">✓ Granted</span>
            </div>
          </div>
        </div>

        {/* Activity Summary */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-gray-900 mb-4">Activity Summary</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Total Sessions</span>
              <span className="text-gray-900">1,247</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Products Created</span>
              <span className="text-gray-900">156</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Orders Processed</span>
              <span className="text-gray-900">3,892</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Customers Managed</span>
              <span className="text-gray-900">2,145</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Promotions Created</span>
              <span className="text-gray-900">48</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Average Login Time</span>
              <span className="text-gray-900">4.5 hrs/day</span>
            </div>
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mt-6">
        <h3 className="text-gray-900 mb-4">Security Settings</h3>
        <div className="grid grid-cols-3 gap-4">
          <Button variant="outline" className="border-gray-300">
            Change Password
          </Button>
          <Button variant="outline" className="border-gray-300">
            Two-Factor Authentication
          </Button>
          <Button variant="outline" className="border-gray-300">
            Login History
          </Button>
        </div>
      </div>
    </div>
  );
}
