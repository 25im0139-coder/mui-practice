import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import MovieChooser from './MovieChooser';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#ff2bd6' },
    secondary: { main: '#16f4ff' },
    background: { default: '#07040f', paper: '#120a24' },
  },
  typography: { fontFamily: '"Segoe UI", system-ui, -apple-system, sans-serif' },
  shape: { borderRadius: 16 },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MovieChooser />
    </ThemeProvider>
  );
}
