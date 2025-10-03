import { LayoutDashboard, Package, Repeat, ShoppingCart, Tag, Users, MapPin, CreditCard, Settings, LogOut } from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  onLogout: () => void;
}

export function Sidebar({ currentPage, onPageChange, onLogout }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', label: 'Product Management', icon: Package },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'subscriptions', label: 'Subscriptions', icon: Repeat },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'hubs', label: 'Hub Management', icon: MapPin },
    { id: 'transactions', label: 'Transactions', icon: CreditCard },
    { id: 'promotions', label: 'Promotions', icon: Tag },
  ];

  return (
    <div className="w-[250px] h-screen bg-white border-r border-border flex flex-col fixed left-0 top-0">
      {/* Logo */}
      <div className="p-4 border-b border-border flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white">D</span>
          </div>
          <span className="text-gray-900">Dynasty Dairy</span>
        </div>
      </div>

      {/* Scrollable Navigation */}
      <div className="flex-1 overflow-y-auto">
        <nav className="p-4">
          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onPageChange(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="p-4 border-t border-border flex-shrink-0">
        <button 
          onClick={() => onPageChange('settings')}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
            currentPage === 'settings'
              ? 'bg-blue-50 text-blue-600'
              : 'text-gray-700 hover:bg-gray-50'
          }`}
        >
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </button>
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors mt-1"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
