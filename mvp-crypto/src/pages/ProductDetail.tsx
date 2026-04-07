import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Paper,
  Divider,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import useFetch from '../hooks/useFetch';

interface DetalleCripto {
  id: string;
  name: string;
  symbol: string;
  image: { large: string };
  description: { en: string };
  market_data: {
    current_price: { usd: number };
    market_cap: { usd: number };
    price_change_percentage_24h: number;
    total_volume: { usd: number };
  };
}

interface ItemCarrito {
  id: string;
  name: string;
  symbol: string;
  precio: number;
  imagen: string;
}

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, cargando, error } = useFetch<DetalleCripto>(
    `https://api.coingecko.com/api/v3/coins/${id}`
  );

  const agregarAlCarrito = () => {
    if (!data) return;

    const carrito: ItemCarrito[] = JSON.parse(
      localStorage.getItem('carrito') || '[]'
    );

    const item: ItemCarrito = {
      id: data.id,
      name: data.name,
      symbol: data.symbol,
      precio: data.market_data.current_price.usd,
      imagen: data.image.large,
    };

    carrito.push(item);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    alert(`${data.name} agregado al carrito`);
  };

  if (cargando) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography color="error">Error al cargar el producto: {error}</Typography>;
  }

  if (!data) return null;

  const cambio24h = data.market_data.price_change_percentage_24h;

  return (
    <Box sx={{ maxWidth: 640 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/products')}
        sx={{ mb: 2 }}
      >
        Volver al catálogo
      </Button>

      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <img src={data.image.large} alt={data.name} width={72} />
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              {data.name}
            </Typography>
            <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
              {data.symbol.toUpperCase()}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ mb: 2 }} />

        <Typography variant="h5" sx={{ mb: 1 }}>
          ${data.market_data.current_price.usd.toLocaleString()}
        </Typography>

        <Typography
          variant="body1"
          sx={{ color: cambio24h >= 0 ? 'success.main' : 'error.main', mb: 1 }}
        >
          {cambio24h >= 0 ? '+' : ''}{cambio24h.toFixed(2)}% en las últimas 24h
        </Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 0.5 }}>
          Market Cap: ${data.market_data.market_cap.usd.toLocaleString()}
        </Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
          Volumen 24h: ${data.market_data.total_volume.usd.toLocaleString()}
        </Typography>

        <Button variant="contained" color="primary" size="large" onClick={agregarAlCarrito}>
          Agregar al Carrito
        </Button>
      </Paper>
    </Box>
  );
}
