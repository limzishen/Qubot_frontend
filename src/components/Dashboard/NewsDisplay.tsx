import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
} from '@mui/material';


interface NewsArticle {
  id: number;
  category: string;
  datetime: number;
  headline: string;
  image: string;
  related: string;
  source: string;
  summary: string;
  url: string;
}

function NewsFeed({ symbol = 'AAPL' }) {
  const [news, setNews] = React.useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
    
  const today = new Date();
  const prior = new Date();
  prior.setDate(today.getDate() - 7);

  const formatDate = (d: Date): string => d.toISOString().split('T')[0];

useEffect(() => {
  const fetchNews = async () => {
    setLoading(true);

    const todayStr = formatDate(today);

    async function fetchRange(fromDate: Date) {
      const fromStr = formatDate(fromDate);
      const res = await fetch(`http://localhost:4000/api/news?symbol=${symbol}&from=${fromStr}&to=${todayStr}`);
      const data = await res.json();
      return Array.isArray(data) ? data : [];
    }

    try {
      let daysBack = 7;
      let articles: NewsArticle[] = [];

      while (daysBack <= 180) {
        const fromDate = new Date();
        fromDate.setDate(today.getDate() - daysBack);

        articles = await fetchRange(fromDate);
        if (articles.length > 0) break;

        daysBack *= 2;
      }

      setNews(articles);

    } catch (err) {
      console.error('Error fetching news:', err);
      setNews([]);
    } finally {
      setLoading(false);
    }
  };

  fetchNews();
}, [symbol]);


  if (loading) {
    return (
      <Box sx={{ width: '100%', textAlign: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (news.length === 0) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography>No recent news available for {symbol}.</Typography>
      </Box>
    );
  }

return (
  <Box
    sx={{
      height: '100%',
      maxHeight: 600,   
      overflowY: 'auto', 
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      p: 2,
    }}
  >
    {news.slice(0, 5).map((article) => (
      <Card
        key={article.id}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 2,
          boxShadow: 2,
          borderRadius: 2,
        }}
      >
        {article.image && (
          <CardMedia
            component="img"
            image={article.image}
            alt="news thumbnail"
            sx={{ width: 150, objectFit: 'cover', borderRadius: '8px 0 0 8px' }}
          />
        )}
        <CardContent sx={{ flex: 1 }}>
          <Typography variant="subtitle2" color="text.secondary">
            {new Date(article.datetime * 1000).toLocaleDateString()} • {article.source}
          </Typography>
          <Typography variant="h6" sx={{ mb: 1 }}>
            {article.headline}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {article.summary}
          </Typography>
        </CardContent>
      </Card>
    ))}
  </Box>
);
}

export default NewsFeed;
