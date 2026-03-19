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
  Divider
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ArticleIcon from '@mui/icons-material/Article';
import ForumIcon from '@mui/icons-material/Forum';
import ChecklistIcon from '@mui/icons-material/Checklist';

const anchoMenuLateral = 240;

interface PropsBarraLateral {
  seccionActiva: string;
  setSeccionActiva: (seccion: string) => void;
  menuMovilAbierto: boolean;
  alternarMenu: () => void;
  window?: () => Window;
}

export default function BarraLateral({ seccionActiva, setSeccionActiva, menuMovilAbierto, alternarMenu, window }: PropsBarraLateral) {
  const contenedor = window !== undefined ? () => window().document.body : undefined;

  const opcionesMenu = [
    { id: 'panel', etiqueta: 'Panel de Control', icono: <DashboardIcon /> },
    { id: 'noticias', etiqueta: 'Noticias', icono: <ArticleIcon /> },
    { id: 'comentarios', etiqueta: 'Comentarios', icono: <ForumIcon /> },
    { id: 'tareas', etiqueta: 'Lista de Tareas', icono: <ChecklistIcon /> },
  ];

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
          <ListItem key={opcion.id} disablePadding>
            <ListItemButton 
              selected={seccionActiva === opcion.id}
              onClick={() => {
                setSeccionActiva(opcion.id);
                if (window !== undefined) alternarMenu();
              }}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: 'primary.light',
                  color: 'primary.contrastText',
                  '& .MuiListItemIcon-root': {
                    color: 'primary.contrastText',
                  }
                },
                '&.Mui-selected:hover': {
                  backgroundColor: 'primary.main',
                }
              }}
            >
              <ListItemIcon sx={{ color: seccionActiva === opcion.id ? 'primary.contrastText' : 'inherit' }}>
                {opcion.icono}
              </ListItemIcon>
              <ListItemText primary={opcion.etiqueta} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: anchoMenuLateral }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        container={contenedor}
        variant="temporary"
        open={menuMovilAbierto}
        onClose={alternarMenu}
        ModalProps={{
          keepMounted: true,
        }}
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
