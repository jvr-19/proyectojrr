import React from 'react'
import '../App.css';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
//Importamos el useSelector del react-redux
import { useSelector } from 'react-redux'
// Importamos lo que necesitamos para el tipo del selector()
import { RootState } from '../store/index'
//Importamos las acciones que están en el fichero authSlice.ts
import { authActions } from '../store/authSlice';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';

function Home() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  //Almacenamos en la variable userData lo que obtenemos del store usando el hook useSelector
  const userData = useSelector((state: RootState) => state.authenticator)
  //Comprobamos por la consola qué obtenemos del store
  console.log(userData)

  const handleLogout = (e: any) => {
    dispatch(authActions.logout())
    navigate('/')
    console.log(userData)
  }

  return (
    <>
      <Typography>Home de Javier Rico: Soy el usuario {userData.userName} y tengo el rol de {userData.userRol}</Typography>
      <Button variant='outlined' onClick={handleLogout}>SALIR</Button>
    </>
  )
}

export default Home
