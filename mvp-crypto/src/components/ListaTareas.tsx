import { useState, Fragment } from 'react';
import {
  Box,
  Typography,
  TextField,
  List,
  ListItem,
  ListItemText,
  Paper,
  IconButton,
  Checkbox,
  Chip,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import BotonAccion from './BotonAccion';
import BasicSelect from './Select';

interface Tarea {
  id: number;
  texto: string;
  crypto: string;
  completada: boolean;
}

export default function ListaTareas() {
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [nuevaTarea, setNuevaTarea] = useState('');
  const [siguienteId, setSiguienteId] = useState(3);
  const [crypto, setCrypto] = useState('');
  const [filtro, setFiltro] = useState('');

  const tareasFiltradas = filtro ? tareas.filter((t) => t.crypto === filtro) : tareas;

  const agregarTarea = () => {
    if (nuevaTarea.trim() !== '') {
      setTareas([...tareas, { id: siguienteId, texto: nuevaTarea.trim(), crypto: crypto, completada: false }]);
      setSiguienteId(siguienteId + 1);
      setNuevaTarea('');
    }
  };

  const alternarCompletada = (id: number) => {
    setTareas(tareas.map((t) => (t.id === id ? { ...t, completada: !t.completada } : t)));
  };

  const eliminarTarea = (id: number) => {
    setTareas(tareas.filter((t) => t.id !== id));
  };

  const opcionesFiltro = ['Bitcoin', 'Ethereum', 'Ripple'];

  return (
    <Box sx={{ width: '100%', maxWidth: 800, margin: '0 auto' }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ mb: 4, textAlign: 'center' }}>
        Lista de Tareas
      </Typography>

      <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap' }}>
        <Chip
          label="Todas"
          onClick={() => setFiltro('')}
          color={filtro === '' ? 'primary' : 'default'}
          variant={filtro === '' ? 'filled' : 'outlined'}
        />
        {opcionesFiltro.map((opcion) => (
          <Chip
            key={opcion}
            label={opcion}
            onClick={() => setFiltro(filtro === opcion ? '' : opcion)}
            color={filtro === opcion ? 'warning' : 'default'}
            variant={filtro === opcion ? 'filled' : 'outlined'}
          />
        ))}
      </Box>

      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <BasicSelect crypto={crypto} setCrypto={setCrypto} />
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Escribe una nueva tarea..."
          value={nuevaTarea}
          onChange={(e) => setNuevaTarea(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && agregarTarea()}
        />
        <BotonAccion texto="Agregar" onClick={agregarTarea} />
      </Box>

      <Paper elevation={2} sx={{ borderRadius: 2, backgroundImage: 'none' }}>
        <List sx={{ p: 0 }}>
          {tareasFiltradas.length === 0 ? (
            <ListItem>
              <ListItemText secondary={tareas.length === 0 ? 'No hay tareas. ¡Agrega una nueva!' : 'No hay tareas para esta crypto.'} />
            </ListItem>
          ) : (
            tareasFiltradas.map((tarea, indice) => (
              <Fragment key={tarea.id}>
                <ListItem
                  secondaryAction={
                    <IconButton edge="end" aria-label="eliminar" onClick={() => eliminarTarea(tarea.id)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  }
                  sx={{
                    borderBottom: indice !== tareasFiltradas.length - 1 ? '1px solid #333' : 'none',
                    py: 1.5,
                  }}
                >
                  <Checkbox
                    checked={tarea.completada}
                    onChange={() => alternarCompletada(tarea.id)}
                    color="primary"
                    sx={{ mr: 1 }}
                  />
                  <ListItemText
                    primary={tarea.texto}
                    sx={{
                      textDecoration: tarea.completada ? 'line-through' : 'none',
                      color: tarea.completada ? 'text.secondary' : 'text.primary',
                    }}
                  />
                  <Chip label={tarea.crypto} size="small" color="warning" variant="outlined" sx={{ ml: 1 }} />
                </ListItem>
              </Fragment>
            ))
          )}
        </List>
      </Paper>
    </Box>
  );
}
