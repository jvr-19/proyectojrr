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

//Importamos el useDispatch del react-redux
import { useDispatch } from 'react-redux'
//Importamos las acciones que están en el fichero authSlice.ts
import { authActions } from '../store/authSlice';

function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [attempted, setAttempted] = useState(false);
  const [enabled, setEnabled] = useState(false)
  const [data, setData] = useState({ user: '', password: '' })

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
      password: e.target.value
    })
    //console.log(data)
  }

  const bduser = 'javier'
  const bdpasswd = '1234'

  const handleSubmit = (e: any) => {
    //Para que no mande el formulario, sino que haga lo que yo le diga.
    e.preventDefault()
    setAttempted(true);
    //Aquí iría el código que quiero que se ejecute
    if (data.user == bduser && data.password == bdpasswd) {
      //aquí pongo el dispatch para cambiar el estado a login en el store del redux
      dispatch(authActions.login({
        name: data.user, //data.user es el nombre de usuario que ha ingresado el usuario
        rol: 'administrador'
      }))
      navigate('/home')
      setEnabled(true)
    } else {
      setEnabled(false)
    }
    console.log(data)
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
                    value={data.password}
                    onChange={handleChangePassword}

                  />
                </Grid>
                <Grid size={12}>
                  <Button type='submit' variant='outlined' color='secondary' fullWidth>Acceder</Button>
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