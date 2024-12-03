import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../App.css';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Tooltip from '@mui/material/Tooltip';

//Importamos el useDispatch del react-redux
import { useDispatch } from 'react-redux'
//Importamos las acciones que están en el fichero authSlice.ts
import { authActions } from '../store/authSlice';

function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [attempted, setAttempted] = useState(false);
  const [enabled, setEnabled] = useState(false)
  const [data, setData] = useState({ user: '', passwd: '' })

  const handleChangeUser = (e: any) => {
    setData({
      ...data,
      user: e.target.value
    })
    //console.log(data)
  }

  const handleChangePassword = (e: any) => {
    setData({
      ...data,
      passwd: e.target.value
    })
    //console.log(data)
  }

  async function isVerifiedUser() {
    fetch(`http://localhost:3030/login?user=${data.user}&password=${data.passwd}`)
      .then(response => response.json())
      .then(response => {
        console.log('Lo que nos llega de la base de datos: ')
        console.log(response.data)
        if (response.data.length !== 0) {
          //Si hay datos es que el usuario y contraseña son los correctos. Hago el dispatch y el
          //navigate
          dispatch(authActions.login({ isAutenticated: true, name: response.data.nombre, rol: response.data.rol })) // Dispatch login action
          navigate('/home')
          setEnabled(true)
        } else {
          //Si no, realizo la lógica para alertar al usuario con usuario/contraseña son incorrectas
          setEnabled(false)
        }
      })
  }


  const handleSubmit = (e: any) => {
    //Para que no mande el formulario, sino que haga lo que yo le diga.
    e.preventDefault()
    setAttempted(true);
    //Aquí iría el código que quiero que se ejecute
    isVerifiedUser()
  }

  return (
    <>
      <Container>
        <Paper elevation={0} square={false} variant="outlined" sx={{ textAlign: 'center', marginTop: 10 }} >
          <header>
            <Box sx={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>

              <Typography
                variant='h6'
                color='primary'
                sx={{ mt: 2, mb: 2, p: 2 }}
              >
                {enabled ? <LockOpenIcon /> : <LockIcon />}
                Sistema de Acceso
              </Typography>
            </Box>
          </header>
          <main>
            <Box
              component='form'
              onSubmit={handleSubmit}
            >
              <Grid container spacing={2} padding={1}>
                <Grid size={12}>
                  <TextField
                    required
                    label='Usuario'
                    variant='outlined'
                    fullWidth
                    color="primary"
                    value={data.user}
                    onChange={handleChangeUser}

                  />
                </Grid>
                <Grid size={12}>
                  <TextField
                    required
                    label='Contraseña'
                    variant='outlined'
                    fullWidth
                    color="primary"
                    type='password'
                    value={data.passwd}
                    onChange={handleChangePassword}

                  />
                </Grid>
                <Grid size={12}>
                  <Tooltip placement="bottom" title="Iniciar sesión" arrow>
                    <Button type='submit' variant='outlined' color='secondary' fullWidth>Acceder</Button>
                  </Tooltip>
                </Grid>
              </Grid>
            </Box>
          </main>
          <footer>
            <Grid size={12}>
              {attempted && (
                enabled ?
                  <Alert variant='outlined' severity='success'>Acceso concedido</Alert> :
                  <Alert variant='outlined' severity='error'>Usuario y/o contraseña incorrectos</Alert>
              )}
            </Grid>
          </footer>
        </Paper>
      </Container>
    </>
  )
}

export default Login