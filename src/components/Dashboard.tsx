
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { motion } from 'framer-motion';
import TopicCard from './TopicCard';

// Sample data
const overallSentiment = [
  { name: 'Positive', value: 45 },
  { name: 'Negative', value: 30 },
  { name: 'Neutral', value: 25 },
];

const sentimentTrend = [
  { date: 'Mon', positive: 40, negative: 30, neutral: 30 },
  { date: 'Tue', positive: 45, negative: 25, neutral: 30 },
  { date: 'Wed', positive: 35, negative: 40, neutral: 25 },
  { date: 'Thu', positive: 50, negative: 35, neutral: 15 },
  { date: 'Fri', positive: 45, negative: 30, neutral: 25 },
  { date: 'Sat', positive: 55, negative: 25, neutral: 20 },
  { date: 'Sun', positive: 60, negative: 20, neutral: 20 },
];

const topicData = [
  { topic: 'Economy', sentiment: 'positive' as const, percentage: 68, change: 5 },
  { topic: 'Healthcare', sentiment: 'negative' as const, percentage: 72, change: -3 },
  { topic: 'Climate Policy', sentiment: 'neutral' as const, percentage: 51, change: 0 },
  { topic: 'Education', sentiment: 'positive' as const, percentage: 64, change: 2 },
  { topic: 'Immigration', sentiment: 'negative' as const, percentage: 58, change: -1 },
  { topic: 'Foreign Policy', sentiment: 'neutral' as const, percentage: 49, change: 1 },
];

const COLORS = ['#34D399', '#F87171', '#94A3B8'];

const Dashboard = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-semibold mb-4"
          >
            Political Sentiment Dashboard
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Real-time analysis of political sentiment trends across social media platforms.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Overall sentiment chart */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="glass-panel rounded-xl p-6"
          >
            <h3 className="text-lg font-medium mb-6">Overall Sentiment Distribution</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={overallSentiment}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={110}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {overallSentiment.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`${value}%`, 'Percentage']}
                    contentStyle={{ 
                      borderRadius: '0.5rem', 
                      border: 'none',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                      backgroundColor: 'rgba(255, 255, 255, 0.95)'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Weekly sentiment trend */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-panel rounded-xl p-6"
          >
            <h3 className="text-lg font-medium mb-6">Weekly Sentiment Trend</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={sentimentTrend}
                  margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
                  barGap={0}
                  barSize={20}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
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
                  <Bar dataKey="positive" fill="#34D399" name="Positive" />
                  <Bar dataKey="negative" fill="#F87171" name="Negative" />
                  <Bar dataKey="neutral" fill="#94A3B8" name="Neutral" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        <div className="mb-6">
          <motion.h3 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-xl font-medium"
          >
            Sentiment by Topic
          </motion.h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {topicData.map((topic, index) => (
            <TopicCard
              key={topic.topic}
              topic={topic.topic}
              sentiment={topic.sentiment}
              percentage={topic.percentage}
              change={topic.change}
              delay={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
