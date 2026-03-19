import type { ReactNode } from 'react';
import { Card as MuiCard, CardContent, Typography, CardActions, Box } from '@mui/material';

interface PropsTarjetaCripto {
  titulo: string;
  precio: string;
  cambio: string;
  esPositivo: boolean;
  accion?: ReactNode;
}

export default function TarjetaCripto({ titulo, precio, cambio, esPositivo, accion }: PropsTarjetaCripto) {
  return (
    <MuiCard sx={{ 
      minWidth: 275, 
      mb: 2, 
      borderRadius: 4,
      backgroundImage: 'none',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      transition: 'transform 0.2s ease-in-out',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 6px 16px rgba(0,0,0,0.15)',
      }
    }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {titulo}
        </Typography>
        <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', my: 1 }}>
          {precio}
        </Typography>
        <Typography sx={{ color: esPositivo ? 'success.main' : 'error.main', fontWeight: '500' }}>
          {esPositivo ? '▲' : '▼'} {cambio}
        </Typography>
      </CardContent>
      {accion && (
        <CardActions>
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', px: 1, pb: 1 }}>
            {accion}
          </Box>
        </CardActions>
      )}
    </MuiCard>
  );
}
