import type React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Box,
  Typography,
  Divider,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ArticleIcon from '@mui/icons-material/Article';
import ForumIcon from '@mui/icons-material/Forum';
import ChecklistIcon from '@mui/icons-material/Checklist';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import StorefrontIcon from '@mui/icons-material/Storefront';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const anchoMenuLateral = 240;

interface OpcionMenu {
  ruta: string;
  etiqueta: string;
  icono: React.ReactElement;
}

interface PropsBarraLateral {
  menuMovilAbierto: boolean;
  alternarMenu: () => void;
  window?: () => Window;
}

const opcionesMenu: Readonly<OpcionMenu[]> = [
  { ruta: '/panel', etiqueta: 'Panel de Control', icono: <DashboardIcon /> },
  { ruta: '/products', etiqueta: 'Comprar Cryptos', icono: <StorefrontIcon /> },
  { ruta: '/cart', etiqueta: 'Mi Carrito', icono: <ShoppingCartIcon /> },
  { ruta: '/noticias', etiqueta: 'Noticias', icono: <ArticleIcon /> },
  { ruta: '/comentarios', etiqueta: 'Comentarios', icono: <ForumIcon /> },
  { ruta: '/tareas', etiqueta: 'Lista de Tareas', icono: <ChecklistIcon /> },
  { ruta: '/pokemon', etiqueta: 'Pokédex', icono: <CatchingPokemonIcon /> },
];

export default function BarraLateral({ menuMovilAbierto, alternarMenu, window }: PropsBarraLateral) {
  const contenedor = window !== undefined ? () => window().document.body : undefined;

  const contenidoMenu = (
    <div>
      <Toolbar>
        <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          Crypto MVP
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {opcionesMenu.map((opcion) => (
          <ListItem key={opcion.ruta} disablePadding>
            <NavLink
              to={opcion.ruta}
              style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}
            >
              {({ isActive }) => (
                <ListItemButton
                  selected={isActive}
                  onClick={alternarMenu}
                  sx={{
                    '&.Mui-selected': {
                      backgroundColor: 'primary.main',
                      color: 'primary.contrastText',
                      '& .MuiListItemIcon-root': {
                        color: 'primary.contrastText',
                      },
                    },
                    '&.Mui-selected:hover': {
                      backgroundColor: 'primary.dark',
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: isActive ? 'primary.contrastText' : 'inherit' }}>
                    {opcion.icono}
                  </ListItemIcon>
                  <ListItemText primary={opcion.etiqueta} />
                </ListItemButton>
              )}
            </NavLink>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box component="nav" sx={{ width: { sm: anchoMenuLateral }, flexShrink: { sm: 0 } }}>
      <Drawer
        container={contenedor}
        variant="temporary"
        open={menuMovilAbierto}
        onClose={alternarMenu}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: anchoMenuLateral, backgroundImage: 'none' },
        }}
      >
        {contenidoMenu}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: anchoMenuLateral, backgroundImage: 'none' },
        }}
        open
      >
        {contenidoMenu}
      </Drawer>
    </Box>
  );
}
