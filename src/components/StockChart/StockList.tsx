// StockList.tsx
import React, { useState } from 'react';
import { Stock } from '@/types/StockType';
import StockCard from './StockCard';

const stocks: Stock[] = [
  { symbol: 'AAPL', name: 'Apple Inc.' },
  { symbol: 'TSLA', name: 'Tesla Inc.' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.' },
  { symbol: 'MSFT', name: 'Microsoft Corporation' },
];

const StockList: React.FC = () => {
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);

  return (
    <div className="stock-dashboard">
      <h1>Select a Stock</h1>
      
      {/* Button Grid */}
      <div className="stock-buttons">
        {stocks.map((stock) => (
          <button
            key={stock.symbol}
            className={`stock-button ${selectedStock?.symbol === stock.symbol ? 'selected' : ''}`}
            onClick={() => setSelectedStock(stock)}
          >
            {stock.name} ({stock.symbol})
          </button>
        ))}
      </div>

      {/* Full View Card */}
      <div className="stock-card-container">
        {selectedStock && <StockCard symbol={selectedStock.symbol} />}
      </div>
    </div>
  );
};

export default StockList;