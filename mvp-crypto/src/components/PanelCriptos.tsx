import { Box, Typography } from '@mui/material';
import TarjetaCripto from './TarjetaCripto';
import BotonAccion from './BotonAccion';

export default function PanelCriptos() {
  return (
    <Box sx={{ width: '100%', maxWidth: 800, margin: '0 auto' }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ mb: 4, textAlign: 'center' }}>
        Panel de Criptomonedas
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TarjetaCripto
          nombre="Bitcoin"
          simbolo="BTC"
          precio="$69,420.00"
          cambio="2.4%"
          esPositivo={true}
          accion={<BotonAccion texto="Comprar" size="small" />}
        />
        <TarjetaCripto
          nombre="Ethereum"
          simbolo="ETH"
          precio="$3,550.00"
          cambio="5.1%"
          esPositivo={true}
          accion={<BotonAccion texto="Comprar" size="small" />}
        />
        <TarjetaCripto
          nombre="Solana"
          simbolo="SOL"
          precio="$180.20"
          cambio="1.2%"
          esPositivo={false}
          accion={<BotonAccion texto="Comprar" size="small" />}
        />
      </Box>
    </Box>
  );
}
