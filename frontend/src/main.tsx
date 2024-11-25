import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import CssBaseline from '@mui/material/CssBaseline'
// import './index.css'
import createTheme from '@mui/material/styles/createTheme';
import ThemeProvider from '@mui/material/styles/ThemeProvider'
//Importamos el componente Provider de la librearía react-redux
import { Provider } from 'react-redux'
//Importamos el componente store que definimos en el fichero ./store/index
import { store } from './store/index'

const customTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
    background: {
      paper: '#1e1e1e',
      default: '#121212',
    },
    text: {
      secondary: '#b0bec5',
      primary: '#ffffff',
    },
    error: {
      main: '#ef5350',
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </StrictMode>
)
