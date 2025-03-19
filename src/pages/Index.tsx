
import React from 'react';
import { motion } from 'framer-motion';
import Hero from '@/components/Hero';
import Dashboard from '@/components/Dashboard';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart2, Search, Zap } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <Hero />
      
      <Dashboard />
      
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl font-semibold mb-6">Key Features</h2>
            <p className="text-lg text-muted-foreground">
              Explore the powerful features of our political sentiment analysis platform.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="glass-panel rounded-xl p-6 text-center"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-6">
                <Zap size={20} />
              </div>
              <h3 className="text-xl font-medium mb-3">Real-time Analysis</h3>
              <p className="text-muted-foreground mb-6">
                Analyze political statements in real-time with advanced sentiment classification.
              </p>
              <Link to="/analysis">
                <Button variant="ghost" className="gap-1">
                  Try it now
                  <ArrowRight size={16} />
                </Button>
              </Link>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="glass-panel rounded-xl p-6 text-center"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-6">
                <Search size={20} />
              </div>
              <h3 className="text-xl font-medium mb-3">Topic Analysis</h3>
              <p className="text-muted-foreground mb-6">
                Analyze sentiment across specific political topics, candidates, and parties.
              </p>
              <Link to="/analysis">
                <Button variant="ghost" className="gap-1">
                  Search topics
                  <ArrowRight size={16} />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
      
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto glass-panel rounded-xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-2xl md:text-3xl font-semibold mb-4">Ready to analyze political sentiment?</h2>
                  <p className="text-muted-foreground mb-6">
                    Start using our advanced sentiment analysis tools to gain insights into public opinion on political topics.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link to="/analysis">
                      <Button className="w-full sm:w-auto px-6 rounded-full">Get Started</Button>
                    </Link>
                  </div>
                </motion.div>
              </div>
              <div className="md:w-1/2">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  className="rounded-xl overflow-hidden shadow-lg aspect-video bg-gradient-to-br from-primary/5 to-primary/20 flex items-center justify-center"
                >
                  <div className="text-center p-6">
                    <div className="mb-4 flex justify-center">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                        <BarChart2 size={28} className="text-primary" />
                      </div>
                    </div>
                    <h3 className="text-lg font-medium">Interactive Dashboard</h3>
                    <p className="text-sm text-muted-foreground">
                      Visualize sentiment data in real-time
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
