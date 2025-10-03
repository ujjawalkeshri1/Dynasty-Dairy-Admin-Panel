import { Bell, Package, CreditCard, TruckIcon, X } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Badge } from './ui/badge';

interface Notification {
  id: string;
  type: 'order' | 'delivery' | 'transaction' | 'system';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const notifications: Notification[] = [
  { id: '1', type: 'transaction', title: 'Payment Received', message: 'Payment of ₹485.50 from Rajesh Kumar', time: '5 min ago', read: false },
  { id: '2', type: 'order', title: 'New Order', message: 'Order #ORD-1045 placed by Priya Sharma', time: '12 min ago', read: false },
  { id: '3', type: 'delivery', title: 'Delivery Completed', message: 'Order #ORD-1032 delivered successfully', time: '25 min ago', read: false },
  { id: '4', type: 'transaction', title: 'Refund Processed', message: 'Refund of ₹150.00 to Neha Desai', time: '1 hour ago', read: true },
  { id: '5', type: 'order', title: 'New Order', message: 'Order #ORD-1044 placed by Sanjay Reddy', time: '2 hours ago', read: true },
  { id: '6', type: 'delivery', title: 'Out for Delivery', message: '5 orders are out for delivery', time: '3 hours ago', read: true },
  { id: '7', type: 'transaction', title: 'Payment Failed', message: 'Payment of ₹225.50 from Arjun Singh failed', time: '4 hours ago', read: true },
];

export function NotificationsPopover() {
  const unreadCount = notifications.filter(n => !n.read).length;

  const getIcon = (type: string) => {
    switch (type) {
      case 'order':
        return <Package className="w-4 h-4" />;
      case 'delivery':
        return <TruckIcon className="w-4 h-4" />;
      case 'transaction':
        return <CreditCard className="w-4 h-4" />;
      default:
        return <Bell className="w-4 h-4" />;
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'order':
        return 'bg-blue-50 text-blue-600';
      case 'delivery':
        return 'bg-green-50 text-green-600';
      case 'transaction':
        return 'bg-purple-50 text-purple-600';
      default:
        return 'bg-gray-50 text-gray-600';
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="relative p-2 hover:bg-gray-50 rounded-lg transition-colors">
          <Bell className="w-5 h-5 text-gray-600" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0" align="end">
        <div className="border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-gray-900">Notifications</h3>
            {unreadCount > 0 && (
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                {unreadCount} new
              </Badge>
            )}
          </div>
        </div>
        <div className="max-h-[400px] overflow-y-auto">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                !notification.read ? 'bg-blue-50/30' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${getIconColor(notification.type)}`}>
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-gray-900">{notification.title}</p>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-1.5"></div>
                    )}
                  </div>
                  <p className="text-gray-600 mt-0.5">{notification.message}</p>
                  <p className="text-gray-500 mt-1">{notification.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-200 p-3">
          <button className="w-full text-center text-blue-600 hover:underline">
            View all notifications
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
