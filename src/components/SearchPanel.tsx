
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, ArrowRight, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

interface SearchResult {
  id: string;
  text: string;
  source: string;
  date: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  score: number;
}

// Mock search results
const mockResults: SearchResult[] = [
  {
    id: '1',
    text: "The new economic policy will create thousands of jobs and boost small businesses across the country.",
    source: "Twitter",
    date: "2023-06-15",
    sentiment: "positive",
    score: 0.82
  },
  {
    id: '2',
    text: "Healthcare reform is failing our most vulnerable citizens and costs are skyrocketing.",
    source: "Reddit",
    date: "2023-06-10",
    sentiment: "negative",
    score: 0.75
  },
  {
    id: '3',
    text: "The tax plan includes both benefits and drawbacks for middle-class families.",
    source: "Facebook",
    date: "2023-06-05",
    sentiment: "neutral",
    score: 0.65
  },
  {
    id: '4',
    text: "Environmental regulations are stifling innovation and hurting our economy.",
    source: "Reddit",
    date: "2023-06-02",
    sentiment: "negative",
    score: 0.68
  },
  {
    id: '5',
    text: "Education investment is showing promising results with increased graduation rates.",
    source: "Twitter",
    date: "2023-05-28",
    sentiment: "positive",
    score: 0.79
  }
];

const SearchPanel = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [platform, setPlatform] = useState('all');
  const [sentiment, setSentiment] = useState('all');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    if (!searchTerm.trim()) return;
    
    setIsSearching(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Filter mock results based on filters
      let filtered = [...mockResults];
      
      if (platform !== 'all') {
        filtered = filtered.filter(result => 
          result.source.toLowerCase() === platform.toLowerCase()
        );
      }
      
      if (sentiment !== 'all') {
        filtered = filtered.filter(result => 
          result.sentiment === sentiment
        );
      }
      
      setResults(filtered);
      setIsSearching(false);
      setHasSearched(true);
    }, 1000);
  };

  const getSentimentClass = (sentiment: 'positive' | 'negative' | 'neutral') => {
    switch (sentiment) {
      case 'positive':
        return 'bg-sentiment-positive/10 text-sentiment-positive';
      case 'negative':
        return 'bg-sentiment-negative/10 text-sentiment-negative';
      case 'neutral':
        return 'bg-sentiment-neutral/10 text-sentiment-neutral';
    }
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-semibold mb-4">Search Political Sentiments</h2>
            <p className="text-muted-foreground">
              Search for political statements and analyze sentiment patterns across social media platforms.
            </p>
          </div>

          <div className="glass-panel rounded-xl p-6 md:p-8 mb-10">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <Search size={18} />
                </div>
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search for political topics or keywords..."
                  className="pl-10"
                />
              </div>
              <div className="flex gap-3">
                <Select value={platform} onValueChange={setPlatform}>
                  <SelectTrigger className="w-[140px]">
                    <div className="flex items-center gap-2">
                      <Filter size={16} />
                      <SelectValue placeholder="Platform" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Platforms</SelectItem>
                    <SelectItem value="twitter">Twitter</SelectItem>
                    <SelectItem value="reddit">Reddit</SelectItem>
                    <SelectItem value="facebook">Facebook</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={sentiment} onValueChange={setSentiment}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Sentiment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sentiments</SelectItem>
                    <SelectItem value="positive">Positive</SelectItem>
                    <SelectItem value="negative">Negative</SelectItem>
                    <SelectItem value="neutral">Neutral</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button 
              onClick={handleSearch} 
              disabled={!searchTerm.trim() || isSearching}
              className="w-full md:w-auto rounded-full px-6"
            >
              {isSearching ? (
                <>
                  <Loader2 size={18} className="mr-2 animate-spin" />
                  Searching...
                </>
              ) : 'Search'}
            </Button>
          </div>

          {hasSearched && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="glass-panel rounded-xl overflow-hidden"
            >
              <div className="p-6 pb-3">
                <h3 className="text-lg font-medium mb-2">Search Results</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Found {results.length} statements matching your search criteria
                </p>
              </div>

              {results.length > 0 ? (
                <div className="divide-y divide-border">
                  {results.map((result, index) => (
                    <motion.div
                      key={result.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="p-6 hover:bg-secondary/30 transition-colors"
                    >
                      <div className="flex justify-between gap-4 mb-3">
                        <div className="text-sm flex items-center gap-3">
                          <span className="text-muted-foreground">{result.source}</span>
                          <span className="text-muted-foreground/60">•</span>
                          <span className="text-muted-foreground">{new Date(result.date).toLocaleDateString()}</span>
                        </div>
                        <div className={cn(
                          "text-sm font-medium px-2.5 py-1 rounded-full",
                          getSentimentClass(result.sentiment)
                        )}>
                          {result.sentiment} ({Math.round(result.score * 100)}%)
                        </div>
                      </div>
                      <p className="text-foreground mb-3">{result.text}</p>
                      <div className="flex justify-end">
                        <Button variant="ghost" size="sm" className="gap-1 text-xs">
                          View analysis
                          <ArrowRight size={14} />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center">
                  <p className="text-muted-foreground">No results found for your search criteria.</p>
                </div>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default SearchPanel;
