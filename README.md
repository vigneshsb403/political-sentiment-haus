# Political Sentiment Haus

A real-time political sentiment analysis dashboard that visualizes sentiment trends from Reddit's r/politics community.

## Features

- **Real-time Sentiment Analysis**: Analyzes posts from r/politics subreddit to determine positive, negative, and neutral sentiments
- **Historical Trend Visualization**: Displays sentiment trends over the past year using interactive charts
- **Multiple Visualization Styles**: 
  - Line Chart: Shows trend lines for each sentiment type
  - Area Chart: Displays stacked areas representing sentiment distribution
- **Responsive Design**: Fully responsive UI that works across all device sizes
- **Modern UI/UX**: Built with shadcn-ui components and smooth animations

## Tech Stack

- **Frontend Framework**: React with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn-ui
- **Charts**: Recharts
- **Animations**: Framer Motion
- **API Integration**: Reddit JSON API
- **HTTP Client**: Axios

## Prerequisites

Before running this project, make sure you have:

- Node.js (v16 or higher)
- npm (v7 or higher)

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd political-sentiment-haus
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
VITE_REDDIT_CLIENT_ID=your_reddit_client_id
VITE_REDDIT_CLIENT_SECRET=your_reddit_client_secret
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Features in Detail

### Sentiment Analysis
- Analyzes Reddit posts using a combination of:
  - Post scores (upvotes/downvotes)
  - Content analysis
  - Historical data comparison

### Trend Visualization
- Monthly sentiment breakdowns
- Interactive tooltips with detailed information
- Customizable chart types
- Smooth animations and transitions

### Data Processing
- Groups posts by month
- Calculates sentiment percentages
- Handles loading and error states
- Real-time data updates

## Project Structure

```
src/
├── components/         # React components
│   ├── TrendChart.tsx # Main chart component
│   └── ui/            # UI components
├── lib/
│   ├── redditApi.ts   # Reddit API integration
│   └── utils.ts       # Utility functions
└── ...
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Reddit API for providing the data
- shadcn-ui for the beautiful components
- Recharts for the charting library
- The open-source community for their invaluable tools and libraries
