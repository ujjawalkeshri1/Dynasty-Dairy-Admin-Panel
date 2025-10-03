import { DollarSign, Users, UserPlus, TrendingUp } from 'lucide-react';
import { MetricCard } from '../components/MetricCard';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const salesData = [
  { day: 'Mon', revenue: 28000 },
  { day: 'Tue', revenue: 32000 },
  { day: 'Wed', revenue: 26000 },
  { day: 'Thu', revenue: 35000 },
  { day: 'Fri', revenue: 38000 },
  { day: 'Sat', revenue: 42000 },
  { day: 'Sun', revenue: 39000 },
];

const productData = [
  { name: 'Cow Milk (500ml)', value: 35, color: '#3B82F6' },
  { name: 'Fresh Paneer (200g)', value: 25, color: '#10B981' },
  { name: 'Natural Yogurt (400g)', value: 22, color: '#F59E0B' },
  { name: 'Classic Ghee (1L)', value: 18, color: '#EF4444' },
];

export function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Metric Cards */}
      <div className="grid grid-cols-4 gap-4">
        <MetricCard
          title="Today's Revenue"
          value="₹30,946.00"
          icon={DollarSign}
          iconBgColor="bg-green-50"
          iconColor="text-green-600"
        />
        <MetricCard
          title="Active Subscriptions"
          value="1,250"
          icon={TrendingUp}
          iconBgColor="bg-blue-50"
          iconColor="text-blue-600"
        />
        <MetricCard
          title="New Customers"
          value="32"
          icon={UserPlus}
          iconBgColor="bg-purple-50"
          iconColor="text-purple-600"
        />
        <MetricCard
          title="Orders for Delivery"
          value="1,480"
          icon={Users}
          iconBgColor="bg-orange-50"
          iconColor="text-orange-600"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-3 gap-6">
        {/* Sales Performance Chart */}
        <div className="col-span-2 bg-white border border-gray-200 rounded-lg p-6">
          <div className="mb-4">
            <h3 className="text-gray-900 mb-1">Sales Performance</h3>
            <p className="text-gray-500">Revenue and order trends</p>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis 
                  dataKey="day" 
                  stroke="#6B7280"
                />
                <YAxis 
                  stroke="#6B7280"
                  tickFormatter={(value) => `${value / 1000}k`}
                />
                <Tooltip 
                  formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Revenue']}
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  dot={{ fill: '#3B82F6', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Popular Products Chart */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="mb-4">
            <h3 className="text-gray-900 mb-1">Popular Products</h3>
            <p className="text-gray-500">Best performing menu items</p>
          </div>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={productData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {productData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => [`${value}%`, 'Share']}
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-4">
            {productData.map((product, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: product.color }}
                  ></div>
                  <span className="text-gray-700">{product.name}</span>
                </div>
                <span className="text-gray-900">{product.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
