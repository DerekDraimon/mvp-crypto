import { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  TextField,
  InputAdornment,
  Chip,
  Snackbar,
  Alert,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import useFetch from '../hooks/useFetch';

interface PokemonListItem {
  name: string;
  url: string;
}

interface PokemonListResponse {
  count: number;
  results: PokemonListItem[];
}

interface ItemCarrito {
  id: string;
  name: string;
  symbol: string;
  precio: number;
  imagen: string;
}

function extraerIdDeUrl(url: string): number {
  const partes = url.split('/').filter(Boolean);
  return parseInt(partes[partes.length - 1], 10);
}

function getSpriteUrl(id: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

function generarPrecio(id: number): number {
  // Precio determinístico basado en ID: rango $50 - $999
  return Math.round(50 + ((id * 137 + 23) % 950));
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function leerCarrito(): ItemCarrito[] {
  try {
    return JSON.parse(localStorage.getItem('carrito') || '[]');
  } catch {
    return [];
  }
}

function agregarAlCarrito(item: ItemCarrito): boolean {
  const carrito = leerCarrito();
  if (carrito.some((c) => c.id === item.id)) return false;
  carrito.push(item);
  localStorage.setItem('carrito', JSON.stringify(carrito));
  return true;
}

const URL_POKEMON = 'https://pokeapi.co/api/v2/pokemon?limit=151';

export default function Pokemon() {
  const { data, cargando, error } = useFetch<PokemonListResponse>(URL_POKEMON);

  const idsEnCarrito = useMemo(
    () => new Set(leerCarrito().map((c) => c.id)),
    []
  );

  const [agregados, setAgregados] = useState<Set<string>>(idsEnCarrito);
  const [busqueda, setBusqueda] = useState('');
  const [snackbarAbierto, setSnackbarAbierto] = useState(false);

  const pokemones = useMemo(() => {
    if (!data?.results) return [];
    return data.results.map((p) => {
      const id = extraerIdDeUrl(p.url);
      return {
        id: String(id),
        name: capitalize(p.name),
        numero: `#${String(id).padStart(3, '0')}`,
        precio: generarPrecio(id),
        imagen: getSpriteUrl(id),
        symbol: `#${String(id).padStart(3, '0')}`,
      };
    });
  }, [data]);

  const pokemonesFiltrados = useMemo(() => {
    const q = busqueda.toLowerCase().trim();
    if (!q) return pokemones;
    return pokemones.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.numero.includes(q)
    );
  }, [pokemones, busqueda]);

  const handleAgregar = (pokemon: typeof pokemones[0]) => {
    const agregado = agregarAlCarrito({
      id: pokemon.id,
      name: pokemon.name,
      symbol: pokemon.symbol,
      precio: pokemon.precio,
      imagen: pokemon.imagen,
    });
    if (agregado) {
      setAgregados((prev) => new Set(prev).add(pokemon.id));
      setSnackbarAbierto(true);
    }
  };

  if (cargando) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error">Error al cargar los Pokémon: {error}</Typography>
    );
  }

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 0.5 }}>
        Mercado Pokémon
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        {pokemones.length} Pokémon disponibles · Generación I
      </Typography>

      <TextField
        placeholder="Buscar por nombre o número..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        size="small"
        sx={{ mb: 3, width: 320 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="small" />
            </InputAdornment>
          ),
        }}
      />

      <Grid container spacing={2}>
        {pokemonesFiltrados.map((pokemon) => {
          const enCarrito = agregados.has(pokemon.id);
          return (
            <Grid item xs={6} sm={4} md={3} lg={2} key={pokemon.id}>
              <Card sx={{
                borderRadius: 3,
                textAlign: 'center',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'box-shadow 0.2s',
                '&:hover': { boxShadow: '0 4px 20px rgba(0,0,0,0.25)' },
              }}>
                <CardMedia
                  component="img"
                  image={pokemon.imagen}
                  alt={pokemon.name}
                  loading="lazy"
                  sx={{
                    width: 96,
                    height: 96,
                    mx: 'auto',
                    mt: 2,
                    objectFit: 'contain',
                  }}
                />
                <CardContent sx={{
                  pt: 1,
                  pb: '12px !important',
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}>
                  <Box>
                    <Typography variant="caption" color="text.secondary" display="block">
                      {pokemon.numero}
                    </Typography>
                    <Typography variant="body2" fontWeight={700} sx={{ mb: 1 }}>
                      {pokemon.name}
                    </Typography>
                    <Chip
                      label={`$${pokemon.precio.toLocaleString()}`}
                      size="small"
                      color="warning"
                      sx={{ fontWeight: 700, mb: 1.5, fontSize: '0.7rem' }}
                    />
                  </Box>
                  <Button
                    fullWidth
                    variant={enCarrito ? 'outlined' : 'contained'}
                    size="small"
                    color={enCarrito ? 'success' : 'primary'}
                    startIcon={<ShoppingCartIcon sx={{ fontSize: '14px !important' }} />}
                    onClick={() => handleAgregar(pokemon)}
                    disabled={enCarrito}
                    sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600, fontSize: '0.7rem' }}
                  >
                    {enCarrito ? 'Agregado' : 'Agregar'}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      <Snackbar
        open={snackbarAbierto}
        autoHideDuration={2000}
        onClose={() => setSnackbarAbierto(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          severity="success"
          onClose={() => setSnackbarAbierto(false)}
          sx={{ fontWeight: 600 }}
        >
          ¡Pokémon agregado al carrito!
        </Alert>
      </Snackbar>
    </Box>
  );
}
