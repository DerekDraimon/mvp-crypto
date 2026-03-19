import { useState, Fragment } from 'react';
import { Box, Typography, TextField, List, ListItem, ListItemText, Paper, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import BotonAccion from './BotonAccion';

export default function ForoComentarios() {
  const [comentarios, setComentarios] = useState([
    '¡El precio de BTC está loco hoy!',
    '¿Alguien recomienda comprar Solana ahora mismo?',
  ]);
  const [nuevoComentario, setNuevoComentario] = useState('');

  const agregarComentario = () => {
    if (nuevoComentario.trim() !== '') {
      setComentarios([nuevoComentario.trim(), ...comentarios]);
      setNuevoComentario('');
    }
  };

  const eliminarComentario = (indice: number) => {
    const actualizados = [...comentarios];
    actualizados.splice(indice, 1);
    setComentarios(actualizados);
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 800, margin: '0 auto' }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ mb: 4, textAlign: 'center' }}>
        Foro de Discusión
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
        <TextField 
          fullWidth
          variant="outlined"
          placeholder="Escribe tu comentario sobre cripto..."
          value={nuevoComentario}
          onChange={(e) => setNuevoComentario(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && agregarComentario()}
        />
        <BotonAccion texto="Publicar" onClick={agregarComentario} />
      </Box>

      <Paper elevation={2} sx={{ borderRadius: 2, backgroundImage: 'none' }}>
        <List sx={{ p: 0 }}>
          {comentarios.length === 0 ? (
            <ListItem>
              <ListItemText secondary="No hay comentarios aún. ¡Sé el primero!" />
            </ListItem>
          ) : (
            comentarios.map((comentario, indice) => (
              <Fragment key={indice}>
                <ListItem 
                  secondaryAction={
                    <IconButton edge="end" aria-label="borrar" onClick={() => eliminarComentario(indice)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  }
                  sx={{ 
                    borderBottom: indice !== comentarios.length - 1 ? '1px solid #333' : 'none',
                    py: 2
                  }}
                >
                  <ListItemText primary={comentario} />
                </ListItem>
              </Fragment>
            ))
          )}
        </List>
      </Paper>
    </Box>
  );
}
