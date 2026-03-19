import type { ReactNode } from 'react';
import { Paper, Typography, Box } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

export default function PanelInfo({ titulo, children }: { titulo: string, children: ReactNode }) {
  return (
    <Paper 
      elevation={0} 
      sx={{ 
        p: 2, 
        mb: 2,
        backgroundColor: 'info.light', 
        color: 'info.contrastText',
        borderRadius: 4,
        display: 'flex',
        alignItems: 'flex-start',
        gap: 1.5,
        backgroundImage: 'none'
      }}
    >
      <InfoIcon sx={{ mt: 0.5 }} />
      <Box>
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          {titulo}
        </Typography>
        <Typography variant="body2">
          {children}
        </Typography>
      </Box>
    </Paper>
  );
}
