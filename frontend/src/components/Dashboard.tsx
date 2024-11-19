import '../App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

// Definir el tipo de los datos del formulario
interface ItemType {
    id?: number;
    nombre: string;
    marca: string;
    tipo: string;
    precio: number;
}

// Estado inicial del formulario
const itemInitialState: ItemType = {
    nombre: '',
    marca: '',
    tipo: '',
    precio: 0,
};

function Dashboard() {
    const [item, setItem] = useState(itemInitialState);
    const [tableData, setTableData] = useState([]);

    const handleChange = (e: any) => {
        const { name, value, type } = e.target;
        setItem((prevItem) => ({
            ...prevItem,
            [name]: type === 'number' ? parseFloat(value) || 0 : value
        }));
    };

    async function isItemAdded() {
        fetch(`http://localhost:3030/addItem?nombre=${item.nombre}&marca=${item.marca}&tipo=${item.tipo}&precio=${item.precio}`)
            .then(response => response.json())
            .then(response => {
                console.log('Lo que nos llega de la base de datos: ')
                console.log(response)
                if (response > 0) {
                    alert('Datos guardados con éxito');
                    setItem(itemInitialState); // Resetear el formulario después de la inserción
                    fetchData();
                }
            })
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        isItemAdded()
    };

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:3030/getItems');
            const data = await response.json();
            setTableData(data.data);
        } catch (error) {
            console.error('Error al obtener los datos:', error);
        }
    };

    // Llamar a fetchData cuando el componente se monte
    useEffect(() => {
        fetchData();
    }, []);

    async function handleDeleteItem(row: ItemType) {
        fetch(`http://localhost:3030/deleteItem?id=${row.id}`)
            .then(response => response.json())
            .then(response => {
                console.log('Lo que nos llega de la base de datos: ')
                console.log(response)
                if (response > 0) {
                    alert('Datos eliminados con éxito');
                    fetchData();
                }
            })
    }

    return (
        <>
            <Box component='form' sx={{ padding: '20px', margin: 'auto' }} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid size={3}>
                        <TextField
                            label="Nombre"
                            name="nombre"
                            value={item.nombre}
                            onChange={handleChange}
                            required
                            fullWidth
                        />
                    </Grid>
                    <Grid size={3}>
                        <TextField
                            label="Marca"
                            name="marca"
                            value={item.marca}
                            onChange={handleChange}
                            required
                            fullWidth
                        />
                    </Grid>
                    <Grid size={3}>
                        <TextField
                            label="Tipo"
                            name="tipo"
                            value={item.tipo}
                            onChange={handleChange}
                            required
                            fullWidth
                        />
                    </Grid>
                    <Grid size={3}>
                        <TextField
                            label="Precio"
                            name="precio"
                            type="number"
                            value={item.precio}
                            onChange={handleChange}
                            required
                            fullWidth
                        />
                    </Grid>
                    <Grid size={12}>
                        <Button type="submit" variant="outlined" color="primary" fullWidth>
                            Insertar
                        </Button>
                    </Grid>
                </Grid>
                <Box mt={4}>
                    <TableContainer>
                        <Table aria-label="tabla de colecciones" className='ctable'>
                            <TableHead>
                                <TableRow>
                                    <TableCell colSpan={5}>Tabla Coleccion</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell />
                                    <TableCell>Nombre</TableCell>
                                    <TableCell>Marca</TableCell>
                                    <TableCell>Tipo</TableCell>
                                    <TableCell>Precio</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tableData.map((row: ItemType) => (
                                    <TableRow key={row.id}>
                                        <TableCell>
                                            <Button color='secondary' onClick={() => handleDeleteItem(row)}>
                                                <DeleteForeverIcon />
                                            </Button>
                                        </TableCell>
                                        <TableCell>{row.nombre}</TableCell>
                                        <TableCell>{row.marca}</TableCell>
                                        <TableCell>{row.tipo}</TableCell>
                                        <TableCell>{row.precio}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
        </>
    )
}

export default Dashboard