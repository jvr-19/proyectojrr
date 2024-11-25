import '../App.css';
import React from 'react';
import { useState } from 'react';
import Menus from '../components/Menu';
import InformeColeccion from '../components/InformeColeccion';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

function Reports() {
  const [mostrarInforme, setMostrarInforme] = useState(false);
  const [datosColeccion, setDatosColeccion] = useState([]);

  const handleGenerarInforme = async () => {
    try {
      // Obtención de datos desde la base de datos
      const response = await fetch('http://localhost:3030/getItems');
      const data = await response.json();

      // Actualiza los datos y muestra el informe
      setDatosColeccion(data.data);
      setMostrarInforme(true);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  };

  return (
    <>
      <Menus />
      <Box sx={{ padding: 4, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Generación de Informes
        </Typography>
        {!mostrarInforme ? (
          <Tooltip title="Generar informe" arrow>
            <Button
              variant="contained"
              color="primary"
              onClick={handleGenerarInforme}
              size="large"
            >
              INFORME COLECCION
            </Button>
          </Tooltip>
        ) : (
          <InformeColeccion datos={datosColeccion} />
        )}
      </Box>
    </>
  )
}

export default Reports