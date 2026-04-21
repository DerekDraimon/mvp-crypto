import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  Avatar,
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

function formatMarketCap(value: number): string {
  if (value >= 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(2)}B`;
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(2)}M`;
  return `$${value.toLocaleString()}`;
}

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
      <Typography color="error">Error al cargar las criptomonedas: {error}</Typography>
    );
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 1, fontWeight: 'bold' }}>
        Mercado de Criptomonedas
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Top 20 por capitalización de mercado
      </Typography>

      <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ '& th': { fontWeight: 700, color: 'text.secondary', fontSize: '0.75rem', letterSpacing: 0.5 } }}>
              <TableCell width={48}>#</TableCell>
              <TableCell>ACTIVO</TableCell>
              <TableCell align="right">PRECIO</TableCell>
              <TableCell align="right">CAMBIO 24H</TableCell>
              <TableCell align="right">CAP. DE MERCADO</TableCell>
              <TableCell align="right" width={120} />
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((cripto, index) => {
              const esPositivo = cripto.price_change_percentage_24h >= 0;
              return (
                <TableRow
                  key={cripto.id}
                  hover
                  sx={{ cursor: 'pointer', '&:last-child td': { border: 0 } }}
                  onClick={() => navigate(`/product/${cripto.id}`)}
                >
                  <TableCell>
                    <Typography variant="body2" color="text.secondary" fontWeight={600}>
                      {index + 1}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Avatar src={cripto.image} alt={cripto.name} sx={{ width: 32, height: 32 }} />
                      <Box>
                        <Typography variant="body2" fontWeight={600}>{cripto.name}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {cripto.symbol.toUpperCase()}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>

                  <TableCell align="right">
                    <Typography variant="body2" fontWeight={700}>
                      ${cripto.current_price.toLocaleString('en-US')}
                    </Typography>
                  </TableCell>

                  <TableCell align="right">
                    <Chip
                      label={`${esPositivo ? '▲' : '▼'} ${Math.abs(cripto.price_change_percentage_24h).toFixed(2)}%`}
                      color={esPositivo ? 'success' : 'error'}
                      size="small"
                      sx={{ fontWeight: 600, fontSize: '0.7rem', height: 22 }}
                    />
                  </TableCell>

                  <TableCell align="right">
                    <Typography variant="body2" color="text.secondary">
                      {formatMarketCap(cripto.market_cap)}
                    </Typography>
                  </TableCell>

                  <TableCell align="right" onClick={(e) => e.stopPropagation()}>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => navigate(`/product/${cripto.id}`)}
                      sx={{ fontWeight: 600, borderRadius: 2, textTransform: 'none' }}
                    >
                      Operar
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
