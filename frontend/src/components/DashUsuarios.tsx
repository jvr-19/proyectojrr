import '../App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/index';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Grid from '@mui/material/Grid2';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

// Definir el tipo de los datos del formulario
interface UserType {
    id?: number;
    nombre: string;
    login: string;
    password: string;
    rol: string;
}

// Estado inicial del formulario
const userInitialState: UserType = {
    nombre: '',
    login: '',
    password: '',
    rol: '',
};

function MostrarTabla() {
    const [item, setItem] = useState(userInitialState);
    const [tableData, setTableData] = useState([]);
    const userData = useSelector((state: RootState) => state.authenticator);

    const handleChange = (e: any) => {
        const { name, value, type } = e.target;
        setItem((prevItem) => ({
            ...prevItem,
            [name]: type === 'number' ? parseFloat(value) || 0 : value
        }));
    };

    async function isUserAdded() {
        fetch(`http://localhost:3030/addUser?nombre=${item.nombre}&login=${item.login}&password=${item.password}&rol=${item.rol}`)
            .then(response => response.json())
            .then(response => {
                console.log('Lo que nos llega de la base de datos: ')
                console.log(response)
                if (response > 0) {
                    alert('Datos guardados con éxito');
                    setItem(userInitialState); // Resetear el formulario después de la inserción
                    fetchData();
                }
            })
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        isUserAdded()
    };

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:3030/getUsers');
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

    return (
        <>
            <Box component='form' sx={{ padding: '20px', margin: 'auto' }} onSubmit={handleSubmit}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    <Grid size={{ xs: 2, sm: 4, md: 6 }}>
                        <TextField
                            label="Nombre"
                            name="nombre"
                            value={item.nombre}
                            onChange={handleChange}
                            required
                            fullWidth
                        />
                    </Grid>
                    <Grid size={{ xs: 2, sm: 4, md: 6 }}>
                        <TextField
                            label="Login"
                            name="login"
                            value={item.login}
                            onChange={handleChange}
                            required
                            fullWidth
                        />
                    </Grid>
                    <Grid size={{ xs: 2, sm: 4, md: 6 }}>
                        <TextField
                            label="Password"
                            name="password"
                            type='password'
                            value={item.password}
                            onChange={handleChange}
                            required
                            fullWidth
                        />
                    </Grid>
                    <Grid size={{ xs: 2, sm: 4, md: 6 }}>
                        <TextField
                            label="Rol"
                            name="rol"
                            value={item.rol}
                            onChange={handleChange}
                            required
                            fullWidth
                        />
                    </Grid>
                    <Grid size={12}>
                        <Tooltip placement="bottom" title="Insertar usuario" arrow>
                            <Button type="submit" variant="outlined" color="primary" fullWidth>
                                Insertar
                            </Button>
                        </Tooltip>
                    </Grid>
                </Grid>
                <Box mt={4}>
                    <TableContainer>
                        <Table aria-label="tabla de usuarios" className='ctable'>
                            <TableHead>
                                <TableRow>
                                    <TableCell colSpan={5}>Tabla Usuarios</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Nombre</TableCell>
                                    <TableCell>Login</TableCell>
                                    <TableCell>Password</TableCell>
                                    <TableCell>Rol</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tableData.map((row: UserType) => (
                                    <TableRow key={row.id}>
                                        <TableCell>{row.nombre}</TableCell>
                                        <TableCell>{row.login}</TableCell>
                                        <TableCell>{row.password}</TableCell>
                                        <TableCell>{row.rol}</TableCell>
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

export default MostrarTabla