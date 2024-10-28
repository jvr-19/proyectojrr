import React from 'react'
import { useRouteError } from "react-router-dom";
import '../App.css';
import Typography from '@mui/material/Typography';


function ErrorPage() {
    const error = useRouteError();

    return (
        <>
            <Typography variant='h1'>Oops!</Typography>
            <Typography variant='body1'>Ha ocurrido un error.</Typography>
            <Typography variant='body1'>{error.statusText || error.message}</Typography>
        </>
    )
}

export default ErrorPage
