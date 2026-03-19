import { useState } from 'react';
import { 
  Box, 
  CssBaseline, 
  AppBar, 
  Toolbar, 
  IconButton, 
  Typography, 
  ThemeProvider, 
  createTheme 
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import BarraLateral from './components/BarraLateral';
import PanelCriptos from './components/PanelCriptos';
import SeccionNoticias from './components/SeccionNoticias';
import ForoComentarios from './components/ForoComentarios';
import ListaTareas from './components/ListaTareas';

const anchoMenuLateral = 240;

const temaGlobal = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1C4E80',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#7EA6E0',
      contrastText: '#000000',
    },
    error: {
      main: '#D32D41',
      contrastText: '#FFFFFF',
    },
    warning: {
      main: '#ECA10C',
      contrastText: '#000000',
    },
    info: {
      main: '#0091D5',
      contrastText: '#FFFFFF',
    },
    success: {
      main: '#6AB187',
      contrastText: '#000000',
    },
    background: {
      default: '#191E23',
      paper: '#23282E',
    },
    text: {
      primary: '#D5D5D5',
      secondary: '#A6A6A6',
    }
  },
  shape: {
    borderRadius: 4,
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          textTransform: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          backgroundImage: 'none',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        }
      }
    }
  },
});

export default function App() {
  const [menuMovilAbierto, setMenuMovilAbierto] = useState(false);
  const [seccionActiva, setSeccionActiva] = useState('panel');

  const alternarMenu = () => {
    setMenuMovilAbierto(!menuMovilAbierto);
  };

  const mostrarContenido = () => {
    switch(seccionActiva) {
      case 'panel':
        return <PanelCriptos />;
      case 'noticias':
        return <SeccionNoticias />;
      case 'comentarios':
        return <ForoComentarios />;
      case 'tareas':
        return <ListaTareas />;
      default:
        return <PanelCriptos />;
    }
  };

  return (
    <ThemeProvider theme={temaGlobal}>
      <Box sx={{ display: 'flex', minHeight: '100vh', width: '100vw' }}>
        <CssBaseline />
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
              {seccionActiva === 'panel' && 'Panel de Control'}
              {seccionActiva === 'noticias' && 'Noticias Crypto'}
              {seccionActiva === 'comentarios' && 'Comentarios de la Comunidad'}
              {seccionActiva === 'tareas' && 'Lista de Tareas'}
            </Typography>
          </Toolbar>
        </AppBar>
        
        <BarraLateral 
          seccionActiva={seccionActiva} 
          setSeccionActiva={setSeccionActiva} 
          menuMovilAbierto={menuMovilAbierto}
          alternarMenu={alternarMenu}
        />
        
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${anchoMenuLateral}px)` }, mt: 8 }}
        >
          {mostrarContenido()}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
