import { Eye, Edit, Filter } from 'lucide-react';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';

interface Subscription {
  id: string;
  customerName: string;
  products: string;
  frequency: string;
  nextDelivery: string;
  status: 'active' | 'paused' | 'canceled';
}

const subscriptions: Subscription[] = [
  { id: 'SUB-001', customerName: 'Rajesh Kumar', products: 'Cow Milk (1L), Yogurt (400g)', frequency: 'Daily', nextDelivery: 'Oct 4, 2025', status: 'active' },
  { id: 'SUB-002', customerName: 'Priya Sharma', products: 'Buffalo Milk (500ml)', frequency: 'Daily', nextDelivery: 'Oct 4, 2025', status: 'active' },
  { id: 'SUB-003', customerName: 'Amit Patel', products: 'Paneer (200g), Ghee (1L)', frequency: 'Weekly', nextDelivery: 'Oct 7, 2025', status: 'active' },
  { id: 'SUB-004', customerName: 'Neha Desai', products: 'Cow Milk (500ml)', frequency: 'Daily', nextDelivery: 'Oct 4, 2025', status: 'paused' },
  { id: 'SUB-005', customerName: 'Sanjay Reddy', products: 'Greek Yogurt (200g), Paneer (500g)', frequency: 'Weekly', nextDelivery: 'Oct 8, 2025', status: 'active' },
  { id: 'SUB-006', customerName: 'Lakshmi Iyer', products: 'Cow Milk (1L)', frequency: 'Daily', nextDelivery: '-', status: 'canceled' },
  { id: 'SUB-007', customerName: 'Arjun Singh', products: 'Natural Yogurt (400g)', frequency: 'Daily', nextDelivery: 'Oct 4, 2025', status: 'active' },
  { id: 'SUB-008', customerName: 'Kavita Gupta', products: 'Buffalo Milk (500ml), Ghee (500ml)', frequency: 'Daily', nextDelivery: 'Oct 4, 2025', status: 'active' },
  { id: 'SUB-009', customerName: 'Vikram Malhotra', products: 'Mozzarella (250g)', frequency: 'Weekly', nextDelivery: 'Oct 9, 2025', status: 'paused' },
  { id: 'SUB-010', customerName: 'Deepa Nair', products: 'Cow Milk (500ml), Paneer (200g)', frequency: 'Daily', nextDelivery: 'Oct 4, 2025', status: 'active' },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'bg-green-50 text-green-700 border-green-200';
    case 'paused':
      return 'bg-yellow-50 text-yellow-700 border-yellow-200';
    case 'canceled':
      return 'bg-red-50 text-red-700 border-red-200';
    default:
      return 'bg-gray-50 text-gray-700 border-gray-200';
  }
};

export function Subscriptions() {
  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-gray-900 mb-1">Subscriptions</h2>
          <p className="text-gray-500">Manage customer subscriptions</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-gray-300">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-4 py-3 text-left text-gray-700">Customer ID</th>
                <th className="px-4 py-3 text-left text-gray-700">Customer Name</th>
                <th className="px-4 py-3 text-left text-gray-700">Subscribed Products</th>
                <th className="px-4 py-3 text-left text-gray-700">Frequency</th>
                <th className="px-4 py-3 text-left text-gray-700">Next Delivery</th>
                <th className="px-4 py-3 text-left text-gray-700">Status</th>
                <th className="px-4 py-3 text-left text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {subscriptions.map((subscription) => (
                <tr key={subscription.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-600">{subscription.id}</td>
                  <td className="px-4 py-3 text-gray-900">{subscription.customerName}</td>
                  <td className="px-4 py-3 text-gray-700">{subscription.products}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded">
                      {subscription.frequency}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-900">{subscription.nextDelivery}</td>
                  <td className="px-4 py-3">
                    <Badge 
                      variant="outline" 
                      className={getStatusColor(subscription.status)}
                    >
                      {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
                        <Eye className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
                        <Edit className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
