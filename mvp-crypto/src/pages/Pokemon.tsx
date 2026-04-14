import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Chip,
  CircularProgress,
  Alert,
} from '@mui/material';

interface Habilidad {
  ability: { name: string };
}

interface DatosPokemon {
  name: string;
  sprites: { front_default: string; other: { 'official-artwork': { front_default: string } } };
  abilities: Habilidad[];
}

export default function Pokemon() {
  const [pokemon, setPokemon] = useState<DatosPokemon | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon/gengar')
      .then((r) => r.json())
      .then((data) => {
        setPokemon(data);
        setCargando(false);
      })
      .catch((err) => {
        setError(err.message);
        setCargando(false);
      });
  }, []);

  if (cargando) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">Error al cargar el Pokémon: {error}</Alert>
      </Box>
    );
  }

  if (!pokemon) return null;

  const imagen =
    pokemon.sprites.other?.['official-artwork']?.front_default ||
    pokemon.sprites.front_default;

  return (
    <Box sx={{ p: 3, display: 'flex', justifyContent: 'center' }}>
      <Card sx={{ maxWidth: 320, width: '100%' }}>
        <CardMedia
          component="img"
          image={imagen}
          alt={pokemon.name}
          sx={{ width: 200, height: 200, objectFit: 'contain', mx: 'auto', mt: 2 }}
        />
        <CardContent>
          <Typography variant="h5" fontWeight="bold" textAlign="center" sx={{ textTransform: 'capitalize', mb: 2 }}>
            {pokemon.name}
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
            Habilidades
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {pokemon.abilities.map(({ ability }) => (
              <Chip
                key={ability.name}
                label={ability.name}
                size="small"
                color="primary"
                variant="outlined"
                sx={{ textTransform: 'capitalize' }}
              />
            ))}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
