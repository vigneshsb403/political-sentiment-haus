
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative min-h-screen pt-20 pb-16 flex flex-col justify-center overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 opacity-30 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full filter blur-3xl animate-pulse-subtle" />
        <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-blue-400/20 rounded-full filter blur-3xl animate-pulse-subtle" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-4 py-12 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6">
              <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                Political Sentiment Analysis
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 leading-tight">
              Understand how people feel about{" "}
              <span className="text-primary relative">
                politics
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 124 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 5.5C20 2.5 62 1 123 9.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </span>
            </h1>
            <p className="text-lg md:text-xl text-foreground/80 mb-8 max-w-2xl mx-auto">
              Advanced sentiment analysis to track and visualize public opinion on political topics, candidates, and policies in real-time.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/analysis"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white font-medium hover:bg-primary/90 transition-all"
            >
              Start analyzing
              <ArrowRight size={18} />
            </Link>
            <Link
              to="/trends"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-secondary text-foreground font-medium hover:bg-secondary/70 transition-all"
            >
              View trends
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 md:mt-24 max-w-5xl mx-auto glass-panel rounded-2xl p-6 md:p-8"
        >
          <div className="aspect-video relative rounded-xl overflow-hidden shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 animate-pulse-subtle" style={{ animationDuration: '8s' }}>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <p className="text-lg font-medium">Dashboard Visualization</p>
                  <p className="text-sm">Interactive sentiment analysis dashboard preview</p>
                </div>
              </div>
              
              {/* Mock data visualization elements */}
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-blue-500/10 to-transparent"></div>
              <div className="absolute left-[10%] right-[10%] bottom-[20%] h-24">
                <div className="relative h-full">
                  <div className="absolute bottom-0 left-[10%] h-[40%] w-8 bg-sentiment-positive/50 rounded-t-md"></div>
                  <div className="absolute bottom-0 left-[25%] h-[65%] w-8 bg-sentiment-positive/50 rounded-t-md"></div>
                  <div className="absolute bottom-0 left-[40%] h-[30%] w-8 bg-sentiment-positive/50 rounded-t-md"></div>
                  <div className="absolute bottom-0 left-[55%] h-[45%] w-8 bg-sentiment-negative/50 rounded-t-md"></div>
                  <div className="absolute bottom-0 left-[70%] h-[70%] w-8 bg-sentiment-negative/50 rounded-t-md"></div>
                  <div className="absolute bottom-0 left-[85%] h-[55%] w-8 bg-sentiment-neutral/50 rounded-t-md"></div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
