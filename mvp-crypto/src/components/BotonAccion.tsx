import { Button as MuiButton, type ButtonProps } from '@mui/material';

interface PropsBotonAccion extends ButtonProps {
  texto: string;
}

export default function BotonAccion({ texto, ...props }: PropsBotonAccion) {
  return (
    <MuiButton 
      variant="contained" 
      color="primary" 
      sx={{ 
        borderRadius: 4,
        textTransform: 'none',
        fontWeight: 'bold',
        px: 3,
        py: 1,
        transition: 'all 0.2s',
        '&:hover': {
          transform: 'scale(1.02)',
          backgroundColor: 'primary.dark'
        }
      }}
      {...props}
    >
      {texto}
    </MuiButton>
  );
}
