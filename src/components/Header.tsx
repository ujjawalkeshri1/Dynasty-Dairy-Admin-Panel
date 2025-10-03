import { useState } from 'react';
import { Search, User, Settings, LogOut } from 'lucide-react';
import { NotificationsPopover } from './NotificationsPopover';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

interface HeaderProps {
  title: string;
  subtitle?: string;
  onNavigateToProfile: () => void;
  onNavigateToSettings: () => void;
  onLogout: () => void;
  onPageChange: (page: string) => void;
}

export function Header({ title, subtitle, onNavigateToProfile, onNavigateToSettings, onLogout, onPageChange }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const query = searchQuery.toLowerCase();
      if (query.includes('product') || query.includes('milk') || query.includes('paneer')) {
        onPageChange('products');
      } else if (query.includes('order')) {
        onPageChange('orders');
      } else if (query.includes('customer')) {
        onPageChange('customers');
      } else if (query.includes('subscription')) {
        onPageChange('subscriptions');
      }
      setSearchQuery('');
    }
  };
  return (
    <div className="h-[72px] bg-white border-b border-border fixed top-0 left-[250px] right-0 z-10">
      <div className="h-full px-6 flex items-center justify-between">
        <div>
          <h1 className="text-gray-900">{title}</h1>
          {subtitle && <p className="text-gray-500 mt-0.5">{subtitle}</p>}
        </div>

        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search orders, customers, menu items..."
              className="w-[400px] pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
            />
          </div>

          {/* Status Indicator */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-green-700">All Systems Operational</span>
          </div>

          {/* Notifications */}
          <NotificationsPopover />

          {/* User Profile Popover */}
          <Popover>
            <PopoverTrigger asChild>
              <button className="flex items-center gap-3 pl-4 border-l border-gray-200 hover:opacity-80 transition-opacity">
                <div className="text-right">
                  <p className="text-gray-900">Suresh Rao</p>
                  <p className="text-gray-500">Super Admin</p>
                </div>
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white">SR</span>
                </div>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-0" align="end">
              <div className="p-3 border-b border-gray-200">
                <p className="text-gray-900">Suresh Rao</p>
                <p className="text-gray-500">suresh.rao@dynasty.com</p>
              </div>
              <div className="p-2">
                <button
                  onClick={onNavigateToProfile}
                  className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span>View Profile</span>
                </button>
                <button
                  onClick={onNavigateToSettings}
                  className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </button>
                <div className="h-px bg-gray-200 my-2"></div>
                <button
                  onClick={onLogout}
                  className="w-full flex items-center gap-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
}