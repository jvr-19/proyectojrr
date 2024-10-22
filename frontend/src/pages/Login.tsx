import Container from '@mui/material/Container';
import '../App.css';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function Login() {

  return (
    <>
      <Container>
        <header>
          <Typography variant='h1' color='primary'>Texto con variante h1</Typography>
        </header>
        <main>
          <Typography variant='h2' color='secondary'>Texto con variante h2</Typography>
          <Typography variant='h3' color='error'>Texto con variante h3</Typography>
          <Typography variant='subtitle1' color='success'>Texto con variante subtitle1</Typography>
          <Typography variant='body1' color='primary'>Texto con variante body1</Typography>
          <br />
          <Button variant='text' color='primary'>Boton (text,primary)</Button>
          <Button variant='contained' color='secondary'>Boton (contained,secondary)</Button>
          <Button variant='outlined' color='error'>Boton (outlined,error)</Button>
          <Button variant='contained' color='success'>Boton (contained,success)</Button>
        </main>
        <footer>
          <Typography variant='caption' color='secondary'>Texto con variante caption</Typography>
        </footer>
      </Container>
    </>
  )
}

export default Login
