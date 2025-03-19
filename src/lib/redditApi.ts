import axios from 'axios';

// Reddit API configuration
const REDDIT_API_BASE_URL = 'https://www.reddit.com';
const REDDIT_CLIENT_ID = import.meta.env.VITE_REDDIT_CLIENT_ID;
const REDDIT_CLIENT_SECRET = import.meta.env.VITE_REDDIT_CLIENT_SECRET;

// Function to fetch political subreddit posts
export const fetchPoliticalPosts = async (subreddit: string = 'politics', limit: number = 100) => {
  try {
    // Using the public JSON API endpoint instead of OAuth
    const response = await axios.get(`${REDDIT_API_BASE_URL}/r/${subreddit}/hot.json`, {
      params: {
        limit,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data.data.children.map((post: any) => post.data);
  } catch (error) {
    console.error('Error fetching Reddit posts:', error);
    throw error;
  }
};

// Function to analyze sentiment of a single text
export const analyzeTextSentiment = async (text: string) => {
  try {
    const posts = await fetchPoliticalPosts('politics', 100);
    
    // Find posts with similar content
    const similarPosts = posts.filter(post => {
      const postText = (post.title + ' ' + (post.selftext || '')).toLowerCase();
      const inputWords = text.toLowerCase().split(/\s+/);
      // Count how many words from the input appear in the post
      const matchingWords = inputWords.filter(word => word.length > 3 && postText.includes(word)).length;
      // Consider it similar if at least 2 significant words match
      return matchingWords >= 2;
    });

    // If no similar posts found, analyze the text directly
    if (similarPosts.length === 0) {
      // Simple keyword-based sentiment analysis
      const positiveWords = ['good', 'great', 'excellent', 'positive', 'progress', 'success', 'benefit', 'support', 'improve', 'advantage'];
      const negativeWords = ['bad', 'poor', 'negative', 'fail', 'crisis', 'problem', 'threat', 'oppose', 'worse', 'disaster'];
      
      const words = text.toLowerCase().split(/\s+/);
      const positiveCount = words.filter(word => positiveWords.includes(word)).length;
      const negativeCount = words.filter(word => negativeWords.includes(word)).length;
      
      const sentiment = positiveCount > negativeCount ? 'positive' : 
                       negativeCount > positiveCount ? 'negative' : 'neutral';
      const score = Math.max(0.5, (Math.abs(positiveCount - negativeCount) + 1) / (words.length + 1));
      
      return {
        sentiment: sentiment as 'positive' | 'negative' | 'neutral',
        score,
        aspects: analyzeAspects(text, [])
      };
    }

    // Calculate overall sentiment based on similar posts
    const totalScore = similarPosts.reduce((acc, post) => acc + post.score, 0);
    const avgScore = totalScore / similarPosts.length;
    
    let sentiment: 'positive' | 'negative' | 'neutral';
    let score: number;

    if (avgScore > 1000) {
      sentiment = 'positive';
      score = Math.min(0.9, (avgScore - 1000) / 9000 + 0.6);
    } else if (avgScore < -100) {
      sentiment = 'negative';
      score = Math.min(0.9, Math.abs(avgScore + 100) / 900 + 0.6);
    } else {
      sentiment = 'neutral';
      score = 0.5 + Math.abs(avgScore) / 2000;
    }

    return {
      sentiment,
      score,
      aspects: analyzeAspects(text, similarPosts)
    };
  } catch (error) {
    console.error('Error analyzing sentiment:', error);
    throw error;
  }
};

// Helper function to analyze aspects
const analyzeAspects = (text: string, similarPosts: any[]) => {
  const aspects = [
    {
      topic: 'Economy',
      keywords: ['economy', 'economic', 'jobs', 'unemployment', 'tax', 'taxes', 'business', 'market', 'inflation', 'wage', 'debt'],
      positiveWords: ['growth', 'recovery', 'boost', 'gain', 'profit', 'increase', 'improve'],
      negativeWords: ['recession', 'crisis', 'decline', 'loss', 'deficit', 'crash', 'inflation']
    },
    {
      topic: 'Healthcare',
      keywords: ['health', 'healthcare', 'medical', 'insurance', 'hospital', 'medicare', 'medicaid', 'doctors', 'patient'],
      positiveWords: ['improve', 'access', 'affordable', 'coverage', 'care', 'benefit', 'support'],
      negativeWords: ['cost', 'expensive', 'crisis', 'problem', 'issue', 'lack', 'deny']
    },
    {
      topic: 'Foreign Policy',
      keywords: ['foreign', 'international', 'diplomatic', 'trade', 'military', 'war', 'treaty', 'alliance', 'global'],
      positiveWords: ['peace', 'cooperation', 'agreement', 'ally', 'support', 'partnership', 'diplomacy'],
      negativeWords: ['war', 'conflict', 'tension', 'threat', 'crisis', 'dispute', 'hostile']
    }
  ];

  return aspects.map(aspect => {
    // Check if the text contains keywords related to this aspect
    const hasKeywords = aspect.keywords.some(keyword => 
      text.toLowerCase().includes(keyword)
    );

    if (!hasKeywords) {
      return {
        topic: aspect.topic,
        sentiment: 'neutral' as 'positive' | 'negative' | 'neutral',
        score: 0.5
      };
    }

    // Analyze sentiment for this aspect
    const words = text.toLowerCase().split(/\s+/);
    const positiveCount = words.filter(word => aspect.positiveWords.includes(word)).length;
    const negativeCount = words.filter(word => aspect.negativeWords.includes(word)).length;

    // Also consider similar posts if available
    let postsSentiment = 0;
    if (similarPosts.length > 0) {
      const relevantPosts = similarPosts.filter(post => 
        aspect.keywords.some(keyword => 
          post.title.toLowerCase().includes(keyword) ||
          (post.selftext && post.selftext.toLowerCase().includes(keyword))
        )
      );

      if (relevantPosts.length > 0) {
        const avgScore = relevantPosts.reduce((acc, post) => acc + post.score, 0) / relevantPosts.length;
        postsSentiment = avgScore > 1000 ? 1 : avgScore < -100 ? -1 : 0;
      }
    }

    // Combine direct text analysis with similar posts sentiment
    const textSentiment = positiveCount > negativeCount ? 1 : negativeCount > positiveCount ? -1 : 0;
    const combinedSentiment = (textSentiment + (postsSentiment * 2)) / 3; // Weight posts sentiment more

    let sentiment: 'positive' | 'negative' | 'neutral';
    let score: number;

    if (combinedSentiment > 0.3) {
      sentiment = 'positive';
      score = 0.5 + (combinedSentiment * 0.4);
    } else if (combinedSentiment < -0.3) {
      sentiment = 'negative';
      score = 0.5 + (Math.abs(combinedSentiment) * 0.4);
    } else {
      sentiment = 'neutral';
      score = 0.5 + (Math.abs(combinedSentiment) * 0.2);
    }

    return {
      topic: aspect.topic,
      sentiment,
      score: Math.min(0.95, score)
    };
  });
};

// Function to search political posts
export const searchPoliticalPosts = async (query: string, sentiment?: 'positive' | 'negative' | 'neutral') => {
  try {
    const posts = await fetchPoliticalPosts('politics', 100);
    
    // Filter posts based on search query
    let filteredPosts = posts.filter(post => 
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.selftext?.toLowerCase().includes(query.toLowerCase())
    );

    // Filter by sentiment if specified
    if (sentiment) {
      filteredPosts = filteredPosts.filter(post => {
        const postSentiment = post.score > 1000 ? 'positive' : post.score < -100 ? 'negative' : 'neutral';
        return postSentiment === sentiment;
      });
    }

    // Transform posts to search results
    return filteredPosts.map(post => ({
      id: post.id,
      text: post.title,
      source: 'Reddit',
      date: new Date(post.created_utc * 1000).toISOString(),
      sentiment: post.score > 1000 ? 'positive' : post.score < -100 ? 'negative' : 'neutral',
      score: post.score > 1000 ? 0.8 : post.score < -100 ? 0.2 : 0.5
    }));
  } catch (error) {
    console.error('Error searching posts:', error);
    throw error;
  }
};

// Function to analyze sentiment of posts
export const analyzeSentiment = (posts: any[]) => {
  // Simple sentiment analysis based on post title and score
  const sentimentData = {
    positive: 0,
    negative: 0,
    neutral: 0,
  };

  posts.forEach((post) => {
    const score = post.score;
    if (score > 1000) {
      sentimentData.positive++;
    } else if (score < -100) {
      sentimentData.negative++;
    } else {
      sentimentData.neutral++;
    }
  });

  const total = posts.length;
  return {
    overallSentiment: [
      { name: 'Positive', value: (sentimentData.positive / total) * 100 },
      { name: 'Negative', value: (sentimentData.negative / total) * 100 },
      { name: 'Neutral', value: (sentimentData.neutral / total) * 100 },
    ],
    sentimentTrend: generateSentimentTrend(posts),
    topicData: generateTopicData(posts),
  };
};

// Helper function to generate sentiment trend data
const generateSentimentTrend = (posts: any[]) => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return days.map((day) => {
    const dayPosts = posts.filter((post) => {
      const postDate = new Date(post.created_utc * 1000);
      return postDate.getDay() === days.indexOf(day);
    });

    const total = dayPosts.length || 1;
    return {
      date: day,
      positive: (dayPosts.filter((post) => post.score > 1000).length / total) * 100,
      negative: (dayPosts.filter((post) => post.score < -100).length / total) * 100,
      neutral: (dayPosts.filter((post) => post.score >= -100 && post.score <= 1000).length / total) * 100,
    };
  });
};

// Helper function to generate topic data
const generateTopicData = (posts: any[]) => {
  const topics = [
    { name: 'Economy', keywords: ['economy', 'economic', 'jobs', 'unemployment', 'tax', 'taxes', 'business', 'market', 'inflation'] },
    { name: 'Healthcare', keywords: ['health', 'healthcare', 'medical', 'insurance', 'hospital', 'medicare', 'medicaid', 'doctors'] },
    { name: 'Climate Policy', keywords: ['climate', 'environment', 'environmental', 'green', 'renewable', 'carbon', 'emissions'] },
    { name: 'Education', keywords: ['education', 'school', 'student', 'college', 'university', 'teacher', 'learning'] },
    { name: 'Immigration', keywords: ['immigration', 'immigrant', 'border', 'migrant', 'visa', 'asylum'] },
    { name: 'Foreign Policy', keywords: ['foreign', 'international', 'diplomatic', 'trade', 'military', 'war', 'treaty'] }
  ];

  return topics.map(({ name, keywords }) => {
    // Find posts related to this topic using keywords
    const topicPosts = posts.filter(post =>
      keywords.some(keyword =>
        post.title.toLowerCase().includes(keyword) ||
        (post.selftext && post.selftext.toLowerCase().includes(keyword))
      )
    );

    if (topicPosts.length === 0) {
      return {
        topic: name,
        sentiment: 'neutral',
        percentage: 50,
        change: 0
      };
    }

    // Calculate sentiment based on post scores
    const sentimentCounts = {
      positive: 0,
      negative: 0,
      neutral: 0
    };

    topicPosts.forEach(post => {
      if (post.score > 1000) {
        sentimentCounts.positive++;
      } else if (post.score < -100) {
        sentimentCounts.negative++;
      } else {
        sentimentCounts.neutral++;
      }
    });

    const total = topicPosts.length;
    const positivePercentage = (sentimentCounts.positive / total) * 100;
    const negativePercentage = (sentimentCounts.negative / total) * 100;

    // Calculate weighted score based on upvotes
    const avgScore = topicPosts.reduce((acc, post) => acc + post.score, 0) / total;
    const normalizedScore = Math.min(Math.max((avgScore + 1000) / 2000 * 100, 0), 100);

    // Calculate sentiment change (comparing with older posts)
    const now = Date.now() / 1000; // current time in seconds
    const dayAgo = now - 24 * 60 * 60; // 24 hours ago
    
    const recentPosts = topicPosts.filter(post => post.created_utc > dayAgo);
    const olderPosts = topicPosts.filter(post => post.created_utc <= dayAgo);
    
    let change = 0;
    if (recentPosts.length > 0 && olderPosts.length > 0) {
      const recentAvg = recentPosts.reduce((acc, post) => acc + post.score, 0) / recentPosts.length;
      const olderAvg = olderPosts.reduce((acc, post) => acc + post.score, 0) / olderPosts.length;
      change = Math.round(((recentAvg - olderAvg) / Math.abs(olderAvg || 1)) * 100);
      // Limit change to reasonable range
      change = Math.min(Math.max(change, -5), 5);
    }

    return {
      topic: name,
      sentiment: positivePercentage > negativePercentage ? 'positive' : negativePercentage > positivePercentage ? 'negative' : 'neutral',
      percentage: Math.round(normalizedScore),
      change
    };
  });
};

// Function to fetch historical sentiment data
export const fetchHistoricalSentiment = async () => {
  try {
    // Fetch posts from different time periods using Reddit's API
    const response = await axios.get(`${REDDIT_API_BASE_URL}/r/politics/top.json`, {
      params: {
        limit: 100,
        t: 'year', // Get top posts from the past year
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const posts = response.data.data.children.map((post: any) => post.data);
    
    // Group posts by month
    const monthlyData = new Map();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    posts.forEach(post => {
      const date = new Date(post.created_utc * 1000);
      const monthKey = months[date.getMonth()];
      
      if (!monthlyData.has(monthKey)) {
        monthlyData.set(monthKey, {
          positive: 0,
          negative: 0,
          neutral: 0,
          total: 0
        });
      }

      const data = monthlyData.get(monthKey);
      data.total++;

      if (post.score > 1000) {
        data.positive++;
      } else if (post.score < -100) {
        data.negative++;
      } else {
        data.neutral++;
      }
    });

    // Convert to percentage and format data
    const trendData = months.map(month => {
      const data = monthlyData.get(month) || { positive: 0, negative: 0, neutral: 0, total: 1 };
      return {
        date: month,
        positive: (data.positive / data.total) * 100,
        negative: (data.negative / data.total) * 100,
        neutral: (data.neutral / data.total) * 100
      };
    });

    return trendData;
  } catch (error) {
    console.error('Error fetching historical sentiment:', error);
    throw error;
  }
}; 