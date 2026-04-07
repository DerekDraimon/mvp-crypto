import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  CircularProgress,
} from '@mui/material';
import useFetch from '../hooks/useFetch';

interface Cripto {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  image: string;
  price_change_percentage_24h: number;
  market_cap: number;
}

const URL_COINGECKO =
  'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1';

export default function Products() {
  const { data, cargando, error } = useFetch<Cripto[]>(URL_COINGECKO);
  const navigate = useNavigate();

  if (cargando) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error">Error al cargar los productos: {error}</Typography>
    );
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
        Comprar Criptomonedas
      </Typography>
      <Grid container spacing={2}>
        {data?.map((cripto) => (
          <Grid item xs={12} sm={6} md={4} key={cripto.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, gap: 1 }}>
                  <img src={cripto.image} alt={cripto.name} width={32} />
                  <Typography variant="h6">{cripto.name}</Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    {cripto.symbol.toUpperCase()}
                  </Typography>
                </Box>

                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  ${cripto.current_price.toLocaleString()}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    color:
                      cripto.price_change_percentage_24h >= 0
                        ? 'success.main'
                        : 'error.main',
                    mb: 1,
                  }}
                >
                  {cripto.price_change_percentage_24h.toFixed(2)}% (24h)
                </Typography>

                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => navigate(`/product/${cripto.id}`)}
                >
                  Ver Más
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
