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
    const similarPosts = posts.filter(post => 
      post.title.toLowerCase().includes(text.toLowerCase()) ||
      post.selftext?.toLowerCase().includes(text.toLowerCase())
    );

    // Calculate sentiment based on post scores and content
    let sentiment: 'positive' | 'negative' | 'neutral' = 'neutral';
    let score = 0.5;

    if (similarPosts.length > 0) {
      const avgScore = similarPosts.reduce((acc, post) => acc + post.score, 0) / similarPosts.length;
      if (avgScore > 1000) {
        sentiment = 'positive';
        score = 0.8;
      } else if (avgScore < -100) {
        sentiment = 'negative';
        score = 0.2;
      }
    }

    // Analyze aspects based on keywords
    const aspects = [
      { topic: 'Economy', keywords: ['economy', 'jobs', 'tax', 'business'] },
      { topic: 'Healthcare', keywords: ['health', 'medical', 'insurance', 'care'] },
      { topic: 'Foreign Policy', keywords: ['foreign', 'international', 'diplomatic', 'trade'] }
    ].map(({ topic, keywords }) => {
      const topicPosts = similarPosts.filter(post => 
        keywords.some(keyword => 
          post.title.toLowerCase().includes(keyword) ||
          post.selftext?.toLowerCase().includes(keyword)
        )
      );

      const topicScore = topicPosts.length > 0
        ? topicPosts.reduce((acc, post) => acc + post.score, 0) / topicPosts.length
        : 0;

      return {
        topic,
        sentiment: topicScore > 1000 ? 'positive' : topicScore < -100 ? 'negative' : 'neutral',
        score: topicScore > 1000 ? 0.8 : topicScore < -100 ? 0.2 : 0.5
      };
    });

    return {
      sentiment,
      score,
      aspects
    };
  } catch (error) {
    console.error('Error analyzing sentiment:', error);
    throw error;
  }
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
  const topics = ['Economy', 'Healthcare', 'Climate Policy', 'Education', 'Immigration', 'Foreign Policy'];
  return topics.map((topic) => {
    const topicPosts = posts.filter((post) =>
      post.title.toLowerCase().includes(topic.toLowerCase())
    );
    const total = topicPosts.length || 1;
    const positiveCount = topicPosts.filter((post) => post.score > 1000).length;
    const percentage = (positiveCount / total) * 100;
    
    return {
      topic,
      sentiment: percentage > 60 ? 'positive' : percentage < 40 ? 'negative' : 'neutral',
      percentage: Math.round(percentage),
      change: Math.floor(Math.random() * 10) - 5, // Placeholder for change calculation
    };
  });
}; 