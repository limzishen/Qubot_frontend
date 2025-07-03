import React, { ReactNode } from 'react';
import { Box, SxProps, Theme } from '@mui/material';

type RectangleRegionProps = {
  children?: ReactNode;
  sx?: SxProps<Theme>;
};

export default function RectangleRegion({ children, sx }: RectangleRegionProps) {
  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        boxShadow: 1,
        borderRadius: 2,
        p: 2,
        minWidth: 300,
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}