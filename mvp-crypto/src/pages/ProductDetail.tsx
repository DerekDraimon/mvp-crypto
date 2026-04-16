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
      <Box>
        <CircularProgress />
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
    <Box>

      {/* Columna izquierda */}
      <Box>

        {/* Tarjeta de saldo */}
        <Paper elevation={3}>
          <Typography variant="caption">
            SALDO EN {simbolo} ({simbolo})
          </Typography>
          <Typography variant="h4">
            {saldoBTC.toFixed(8)} {simbolo}
          </Typography>
          <Typography variant="body2">
            ≈ ${valorEnUSD.toLocaleString('en-US', { maximumFractionDigits: 2 })} USD | Cash: ${cashUSD.toLocaleString('en-US', { maximumFractionDigits: 2 })}
          </Typography>
        </Paper>

        {/* Formulario */}
        <Paper variant="outlined">
          <Typography variant="h6">Operar Mercado</Typography>

          <Typography variant="body2">Inversión (USD)</Typography>
          <TextField
            fullWidth
            type="number"
            placeholder="Monto en Dólares"
            value={inversion}
            onChange={(e) => setInversion(e.target.value)}
            size="small"
            inputProps={{ min: 0 }}
          />

          <Typography variant="body2">Precio Actual {simbolo}</Typography>
          <TextField
            fullWidth
            value={`$${precioActual.toLocaleString('en-US')}`}
            size="small"
            disabled
          />

          <Typography variant="body2">Operación</Typography>
          <FormControl fullWidth size="small">
            <Select
              value={operacion}
              onChange={(e) => setOperacion(e.target.value as 'compra' | 'venta')}
            >
              <MenuItem value="compra">Comprar {data.name}</MenuItem>
              <MenuItem value="venta">Vender {data.name}</MenuItem>
            </Select>
          </FormControl>

          <Button fullWidth variant="contained" color="warning" size="large" onClick={ejecutarOrden}>
            Ejecutar Orden
          </Button>
        </Paper>
      </Box>

      {/* Columna derecha */}
      <Box>
        <Box>
          <Typography variant="h5">Historial de Movimientos</Typography>
          <Box>
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
            <Button variant="outlined" size="small" color="inherit" onClick={limpiarHistorial}>
              Limpiar Historial
            </Button>
          </Box>
        </Box>

        {historialFiltrado.length === 0 ? (
          <Box>
            <Typography variant="body1" color="text.secondary">
              No hay órdenes ejecutadas.
            </Typography>
          </Box>
        ) : (
          <Box>
            {historialFiltrado.map((orden) => (
              <Paper key={orden.id} variant="outlined">
                <Box>
                  <Box>
                    <Typography variant="body2">
                      {orden.tipo === 'compra' ? '🟢' : '🔴'} {orden.tipo} {orden.simbolo}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {orden.fecha}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2">
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
