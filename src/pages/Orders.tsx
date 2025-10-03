import { Eye, Filter } from 'lucide-react';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';

interface Order {
  id: string;
  customerName: string;
  orderDate: string;
  totalAmount: number;
  status: 'processing' | 'out-for-delivery' | 'delivered' | 'cancelled';
}

const orders: Order[] = [
  { id: 'ORD-1023', customerName: 'Rajesh Kumar', orderDate: 'Oct 3, 2025', totalAmount: 285.50, status: 'out-for-delivery' },
  { id: 'ORD-1024', customerName: 'Priya Sharma', orderDate: 'Oct 3, 2025', totalAmount: 125.00, status: 'processing' },
  { id: 'ORD-1025', customerName: 'Amit Patel', orderDate: 'Oct 3, 2025', totalAmount: 555.00, status: 'delivered' },
  { id: 'ORD-1026', customerName: 'Neha Desai', orderDate: 'Oct 3, 2025', totalAmount: 85.50, status: 'out-for-delivery' },
  { id: 'ORD-1027', customerName: 'Sanjay Reddy', orderDate: 'Oct 2, 2025', totalAmount: 465.00, status: 'delivered' },
  { id: 'ORD-1028', customerName: 'Lakshmi Iyer', orderDate: 'Oct 2, 2025', totalAmount: 225.50, status: 'delivered' },
  { id: 'ORD-1029', customerName: 'Arjun Singh', orderDate: 'Oct 2, 2025', totalAmount: 115.00, status: 'cancelled' },
  { id: 'ORD-1030', customerName: 'Kavita Gupta', orderDate: 'Oct 3, 2025', totalAmount: 370.00, status: 'processing' },
  { id: 'ORD-1031', customerName: 'Vikram Malhotra', orderDate: 'Oct 3, 2025', totalAmount: 200.50, status: 'out-for-delivery' },
  { id: 'ORD-1032', customerName: 'Deepa Nair', orderDate: 'Oct 3, 2025', totalAmount: 275.00, status: 'processing' },
  { id: 'ORD-1033', customerName: 'Rohit Joshi', orderDate: 'Oct 1, 2025', totalAmount: 645.00, status: 'delivered' },
  { id: 'ORD-1034', customerName: 'Ananya Krishnan', orderDate: 'Oct 1, 2025', totalAmount: 175.50, status: 'delivered' },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'processing':
      return 'bg-blue-50 text-blue-700 border-blue-200';
    case 'out-for-delivery':
      return 'bg-yellow-50 text-yellow-700 border-yellow-200';
    case 'delivered':
      return 'bg-green-50 text-green-700 border-green-200';
    case 'cancelled':
      return 'bg-red-50 text-red-700 border-red-200';
    default:
      return 'bg-gray-50 text-gray-700 border-gray-200';
  }
};

const formatStatus = (status: string) => {
  return status.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
};

export function Orders() {
  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-gray-900 mb-1">Orders</h2>
          <p className="text-gray-500">Manage customer orders and deliveries</p>
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
                <th className="px-4 py-3 text-left text-gray-700">Order ID</th>
                <th className="px-4 py-3 text-left text-gray-700">Customer Name</th>
                <th className="px-4 py-3 text-left text-gray-700">Order Date</th>
                <th className="px-4 py-3 text-left text-gray-700">Total Amount</th>
                <th className="px-4 py-3 text-left text-gray-700">Status</th>
                <th className="px-4 py-3 text-left text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-600">{order.id}</td>
                  <td className="px-4 py-3 text-gray-900">{order.customerName}</td>
                  <td className="px-4 py-3 text-gray-700">{order.orderDate}</td>
                  <td className="px-4 py-3 text-gray-900">₹{order.totalAmount.toFixed(2)}</td>
                  <td className="px-4 py-3">
                    <Badge 
                      variant="outline" 
                      className={getStatusColor(order.status)}
                    >
                      {formatStatus(order.status)}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
                      <Eye className="w-4 h-4 text-gray-600" />
                    </button>
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
