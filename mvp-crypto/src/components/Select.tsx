import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import type { SelectChangeEvent } from '@mui/material';

interface PropsBasicSelect {
  crypto: string;
  setCrypto: (value: string) => void;
}

export default function BasicSelect({ crypto, setCrypto }: PropsBasicSelect) {
    const handleChange = (event: SelectChangeEvent) => {
        setCrypto(event.target.value as string);
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Crypto</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={crypto}
                    label="Crypto"
                    onChange={handleChange}
                >
                    <MenuItem value="Bitcoin">Bitcoin</MenuItem>
                    <MenuItem value="Ethereum">Ethereum</MenuItem>
                    <MenuItem value="Ripple">Ripple</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}
