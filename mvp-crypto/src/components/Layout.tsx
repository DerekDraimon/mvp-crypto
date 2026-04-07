import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import BarraLateral from './BarraLateral';

const anchoMenuLateral = 240;

const titulos: Record<string, string> = {
  '/panel': 'Panel de Control',
  '/products': 'Comprar Criptomonedas',
  '/cart': 'Mi Carrito',
  '/noticias': 'Noticias Crypto',
  '/comentarios': 'Comentarios de la Comunidad',
  '/tareas': 'Lista de Tareas',
};

export default function Layout() {
  const [menuMovilAbierto, setMenuMovilAbierto] = useState(false);
  const location = useLocation();

  const alternarMenu = () => {
    setMenuMovilAbierto(!menuMovilAbierto);
  };

  const titulo =
    titulos[location.pathname] ??
    (location.pathname.startsWith('/product/') ? 'Detalle de Cripto' : 'Crypto MVP');

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', width: '100vw' }}>
      <AppBar
        position="fixed"
        elevation={1}
        sx={{
          width: { sm: `calc(100% - ${anchoMenuLateral}px)` },
          ml: { sm: `${anchoMenuLateral}px` },
          bgcolor: 'background.paper',
          color: 'text.primary',
          backgroundImage: 'none',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="abrir menu"
            edge="start"
            onClick={alternarMenu}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 'bold' }}>
            {titulo}
          </Typography>
        </Toolbar>
      </AppBar>

      <BarraLateral
        menuMovilAbierto={menuMovilAbierto}
        alternarMenu={alternarMenu}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${anchoMenuLateral}px)` },
          mt: 8,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
