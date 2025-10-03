import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  iconBgColor?: string;
  iconColor?: string;
}

export function MetricCard({ 
  title, 
  value, 
  icon: Icon,
  iconBgColor = 'bg-blue-50',
  iconColor = 'text-blue-600'
}: MetricCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-500 mb-1">{title}</p>
          <p className="text-gray-900">{value}</p>
        </div>
        <div className={`w-10 h-10 ${iconBgColor} rounded-lg flex items-center justify-center`}>
          <Icon className={`w-5 h-5 ${iconColor}`} />
        </div>
      </div>
    </div>
  );
}
