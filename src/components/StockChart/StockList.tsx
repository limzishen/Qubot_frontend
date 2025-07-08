import React, { useState } from 'react';
import Box from '@mui/material/Box'; 
import ListItem from '@mui/material/ListItem'; 
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { Stock } from '@/types/StockType';
import StockCard from './StockCard';
import AutoSizer from 'react-virtualized-auto-sizer'; 
import './style.css'; 
import { Typography } from '@mui/material';
import { Height } from '@mui/icons-material';

const stocks: Stock[] = [
  { symbol: 'AAPL', name: 'Apple Inc.' },
  { symbol: 'TSLA', name: 'Tesla Inc.' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.' },
  { symbol: 'MSFT', name: 'Microsoft Corporation' },
];

function renderRow(props: ListChildComponentProps) {
  const { index, style } = props; 
  const stock = stocks[index]; 

  return (
    <ListItem style={style} key={index} component="div" disablePadding> 
      <ListItemButton sx={{ display:'flex', height: '100%', width: '100%'}}>
        <Box flexDirection="column" width='100%' height='100%'> 
          <StockCard symbol={stock.symbol}/> 
        </Box> 
      </ListItemButton>
    </ListItem> 
  ); 
}

export default function StockList() {
  return (
    <Box
      sx={{ width: '100%', bgcolor: 'background.paper' }}
    >
      <AutoSizer> 
        {({ height, width} : {height:any, width:any}) => (
        <FixedSizeList
        className="List"
        height={height}
        width={width}
        itemSize={100}
        itemCount={5}
        overscanCount={5}
      >
        {renderRow}
      </FixedSizeList>
        )}
      </AutoSizer>

    </Box>
  );
}

/*
const StockList: React.FC = () => {
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);

  return (
    <div className="stock-dashboard">
      <h1>Select a Stock</h1>
      
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

      <div className="stock-card-container">
        {selectedStock && <StockCard symbol={selectedStock.symbol} />}
      </div>
    </div>
  );
};

export default StockList;
*/