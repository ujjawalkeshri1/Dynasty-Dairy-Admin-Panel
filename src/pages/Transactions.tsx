import { Download, Filter, Search } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';

interface Transaction {
  id: string;
  date: string;
  time: string;
  customer: string;
  type: 'payment' | 'refund' | 'subscription';
  method: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
}

const transactions: Transaction[] = [
  { id: 'TXN-10234', date: 'Oct 3, 2025', time: '10:45 AM', customer: 'Rajesh Kumar', type: 'payment', method: 'UPI', amount: 485.50, status: 'completed' },
  { id: 'TXN-10235', date: 'Oct 3, 2025', time: '10:52 AM', customer: 'Priya Sharma', type: 'subscription', method: 'Credit Card', amount: 1200.00, status: 'completed' },
  { id: 'TXN-10236', date: 'Oct 3, 2025', time: '11:15 AM', customer: 'Amit Patel', type: 'payment', method: 'Debit Card', amount: 325.00, status: 'pending' },
  { id: 'TXN-10237', date: 'Oct 3, 2025', time: '11:28 AM', customer: 'Neha Desai', type: 'refund', method: 'UPI', amount: 150.00, status: 'completed' },
  { id: 'TXN-10238', date: 'Oct 3, 2025', time: '11:45 AM', customer: 'Sanjay Reddy', type: 'payment', method: 'UPI', amount: 675.00, status: 'completed' },
  { id: 'TXN-10239', date: 'Oct 3, 2025', time: '12:05 PM', customer: 'Lakshmi Iyer', type: 'subscription', method: 'Net Banking', amount: 2400.00, status: 'completed' },
  { id: 'TXN-10240', date: 'Oct 3, 2025', time: '12:20 PM', customer: 'Arjun Singh', type: 'payment', method: 'UPI', amount: 225.50, status: 'failed' },
  { id: 'TXN-10241', date: 'Oct 3, 2025', time: '12:35 PM', customer: 'Kavita Gupta', type: 'payment', method: 'Credit Card', amount: 890.00, status: 'completed' },
  { id: 'TXN-10242', date: 'Oct 2, 2025', time: '09:15 AM', customer: 'Vikram Malhotra', type: 'subscription', method: 'UPI', amount: 1800.00, status: 'completed' },
  { id: 'TXN-10243', date: 'Oct 2, 2025', time: '09:40 AM', customer: 'Deepa Nair', type: 'payment', method: 'Debit Card', amount: 425.00, status: 'completed' },
  { id: 'TXN-10244', date: 'Oct 2, 2025', time: '10:10 AM', customer: 'Rohit Joshi', type: 'payment', method: 'UPI', amount: 550.00, status: 'completed' },
  { id: 'TXN-10245', date: 'Oct 2, 2025', time: '10:45 AM', customer: 'Ananya Krishnan', type: 'refund', method: 'Credit Card', amount: 200.00, status: 'pending' },
];

export function Transactions() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'pending':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'failed':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'payment':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'subscription':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'refund':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const totalAmount = transactions.reduce((sum, txn) => 
    txn.status === 'completed' ? sum + txn.amount : sum, 0
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-gray-900 mb-1">Transactions</h2>
          <p className="text-gray-500">View and manage all payment transactions</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-gray-300">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" className="border-gray-300">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-gray-500 mb-1">Total Transactions</p>
          <p className="text-gray-900">{transactions.length.toLocaleString()}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-gray-500 mb-1">Completed</p>
          <p className="text-gray-900">
            {transactions.filter(t => t.status === 'completed').length}
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-gray-500 mb-1">Total Amount</p>
          <p className="text-gray-900">₹{totalAmount.toLocaleString()}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-gray-500 mb-1">Pending</p>
          <p className="text-gray-900">
            {transactions.filter(t => t.status === 'pending').length}
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="mb-4">
        <div className="relative max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search transactions by ID, customer, or method..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-4 py-3 text-left text-gray-700">Transaction ID</th>
                <th className="px-4 py-3 text-left text-gray-700">Date & Time</th>
                <th className="px-4 py-3 text-left text-gray-700">Customer</th>
                <th className="px-4 py-3 text-left text-gray-700">Type</th>
                <th className="px-4 py-3 text-left text-gray-700">Method</th>
                <th className="px-4 py-3 text-left text-gray-700">Amount</th>
                <th className="px-4 py-3 text-left text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-600">{transaction.id}</td>
                  <td className="px-4 py-3">
                    <div>
                      <p className="text-gray-900">{transaction.date}</p>
                      <p className="text-gray-500">{transaction.time}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-900">{transaction.customer}</td>
                  <td className="px-4 py-3">
                    <Badge 
                      variant="outline" 
                      className={getTypeColor(transaction.type)}
                    >
                      {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-gray-700">{transaction.method}</td>
                  <td className="px-4 py-3 text-gray-900">₹{transaction.amount.toFixed(2)}</td>
                  <td className="px-4 py-3">
                    <Badge 
                      variant="outline" 
                      className={getStatusColor(transaction.status)}
                    >
                      {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                    </Badge>
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
