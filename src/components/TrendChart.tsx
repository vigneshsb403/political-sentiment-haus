import React, { useState, useEffect } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, 
  Legend, ResponsiveContainer, AreaChart, Area 
} from 'recharts';
import { motion } from 'framer-motion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { fetchHistoricalSentiment } from '@/lib/redditApi';
import { Loader2 } from 'lucide-react';

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
  const [trendData, setTrendData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchHistoricalSentiment();
        setTrendData(data);
      } catch (err) {
        console.error('Error fetching trend data:', err);
        setError('Failed to load trend data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderChart = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-full">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex items-center justify-center h-full text-red-500">
          {error}
        </div>
      );
    }

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
          <p className="text-sm text-muted-foreground">
            {description}
            {loading && " (Loading...)"}
          </p>
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
