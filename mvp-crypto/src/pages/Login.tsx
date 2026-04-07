import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
} from '@mui/material';

const USUARIO_VALIDO = 'admin';
const CONTRASENA_VALIDA = '1234';

export default function Login() {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const isLogged = localStorage.getItem('isLogged') === 'true';
  if (isLogged) return <Navigate to="/panel" />;

  const manejarLogin = () => {
    if (usuario === USUARIO_VALIDO && contrasena === CONTRASENA_VALIDA) {
      localStorage.setItem('isLogged', 'true');
      navigate('/panel');
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        bgcolor: 'background.default',
      }}
    >
      <Paper sx={{ p: 4, width: 360 }}>
        <Typography
          variant="h5"
          sx={{ mb: 1, fontWeight: 'bold', textAlign: 'center', color: 'primary.main' }}
        >
          Crypto MVP
        </Typography>
        <Typography
          variant="body2"
          sx={{ mb: 3, textAlign: 'center', color: 'text.secondary' }}
        >
          Ingresa tus credenciales para continuar
        </Typography>

        <TextField
          label="Usuario"
          fullWidth
          sx={{ mb: 2 }}
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
        />
        <TextField
          label="Contraseña"
          type="password"
          fullWidth
          sx={{ mb: 2 }}
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && manejarLogin()}
        />

        {error && (
          <Typography color="error" variant="body2" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        <Button variant="contained" fullWidth onClick={manejarLogin}>
          Ingresar
        </Button>
      </Paper>
    </Box>
  );
}
