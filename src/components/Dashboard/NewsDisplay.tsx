import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material';

import { stockList } from '@/pages/stockList';
import '@/components/Dashboard/style.css';

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

const NewsFeed: React.FC = () => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedSymbol, setSelectedSymbol] = useState<string>('AAPL');

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      const today = new Date(); 
      const formatDate = (d: Date): string => d.toISOString().split('T')[0];

      async function fetchRange(daysBack: number): Promise<NewsArticle[]> {
        const fromDate = new Date();
        fromDate.setDate(today.getDate() - daysBack);
        const fromStr = formatDate(fromDate);

        try {
          const res = await fetch(
            `http://localhost:4000/api/news?symbol=${encodeURIComponent(selectedSymbol)}&from=${fromStr}&to=${formatDate(today)}`
          );

          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }

          const data = await res.json();

          if (Array.isArray(data) && data.every(isNewsArticle)) {
            return data;
          } else {
            console.warn('Invalid news data format');
            return [];
          }
        } catch (err) {
          console.error('Error fetching news:', err);
          return [];
        }
      }

      try {
        let daysBack = 7;
        let articles: NewsArticle[] = [];

        while (daysBack <= 180) {
          articles = await fetchRange(daysBack);
          if (articles.length > 0) break;
          daysBack *= 2;
        }

        setNews(articles);
      } finally {
        setLoading(false);
      }
    };

    if (selectedSymbol) {
      fetchNews();
    }
  }, [selectedSymbol]);

  const isNewsArticle = (item: any): item is NewsArticle => {
    return (
      typeof item.id === 'number' &&
      typeof item.headline === 'string' &&
      typeof item.summary === 'string' &&
      typeof item.datetime === 'number' &&
      typeof item.image === 'string' &&
      typeof item.url === 'string'
    );
  };

  return (
    <Box
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        maxHeight: 600,
        overflowY: 'auto',
      }}
    >
      <FormControl fullWidth>
        <InputLabel id="company-select-label">Company</InputLabel>
        <Select
          labelId="company-select-label"
          value={selectedSymbol}
          onChange={(e) => setSelectedSymbol(e.target.value)}
          label="Company"
        >
          {stockList.map((symbol: string) => (
            <MenuItem key={symbol} value={symbol}>
              {symbol}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {loading && (
        <Box sx={{ width: '100%', textAlign: 'center', mt: 2 }}>
          <CircularProgress />
        </Box>
      )}

      {!loading && news.length === 0 && (
        <Box sx={{ p: 2 }}>
          <Typography>No recent news available for {selectedSymbol}.</Typography>
        </Box>
      )}

      {!loading &&
        news.slice(0, 5).map((article) => (
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
};

export default NewsFeed;