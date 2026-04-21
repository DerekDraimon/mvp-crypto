import { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  IconButton,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

interface ItemCarrito {
  id: string;
  name: string;
  symbol: string;
  precio: number;
  imagen: string;
}

export default function Cart() {
  const [carrito, setCarrito] = useState<ItemCarrito[]>(() => {
    return JSON.parse(localStorage.getItem('carrito') || '[]');
  });
  const [dialogAbierto, setDialogAbierto] = useState(false);
  const [compraExitosa, setCompraExitosa] = useState(false);

  const eliminarItem = (index: number) => {
    const nuevoCarrito = [...carrito];
    nuevoCarrito.splice(index, 1);
    setCarrito(nuevoCarrito);
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
  };

  const vaciarCarrito = () => {
    setCarrito([]);
    localStorage.removeItem('carrito');
  };

  const confirmarCompra = () => {
    vaciarCarrito();
    setDialogAbierto(false);
    setCompraExitosa(true);
  };

  const total = carrito.reduce((acc, item) => acc + item.precio, 0);

  if (compraExitosa) {
    return (
      <Box sx={{ textAlign: 'center', mt: 10 }}>
        <CheckCircleOutlineIcon sx={{ fontSize: 72, color: 'success.main', mb: 2 }} />
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 1 }}>
          ¡Compra realizada con éxito!
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Tus ítems fueron procesados correctamente.
        </Typography>
      </Box>
    );
  }

  if (carrito.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', mt: 8 }}>
        <Typography variant="h5" sx={{ mb: 1 }}>
          Tu carrito está vacío
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Agrega criptomonedas o Pokémon desde el catálogo
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 700 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
        Mi Carrito
      </Typography>

      {carrito.map((item, index) => (
        <Card key={index} sx={{ mb: 2 }}>
          <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <img src={item.imagen} alt={item.name} width={40} />
              <Box>
                <Typography variant="h6">{item.name}</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {item.symbol.toUpperCase()}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="h6">${item.precio.toLocaleString()}</Typography>
              <IconButton onClick={() => eliminarItem(index)} color="error" size="small">
                <DeleteIcon />
              </IconButton>
            </Box>
          </CardContent>
        </Card>
      ))}

      <Divider sx={{ my: 2 }} />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button variant="outlined" color="error" onClick={vaciarCarrito}>
          Vaciar carrito
        </Button>
        <Box sx={{ textAlign: 'right' }}>
          <Typography variant="h5" sx={{ mb: 1 }}>
            Total: ${total.toLocaleString()}
          </Typography>
          <Button variant="contained" color="success" onClick={() => setDialogAbierto(true)}>
            Confirmar Compra
          </Button>
        </Box>
      </Box>

      <Dialog open={dialogAbierto} onClose={() => setDialogAbierto(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 'bold' }}>Confirmar compra</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Estás por comprar {carrito.length} {carrito.length === 1 ? 'ítem' : 'ítems'}:
          </Typography>
          {carrito.map((item, index) => (
            <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
              <Typography variant="body2">{item.name}</Typography>
              <Typography variant="body2" fontWeight={600}>${item.precio.toLocaleString()}</Typography>
            </Box>
          ))}
          <Divider sx={{ my: 1.5 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography fontWeight={700}>Total</Typography>
            <Typography fontWeight={700}>${total.toLocaleString()}</Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
          <Button variant="outlined" onClick={() => setDialogAbierto(false)}>
            Cancelar
          </Button>
          <Button variant="contained" color="success" onClick={confirmarCompra}>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={compraExitosa}
        autoHideDuration={3000}
        onClose={() => setCompraExitosa(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity="success" sx={{ fontWeight: 600 }}>
          ¡Compra realizada con éxito!
        </Alert>
      </Snackbar>
    </Box>
  );
}
