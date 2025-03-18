
import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { ArrowUpRight, TrendingUp, TrendingDown, BarChart2 } from 'lucide-react';

type SentimentType = 'positive' | 'negative' | 'neutral';

interface TopicCardProps {
  topic: string;
  sentiment: SentimentType;
  percentage: number;
  change: number;
  className?: string;
  delay?: number;
}

const TopicCard: React.FC<TopicCardProps> = ({ 
  topic, 
  sentiment, 
  percentage, 
  change, 
  className,
  delay = 0
}) => {
  // Helper to determine sentiment colors and icons
  const getSentimentDetails = (sentiment: SentimentType) => {
    switch (sentiment) {
      case 'positive':
        return {
          color: 'text-sentiment-positive',
          bgColor: 'bg-sentiment-positive/10',
          borderColor: 'border-sentiment-positive/20',
          icon: TrendingUp
        };
      case 'negative':
        return {
          color: 'text-sentiment-negative',
          bgColor: 'bg-sentiment-negative/10',
          borderColor: 'border-sentiment-negative/20',
          icon: TrendingDown
        };
      case 'neutral':
        return {
          color: 'text-sentiment-neutral',
          bgColor: 'bg-sentiment-neutral/10',
          borderColor: 'border-sentiment-neutral/20',
          icon: BarChart2
        };
    }
  };

  const { color, bgColor, borderColor, icon: Icon } = getSentimentDetails(sentiment);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: delay * 0.1 }}
      className={cn(
        'glass-card rounded-xl overflow-hidden transition-all hover:shadow-md hover:translate-y-[-2px]',
        className
      )}
    >
      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div className={cn("flex items-center gap-2 text-sm font-medium px-2.5 py-1 rounded-full", bgColor, color)}>
            <Icon size={14} />
            <span className="capitalize">{sentiment}</span>
          </div>
          <button className="p-1.5 rounded-full hover:bg-background/50 transition-colors">
            <ArrowUpRight size={16} className="text-muted-foreground" />
          </button>
        </div>

        <h3 className="text-lg font-medium mb-2">{topic}</h3>
        
        <div className="flex justify-between items-baseline mt-4">
          <div className="text-2xl font-semibold">{percentage}%</div>
          <div className={cn(
            "flex items-center gap-1 text-sm font-medium",
            change > 0 ? "text-sentiment-positive" : change < 0 ? "text-sentiment-negative" : "text-sentiment-neutral"
          )}>
            {change > 0 ? "+" : ""}{change}%
            {change > 0 ? <TrendingUp size={14} /> : change < 0 ? <TrendingDown size={14} /> : null}
          </div>
        </div>

        <div className="mt-3 w-full h-2 bg-secondary rounded-full overflow-hidden">
          <div 
            className={cn(
              "h-full rounded-full",
              sentiment === 'positive' ? "bg-sentiment-positive" : 
              sentiment === 'negative' ? "bg-sentiment-negative" : 
              "bg-sentiment-neutral"
            )} 
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default TopicCard;
