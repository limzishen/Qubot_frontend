import React, { useRef } from 'react';
import Box from '@mui/material/Box'; 
import ListItem from '@mui/material/ListItem'; 
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { VariableSizeList, ListChildComponentProps } from 'react-window';
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

const getItemSize = (index: number) => 200;

function renderRow(props: ListChildComponentProps) {
  const { index, style } = props; 
  const stock = stocks[index]; 

  return (
    <ListItem style={style} key={index} component="div" disablePadding> 
      <ListItemButton sx={{ display:'flex', height: '100%', width: '100%'}}>
        <Box sx = {
          {
          display: 'flex', 
          flexDirection: "column", 
          width: '100%', 
          height: '100%'}
          } > 
          <StockCard symbol={stock.symbol}/> 
        </Box> 
      </ListItemButton>
    </ListItem> 
  ); 
}

export default function StockList() {
  const listRef = useRef<VariableSizeList>(null);
  return (
    <Box
      sx={{ width: '100%', bgcolor: 'background.paper' }}
    >
      <AutoSizer> 
        {({ height, width} : {height:any, width:any}) => (
        <VariableSizeList
        className="List"
        height={height}
        width={width}
        itemSize={getItemSize}
        itemCount={5}
        overscanCount={5}
      >
        {renderRow}
      </VariableSizeList>
        )}
      </AutoSizer>

    </Box>
  );
}