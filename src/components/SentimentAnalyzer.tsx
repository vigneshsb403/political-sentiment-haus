
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Loader2, CheckCircle2, AlertTriangle, HelpCircle, MessageSquare } from 'lucide-react';

type SentimentResult = {
  sentiment: 'positive' | 'negative' | 'neutral';
  score: number;
  aspects: {
    topic: string;
    sentiment: 'positive' | 'negative' | 'neutral';
    score: number;
  }[];
};

const mockAnalyze = (text: string): Promise<SentimentResult> => {
  // This is a mock function that would be replaced with an actual API call
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simple mock analysis - in a real app, this would come from the backend
      let sentiment: 'positive' | 'negative' | 'neutral' = 'neutral';
      let score = 0.5;
      
      if (text.toLowerCase().includes('great') || text.toLowerCase().includes('good') || text.toLowerCase().includes('like')) {
        sentiment = 'positive';
        score = 0.8;
      } else if (text.toLowerCase().includes('bad') || text.toLowerCase().includes('terrible') || text.toLowerCase().includes('hate')) {
        sentiment = 'negative';
        score = 0.2;
      }
      
      resolve({
        sentiment,
        score,
        aspects: [
          { topic: 'Economy', sentiment: text.includes('economy') ? 'positive' : 'neutral', score: 0.65 },
          { topic: 'Healthcare', sentiment: text.includes('health') ? 'negative' : 'neutral', score: 0.4 },
          { topic: 'Foreign Policy', sentiment: text.includes('foreign') ? 'positive' : 'neutral', score: 0.72 }
        ]
      });
    }, 1500); // Simulate API delay
  });
};

const SentimentAnalyzer = () => {
  const [text, setText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<SentimentResult | null>(null);

  const handleAnalyze = async () => {
    if (!text.trim()) return;
    
    setIsAnalyzing(true);
    try {
      const result = await mockAnalyze(text);
      setResult(result);
    } catch (error) {
      console.error('Analysis error:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getSentimentIcon = (sentiment: 'positive' | 'negative' | 'neutral') => {
    switch (sentiment) {
      case 'positive':
        return <CheckCircle2 className="text-sentiment-positive" />;
      case 'negative':
        return <AlertTriangle className="text-sentiment-negative" />;
      case 'neutral':
        return <HelpCircle className="text-sentiment-neutral" />;
    }
  };

  const getSentimentColor = (sentiment: 'positive' | 'negative' | 'neutral') => {
    switch (sentiment) {
      case 'positive':
        return 'text-sentiment-positive bg-sentiment-positive/10';
      case 'negative':
        return 'text-sentiment-negative bg-sentiment-negative/10';
      case 'neutral':
        return 'text-sentiment-neutral bg-sentiment-neutral/10';
    }
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-semibold mb-4">Sentiment Analyzer</h2>
            <p className="text-muted-foreground">
              Analyze political statements to determine sentiment and topic classification.
            </p>
          </div>

          <div className="glass-panel rounded-xl p-6 md:p-8 mb-8">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <MessageSquare size={18} className="text-primary" />
                <h3 className="text-lg font-medium">Enter political statement</h3>
              </div>
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter a political statement to analyze..."
                className="min-h-[120px] text-base resize-none focus:ring-1 focus:ring-primary transition-all"
              />
            </div>
            
            <div className="flex justify-end">
              <Button 
                onClick={handleAnalyze} 
                disabled={!text.trim() || isAnalyzing}
                className="px-6 rounded-full"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 size={18} className="mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : 'Analyze Sentiment'}
              </Button>
            </div>
          </div>

          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="glass-panel rounded-xl p-6 md:p-8"
            >
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-4">Analysis Results</h3>
                <div className="flex items-center gap-3 mb-6">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-full ${getSentimentColor(result.sentiment)}`}>
                    {getSentimentIcon(result.sentiment)}
                  </div>
                  <div>
                    <div className="text-lg font-medium capitalize">{result.sentiment} Sentiment</div>
                    <div className="text-sm text-muted-foreground">
                      Confidence score: {Math.round(result.score * 100)}%
                    </div>
                  </div>
                </div>
              </div>

              <Separator className="mb-6" />

              <div>
                <h4 className="text-base font-medium mb-4">Aspect-Based Sentiment</h4>
                <div className="grid gap-4">
                  {result.aspects.map((aspect) => (
                    <div key={aspect.topic} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                      <div className="flex items-center gap-2">
                        {getSentimentIcon(aspect.sentiment)}
                        <span className="font-medium">{aspect.topic}</span>
                      </div>
                      <div className={`text-sm font-medium capitalize ${
                        aspect.sentiment === 'positive' ? 'text-sentiment-positive' :
                        aspect.sentiment === 'negative' ? 'text-sentiment-negative' :
                        'text-sentiment-neutral'
                      }`}>
                        {aspect.sentiment} ({Math.round(aspect.score * 100)}%)
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default SentimentAnalyzer;
