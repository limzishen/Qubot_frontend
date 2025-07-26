import React, { useEffect, useState } from 'react';
import { FinnhubStockData } from '@/types/FinnhubStockData';
import './style.css'; 

interface StockCardProps {
  symbol: string;
}

const StockCard: React.FC<StockCardProps> = ({ symbol }) => {
  const [data, setData] = useState<FinnhubStockData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const baseURL = `https://qubot-backend.vercel.app/`

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseURL}api/stocks?symbol=${symbol}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const result: FinnhubStockData = await response.json();
        setData(result);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000) as unknown as NodeJS.Timeout;
    return () => clearInterval(interval);
  }, [symbol]);

  if (loading) return <p className="message">Loading...</p>;
  if (error) return <p className="message">Error: {error}</p>;

  return (
  <div className="stock-card">
    <h2 className="symbol">{symbol}</h2>
    <p className="price">${data?.c.toFixed(2)}</p>
    <p className={`change ${data && data.d > 0 ? 'positive' : 'negative'}`}>
      {data?.d} ({data?.dp}%)
    </p>
    <div className="details">
      <p className="details">High: ${data?.h}</p>
      <p className="details">Low: ${data?.l}</p>
      <p className="details">Open: ${data?.o}</p>
      <p className="details">Prev Close: ${data?.pc}</p>
    </div>
  </div>
  );
};

export default StockCard;