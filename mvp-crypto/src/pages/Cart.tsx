import { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  IconButton,
  Divider,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

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

  const total = carrito.reduce((acc, item) => acc + item.precio, 0);

  if (carrito.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', mt: 8 }}>
        <Typography variant="h5" sx={{ mb: 1 }}>
          Tu carrito está vacío
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Agrega criptomonedas desde el catálogo
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
          <CardContent
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
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
          <Button variant="contained" color="success">
            Confirmar Compra
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
