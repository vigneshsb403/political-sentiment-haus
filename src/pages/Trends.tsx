
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import TrendChart from '@/components/TrendChart';
import TopicCard from '@/components/TopicCard';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Sample topic data
const topicData = [
  { topic: 'Economy', sentiment: 'positive' as const, percentage: 68, change: 5 },
  { topic: 'Healthcare', sentiment: 'negative' as const, percentage: 72, change: -3 },
  { topic: 'Climate Policy', sentiment: 'neutral' as const, percentage: 51, change: 0 },
  { topic: 'Education', sentiment: 'positive' as const, percentage: 64, change: 2 },
  { topic: 'Immigration', sentiment: 'negative' as const, percentage: 58, change: -1 },
  { topic: 'Foreign Policy', sentiment: 'neutral' as const, percentage: 49, change: 1 },
];

// Sample candidate data
const candidateData = [
  { topic: 'Candidate A', sentiment: 'positive' as const, percentage: 61, change: 3 },
  { topic: 'Candidate B', sentiment: 'negative' as const, percentage: 52, change: -2 },
  { topic: 'Candidate C', sentiment: 'positive' as const, percentage: 56, change: 4 },
  { topic: 'Candidate D', sentiment: 'neutral' as const, percentage: 49, change: 0 },
];

// Sample party data
const partyData = [
  { topic: 'Party Alpha', sentiment: 'positive' as const, percentage: 59, change: 4 },
  { topic: 'Party Beta', sentiment: 'negative' as const, percentage: 48, change: -1 },
];

const Trends = () => {
  const [timeframe, setTimeframe] = useState('year');

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-24">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 mb-12"
        >
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="mb-4">
              <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                Visual Insights
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-semibold mb-6">Political Sentiment Trends</h1>
            <p className="text-lg text-muted-foreground">
              Track and visualize how political sentiment evolves over time across different topics.
            </p>
          </div>
        </motion.div>

        <div className="container mx-auto px-4 mb-16">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <h2 className="text-2xl font-semibold">Sentiment Trend Analysis</h2>
            <div className="w-full sm:w-48">
              <Select value={timeframe} onValueChange={setTimeframe}>
                <SelectTrigger>
                  <SelectValue placeholder="Time period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="month">Past Month</SelectItem>
                  <SelectItem value="quarter">Past Quarter</SelectItem>
                  <SelectItem value="year">Past Year</SelectItem>
                  <SelectItem value="all">All Time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <TrendChart 
            title="Overall Political Sentiment Trends"
            description={`Sentiment trend analysis for the past ${timeframe === 'month' ? 'month' : timeframe === 'quarter' ? 'quarter' : timeframe === 'year' ? 'year' : 'all time'}`}
          />
        </div>

        <div className="py-12 bg-secondary/30">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="topics" className="max-w-4xl mx-auto">
              <div className="flex justify-center mb-8">
                <TabsList className="grid w-full max-w-md grid-cols-3">
                  <TabsTrigger value="topics">Topics</TabsTrigger>
                  <TabsTrigger value="candidates">Candidates</TabsTrigger>
                  <TabsTrigger value="parties">Parties</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="topics" className="animate-fade-in">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mb-6"
                >
                  <h3 className="text-2xl font-medium text-center mb-8">Sentiment by Political Topic</h3>
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
                </motion.div>
              </TabsContent>
              
              <TabsContent value="candidates" className="animate-fade-in">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mb-6"
                >
                  <h3 className="text-2xl font-medium text-center mb-8">Sentiment by Political Candidate</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {candidateData.map((candidate, index) => (
                      <TopicCard
                        key={candidate.topic}
                        topic={candidate.topic}
                        sentiment={candidate.sentiment}
                        percentage={candidate.percentage}
                        change={candidate.change}
                        delay={index}
                      />
                    ))}
                  </div>
                </motion.div>
              </TabsContent>
              
              <TabsContent value="parties" className="animate-fade-in">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mb-6"
                >
                  <h3 className="text-2xl font-medium text-center mb-8">Sentiment by Political Party</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
                    {partyData.map((party, index) => (
                      <TopicCard
                        key={party.topic}
                        topic={party.topic}
                        sentiment={party.sentiment}
                        percentage={party.percentage}
                        change={party.change}
                        delay={index}
                      />
                    ))}
                  </div>
                </motion.div>
              </TabsContent>
            </Tabs>
            
            <div className="flex justify-center mt-12">
              <Button className="rounded-full px-6">Download Full Report</Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Trends;
