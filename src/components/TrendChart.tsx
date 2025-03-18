
import React, { useState } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, 
  Legend, ResponsiveContainer, AreaChart, Area 
} from 'recharts';
import { motion } from 'framer-motion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

// Sample data
const trendData = [
  { date: 'Jan', positive: 30, negative: 40, neutral: 30 },
  { date: 'Feb', positive: 40, negative: 30, neutral: 30 },
  { date: 'Mar', positive: 45, negative: 25, neutral: 30 },
  { date: 'Apr', positive: 25, negative: 45, neutral: 30 },
  { date: 'May', positive: 38, negative: 32, neutral: 30 },
  { date: 'Jun', positive: 50, negative: 25, neutral: 25 },
  { date: 'Jul', positive: 55, negative: 20, neutral: 25 },
  { date: 'Aug', positive: 65, negative: 15, neutral: 20 },
  { date: 'Sep', positive: 60, negative: 20, neutral: 20 },
  { date: 'Oct', positive: 50, negative: 30, neutral: 20 },
  { date: 'Nov', positive: 55, negative: 25, neutral: 20 },
  { date: 'Dec', positive: 60, negative: 15, neutral: 25 }
];

type ChartType = 'line' | 'area';

interface TrendChartProps {
  title?: string;
  description?: string;
  className?: string;
}

const TrendChart: React.FC<TrendChartProps> = ({
  title = "Sentiment Trends Over Time",
  description = "Visualization of political sentiment trends over the past year",
  className
}) => {
  const [chartType, setChartType] = useState<ChartType>('line');

  const renderChart = () => {
    if (chartType === 'line') {
      return (
        <LineChart
          data={trendData}
          margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" vertical={false} />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip 
            contentStyle={{ 
              borderRadius: '0.5rem', 
              border: 'none',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              backgroundColor: 'rgba(255, 255, 255, 0.95)'
            }}
          />
          <Legend />
          <Line type="monotone" dataKey="positive" stroke="#34D399" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
          <Line type="monotone" dataKey="negative" stroke="#F87171" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
          <Line type="monotone" dataKey="neutral" stroke="#94A3B8" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
        </LineChart>
      );
    } else {
      return (
        <AreaChart
          data={trendData}
          margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" vertical={false} />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip 
            contentStyle={{ 
              borderRadius: '0.5rem', 
              border: 'none',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              backgroundColor: 'rgba(255, 255, 255, 0.95)'
            }}
          />
          <Legend />
          <Area type="monotone" dataKey="positive" stackId="1" stroke="#34D399" fill="#34D399" fillOpacity={0.6} />
          <Area type="monotone" dataKey="negative" stackId="1" stroke="#F87171" fill="#F87171" fillOpacity={0.6} />
          <Area type="monotone" dataKey="neutral" stackId="1" stroke="#94A3B8" fill="#94A3B8" fillOpacity={0.6} />
        </AreaChart>
      );
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn("glass-panel rounded-xl p-6", className)}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg font-medium">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <div className="w-full sm:w-40">
          <Select value={chartType} onValueChange={(value) => setChartType(value as ChartType)}>
            <SelectTrigger>
              <SelectValue placeholder="Chart type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="line">Line Chart</SelectItem>
              <SelectItem value="area">Area Chart</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default TrendChart;
