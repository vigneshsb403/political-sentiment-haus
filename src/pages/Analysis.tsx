
import React from 'react';
import Navbar from '@/components/Navbar';
import SentimentAnalyzer from '@/components/SentimentAnalyzer';
import SearchPanel from '@/components/SearchPanel';
import { motion } from 'framer-motion';

const Analysis = () => {
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
                Detailed Analysis
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-semibold mb-6">Political Sentiment Analysis</h1>
            <p className="text-lg text-muted-foreground">
              Analyze political statements to understand sentiment and search through existing sentiment data from social media.
            </p>
          </div>
        </motion.div>

        <SentimentAnalyzer />
        
        <div className="py-8 bg-secondary/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center max-w-2xl mx-auto"
            >
              <h2 className="text-2xl font-medium mb-4">Search Political Statements</h2>
              <p className="text-muted-foreground mb-8">
                Explore our database of political statements from various social media platforms with sentiment analysis.
              </p>
            </motion.div>
          </div>
        </div>

        <SearchPanel />
      </main>
    </div>
  );
};

export default Analysis;
