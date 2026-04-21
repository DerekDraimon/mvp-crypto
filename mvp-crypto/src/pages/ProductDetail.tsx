import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Paper,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import useFetch from '../hooks/useFetch';

interface DetalleCripto {
  id: string;
  name: string;
  symbol: string;
  image: { large: string };
  market_data: {
    current_price: { usd: number };
    price_change_percentage_24h: number;
  };
}

interface Orden {
  id: string;
  tipo: 'compra' | 'venta';
  monto: number;
  cantidad: number;
  precio: number;
  fecha: string;
  simbolo: string;
}

const CASH_INICIAL = 10000;

function cargarEstado<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export default function ProductDetail() {
  const { id } = useParams();
  const { data, cargando, error } = useFetch<DetalleCripto>(
    `https://api.coingecko.com/api/v3/coins/${id}`
  );

  const storageKey = `trading_${id}`;

  const [inversion, setInversion] = useState('');
  const [operacion, setOperacion] = useState<'compra' | 'venta'>('compra');
  const [saldoBTC, setSaldoBTC] = useState<number>(() =>
    cargarEstado(`${storageKey}_saldoBTC`, 0)
  );
  const [cashUSD, setCashUSD] = useState<number>(() =>
    cargarEstado(`${storageKey}_cashUSD`, CASH_INICIAL)
  );
  const [historial, setHistorial] = useState<Orden[]>(() =>
    cargarEstado(`${storageKey}_historial`, [])
  );
  const [busqueda, setBusqueda] = useState('');

  if (cargando) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <CircularProgress color="warning" />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error">Error al cargar el producto: {error}</Typography>
    );
  }

  if (!data) return null;

  const precioActual = data.market_data.current_price.usd;
  const simbolo = data.symbol.toUpperCase();
  const valorEnUSD = saldoBTC * precioActual;

  const ejecutarOrden = () => {
    const montoNum = parseFloat(inversion);
    if (!montoNum || montoNum <= 0) return;

    let nuevoSaldoBTC = saldoBTC;
    let nuevoCash = cashUSD;

    if (operacion === 'compra') {
      if (montoNum > cashUSD) {
        alert('Saldo insuficiente en efectivo.');
        return;
      }
      nuevoSaldoBTC = saldoBTC + montoNum / precioActual;
      nuevoCash = cashUSD - montoNum;
    } else {
      const cantidadAVender = montoNum / precioActual;
      if (cantidadAVender > saldoBTC) {
        alert(`Saldo insuficiente en ${simbolo}.`);
        return;
      }
      nuevoSaldoBTC = saldoBTC - cantidadAVender;
      nuevoCash = cashUSD + montoNum;
    }

    setSaldoBTC(nuevoSaldoBTC);
    setCashUSD(nuevoCash);
    localStorage.setItem(`${storageKey}_saldoBTC`, JSON.stringify(nuevoSaldoBTC));
    localStorage.setItem(`${storageKey}_cashUSD`, JSON.stringify(nuevoCash));

    const nuevaOrden: Orden = {
      id: Date.now().toString(),
      tipo: operacion,
      monto: montoNum,
      cantidad: montoNum / precioActual,
      precio: precioActual,
      fecha: new Date().toLocaleString('es-AR'),
      simbolo,
    };

    const nuevoHistorial = [nuevaOrden, ...historial];
    setHistorial(nuevoHistorial);
    localStorage.setItem(`${storageKey}_historial`, JSON.stringify(nuevoHistorial));
    setInversion('');
  };

  const limpiarHistorial = () => {
    setHistorial([]);
    localStorage.removeItem(`${storageKey}_historial`);
  };

  const historialFiltrado = historial.filter((orden) =>
    orden.tipo.toLowerCase().includes(busqueda.toLowerCase()) ||
    orden.simbolo.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}>

      {/* Columna izquierda */}
      <Box sx={{ width: '38%', minWidth: 280, display: 'flex', flexDirection: 'column', gap: 2 }}>

        {/* Tarjeta de saldo */}
        <Paper elevation={3} sx={{ bgcolor: 'primary.main', borderRadius: 2, p: 3 }}>
          <Typography
            variant="caption"
            sx={{ color: 'primary.contrastText', opacity: 0.7, letterSpacing: 1, fontWeight: 500 }}
          >
            SALDO EN {simbolo} ({simbolo})
          </Typography>
          <Typography
            variant="h4"
            sx={{ fontWeight: 'bold', mt: 1, mb: 0.5, color: 'primary.contrastText', lineHeight: 1.2 }}
          >
            {saldoBTC.toFixed(8)}<br />{simbolo}
          </Typography>
          <Typography variant="body2" sx={{ color: 'primary.contrastText', opacity: 0.7, mt: 1 }}>
            ≈ ${valorEnUSD.toLocaleString('en-US', { maximumFractionDigits: 2 })} USD&nbsp;|&nbsp;Cash: ${cashUSD.toLocaleString('en-US', { maximumFractionDigits: 2 })}
          </Typography>
        </Paper>

        {/* Formulario */}
        <Paper variant="outlined" sx={{ borderRadius: 2, p: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            Operar Mercado
          </Typography>

          <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
            Inversión (USD)
          </Typography>
          <TextField
            fullWidth
            type="number"
            placeholder="Monto en Dólares"
            value={inversion}
            onChange={(e) => setInversion(e.target.value)}
            size="small"
            sx={{ mb: 2 }}
            inputProps={{ min: 0 }}
          />

          <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
            Precio Actual {simbolo}
          </Typography>
          <TextField
            fullWidth
            value={`$${precioActual.toLocaleString('en-US')}`}
            size="small"
            disabled
            sx={{ mb: 2 }}
          />

          <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
            Operación
          </Typography>
          <FormControl fullWidth size="small" sx={{ mb: 3 }}>
            <Select
              value={operacion}
              onChange={(e) => setOperacion(e.target.value as 'compra' | 'venta')}
            >
              <MenuItem value="compra">Comprar {data.name}</MenuItem>
              <MenuItem value="venta">Vender {data.name}</MenuItem>
            </Select>
          </FormControl>

          <Button
            fullWidth
            variant="contained"
            color="warning"
            size="large"
            onClick={ejecutarOrden}
            sx={{ fontWeight: 'bold' }}
          >
            Ejecutar Orden
          </Button>
        </Paper>
      </Box>

      {/* Columna derecha */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            Historial de Movimientos
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <TextField
              size="small"
              placeholder="Buscar por categoría..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant="outlined"
              size="small"
              color="inherit"
              onClick={limpiarHistorial}
              sx={{ whiteSpace: 'nowrap' }}
            >
              Limpiar Historial
            </Button>
          </Box>
        </Box>

        {historialFiltrado.length === 0 ? (
          <Box
            sx={{
              border: '2px dashed',
              borderColor: 'divider',
              borderRadius: 2,
              p: 6,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="body1" color="text.secondary">
              No hay órdenes ejecutadas.
            </Typography>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {historialFiltrado.map((orden) => (
              <Paper key={orden.id} variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', textTransform: 'capitalize' }}>
                      {orden.tipo === 'compra' ? '🟢' : '🔴'} {orden.tipo} {orden.simbolo}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {orden.fecha}
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      ${orden.monto.toLocaleString('en-US', { maximumFractionDigits: 2 })} USD
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {orden.cantidad.toFixed(8)} {orden.simbolo} @ ${orden.precio.toLocaleString('en-US')}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
}
