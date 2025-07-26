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
  Link,
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
  const uniqueNews = Array.from(new Set(news.map(article => article.id))).map(id => {
    return news.find(article => article.id === id);
  }).filter((article): article is NewsArticle => article !== undefined);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      const today = new Date(); 
      const formatDate = (d: Date): string => d.toISOString().split('T')[0];
      const baseURL = `https://qubot-backend.vercel.app/`

      async function fetchRange(daysBack: number): Promise<NewsArticle[]> {
        const fromDate = new Date();
        fromDate.setDate(today.getDate() - daysBack);
        const fromStr = formatDate(fromDate);

        try {
          const res = await fetch(
            `${baseURL}api/news?symbol=${encodeURIComponent(selectedSymbol)}&from=${fromStr}&to=${formatDate(today)}`
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
        maxHeight: 850,
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
        uniqueNews.slice(0, 5).map((article) => (
          <Link
            key={article.id}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            underline="none"
            sx={{
              borderRadius: 2,
              '&:hover': {
                boxShadow: 3,
              },
            }}
          >
            <Card
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 2,
                boxShadow: 2,
                borderRadius: 2,
                alignItems: 'stretch',
                cursor: 'pointer',
                transition: 'box-shadow 0.2s',
              }}
            >
              {article.image && (
                <CardMedia
                  component="img"
                  image={article.image}
                  alt="news thumbnail"
                  sx={{ 
                    width: { sm: 150 },
                    height: { sm: 'auto' },
                    objectFit: 'cover',
                    borderRadius: { xs: '8px 8px 0 0', sm: '8px 0 0 8px' }
                  }}
                />
              )}
              <CardContent sx={{ 
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    {new Date(article.datetime * 1000).toLocaleDateString()} • {article.source}
                  </Typography>
                  <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
                    {article.headline}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {article.summary}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Link>
        ))}
    </Box>
  );
};

export default NewsFeed;