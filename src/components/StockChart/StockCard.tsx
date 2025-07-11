import React, { useEffect, useState } from 'react';
import { FinnhubStockData } from '@/types/FinnhubStockData';

interface StockCardProps {
  symbol: string;
}

const StockCard: React.FC<StockCardProps> = ({ symbol }) => {
  const [data, setData] = useState<FinnhubStockData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/stocks?symbol=${symbol}`);
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
    const interval = setInterval(fetchData, 5000) as unknown as NodeJS.Timeout;
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
      <p>High: ${data?.h}</p>
      <p>Low: ${data?.l}</p>
      <p className="open">Open: ${data?.o}</p>
      <p>Prev Close: ${data?.pc}</p>
    </div>
  </div>
  );
};

export default StockCard;