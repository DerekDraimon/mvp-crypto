import type { ReactNode } from 'react';
import { Card as MuiCard, CardContent, Typography, Box, Avatar, Chip } from '@mui/material';

interface PropsTarjetaCripto {
  nombre: string;
  simbolo: string;
  precio: string;
  cambio: string;
  esPositivo: boolean;
  accion?: ReactNode;
}

export default function TarjetaCripto({ nombre, simbolo, precio, cambio, esPositivo, accion }: PropsTarjetaCripto) {
  return (
    <MuiCard sx={{
      borderRadius: 3,
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      transition: 'box-shadow 0.2s ease-in-out',
      '&:hover': {
        boxShadow: '0 4px 16px rgba(0,0,0,0.14)',
      },
    }}>
      <CardContent sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        py: 2,
        '&:last-child': { pb: 2 },
      }}>
        <Avatar sx={{
          bgcolor: 'primary.main',
          fontWeight: 'bold',
          width: 44,
          height: 44,
          fontSize: 12,
          letterSpacing: 0.5,
        }}>
          {simbolo}
        </Avatar>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography fontWeight={600} noWrap>{nombre}</Typography>
          <Typography variant="caption" color="text.secondary">{simbolo}</Typography>
        </Box>

        <Box sx={{ textAlign: 'right' }}>
          <Typography variant="h6" fontWeight={700} sx={{ lineHeight: 1.2 }}>
            {precio}
          </Typography>
          <Chip
            label={`${esPositivo ? '▲' : '▼'} ${cambio}`}
            color={esPositivo ? 'success' : 'error'}
            size="small"
            sx={{ fontWeight: 600, fontSize: '0.7rem', height: 22, mt: 0.5 }}
          />
        </Box>

        {accion && (
          <Box sx={{ ml: 1, flexShrink: 0 }}>
            {accion}
          </Box>
        )}
      </CardContent>
    </MuiCard>
  );
}
