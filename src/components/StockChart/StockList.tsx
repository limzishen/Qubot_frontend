import React, { useState, useRef } from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { VariableSizeList, ListChildComponentProps } from 'react-window';
import { Stock } from '@/types/StockType';
import StockCard from './StockCard';
import AutoSizer from 'react-virtualized-auto-sizer';
import './style.css';
import {
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Button,
  IconButton
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { stockList } from '@/pages/stockList';
import { useNavigate } from 'react-router-dom'; 

const stockNames: Record<string, string> = {
  'AAPL': 'Apple Inc.',
  'MSFT': 'Microsoft Corporation',
  'AMZN': 'Amazon.com Inc.',
  'GOOGL': 'Alphabet Inc.',
  'GOOG': 'Alphabet Inc.',
  'TSLA': 'Tesla Inc.',
};

const DEFAULT_STOCKS: Stock[] = [
  { symbol: 'AAPL', name: 'Apple Inc.' },
  { symbol: 'TSLA', name: 'Tesla Inc.' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.' },
  { symbol: 'MSFT', name: 'Microsoft Corporation' },
];

const getItemSize = (index: number) => 200;

interface StockListProps {
  stocks?: Stock[];
}

function renderRow(props: ListChildComponentProps & { stocks: Stock[], onRemoveStock: (symbol: string) => void, navigate: ReturnType<typeof useNavigate> }) {
  const { index, style, stocks, onRemoveStock, navigate } = props; 
  const stock = stocks[index];

  return (
    <ListItem style={style} key={index} component="div" disablePadding>
      <ListItemButton
        sx={{ display: 'flex', height: '100%', width: '100%', position: 'relative' }}
        onClick={() => {
          navigate('/dashboard', { state: { selectedTicker: stock.symbol } });
        }}
      >
        <IconButton
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            zIndex: 10,
            backgroundColor: 'rgba(3, 3, 3, 0.9)',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 1)',
            },
          }}
          onClick={(e) => {
            e.stopPropagation(); 
            onRemoveStock(stock.symbol);
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
        <Box sx={{
          display: 'flex',
          flexDirection: "column",
          width: '100%',
          height: '100%'
        }}>
          <StockCard symbol={stock.symbol} />
        </Box>
      </ListItemButton>
    </ListItem>
  );
}

export default function StockList({ stocks: initialStocks = DEFAULT_STOCKS }: StockListProps) {
  const listRef = useRef<VariableSizeList>(null);
  const [watchlist, setWatchlist] = useState<Stock[]>(initialStocks);
  const [selectedSymbol, setSelectedSymbol] = useState<string>('');

  const navigate = useNavigate();

  const handleAddStock = () => {
    if (selectedSymbol && !watchlist.some(stock => stock.symbol === selectedSymbol)) {
      const stockName = stockNames[selectedSymbol] || selectedSymbol;
      setWatchlist(prev => [
        ...prev,
        { symbol: selectedSymbol, name: stockName }
      ]);
      setSelectedSymbol('');
    }
  };

  const handleRemoveStock = (symbol: string) => {
    setWatchlist(prev => prev.filter(stock => stock.symbol !== symbol));
  };

  const handleSymbolChange = (event: SelectChangeEvent<string>) => {
    setSelectedSymbol(event.target.value);
  };

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ p: 2, display: 'flex', gap: 2, alignItems: 'center' }}>
        <FormControl fullWidth sx={{ minWidth: 200 }}>
          <InputLabel id="company-select-label">Add Stock</InputLabel>
          <Select
            labelId="company-select-label"
            value={selectedSymbol}
            onChange={handleSymbolChange}
            label="Add Stock"
            size="small"
          >
            {stockList
              .filter(symbol => !watchlist.some(stock => stock.symbol === symbol))
              .map((symbol: string) => (
                <MenuItem key={symbol} value={symbol}>
                  {symbol}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          onClick={handleAddStock}
          disabled={!selectedSymbol}
        >
          Add
        </Button>
      </Box>

      <Box sx={{ flex: 1 }}>
        {watchlist.length > 0 ? (
          <AutoSizer>
            {({ height, width }: { height: any; width: any }) => (
              <VariableSizeList
                className="List"
                height={height}
                width={width}
                itemSize={getItemSize}
                itemCount={watchlist.length}
                overscanCount={5}
              >
                {(props) => renderRow({ ...props, stocks: watchlist, onRemoveStock: handleRemoveStock, navigate })}
              </VariableSizeList>
            )}
          </AutoSizer>
        ) : (
          <Box sx={{ p: 2, textAlign: 'center' }}>
            <Typography>Add stocks to your watchlist to get started</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}