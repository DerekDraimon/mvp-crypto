import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

import Login from './pages/Login';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';

import PanelCriptos from './components/PanelCriptos';
import SeccionNoticias from './components/SeccionNoticias';
import ForoComentarios from './components/ForoComentarios';
import ListaTareas from './components/ListaTareas';

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
    },
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
        },
      },
    },
  },
});

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={temaGlobal}>
        <CssBaseline />
        <Routes>
          {/* Ruta pública: Login */}
          <Route path="/" element={<Login />} />

          {/* Rutas con layout (sidebar + navbar) */}
          <Route element={<Layout />}>
            <Route path="/panel" element={<PanelCriptos />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />
            <Route path="/noticias" element={<SeccionNoticias />} />
            <Route path="/comentarios" element={<ForoComentarios />} />
            <Route path="/tareas" element={<ListaTareas />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}
