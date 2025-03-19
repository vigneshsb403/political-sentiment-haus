import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Loader2, CheckCircle2, AlertTriangle, HelpCircle, MessageSquare } from 'lucide-react';
import { analyzeTextSentiment } from '@/lib/redditApi';

type SentimentResult = {
  sentiment: 'positive' | 'negative' | 'neutral';
  score: number;
  aspects: {
    topic: string;
    sentiment: 'positive' | 'negative' | 'neutral';
    score: number;
  }[];
};

const SentimentAnalyzer = () => {
  const [text, setText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<SentimentResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!text.trim()) return;
    
    setIsAnalyzing(true);
    setError(null);
    try {
      const result = await analyzeTextSentiment(text);
      setResult(result);
    } catch (error) {
      console.error('Analysis error:', error);
      setError('Failed to analyze sentiment. Please try again.');
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

          {error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="glass-panel rounded-xl p-6 md:p-8 mb-8 bg-red-500/10 text-red-500"
            >
              {error}
            </motion.div>
          )}

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
