import { Box, Typography } from '@mui/material';
import PanelInfo from './PanelInfo';

export default function SeccionNoticias() {
  return (
    <Box sx={{ width: '100%', maxWidth: 800, margin: '0 auto' }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ mb: 4, textAlign: 'center' }}>
        Últimas Noticias
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <PanelInfo titulo="Bitcoin alcanza un nuevo máximo histórico">
          El mercado de criptomonedas se ha disparado hoy después de la aprobación de nuevos ETFs. BTC ha roto la barrera de los $69k.
        </PanelInfo>

        <PanelInfo titulo="Actualización de Ethereum Dencun completada">
          La red de Ethereum ha implementado con éxito la actualización Dencun, lo que promete reducir significativamente las tarifas de gas en las capas 2.
        </PanelInfo>

        <PanelInfo titulo="Solana experimenta congestión en la red">
          Debido a la alta demanda de meme coins, la red de Solana ha estado experimentando retrasos en las transacciones en las últimas 24 horas.
        </PanelInfo>
      </Box>
    </Box>
  );
}
