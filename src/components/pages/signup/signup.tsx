import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import { FC, useState } from 'react';
import { CreateUserRequest } from '../../../types';
import { createUser } from '../../../http-requests';

const theme = createTheme();

const SignUp: FC = () => {

  const navigate = useNavigate();

  const [signUp, setSignUp] = useState<CreateUserRequest>({
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    createUser(signUp)
    .then(result => navigate("/signin"))   
  };

  const handleUserName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignUp(prev => ({...prev, userName: event.target.value}))
  }

  const handleFirstName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignUp(prev => ({...prev, firstName: event.target.value}))
  }

  const handleLastName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignUp(prev => ({...prev, lastName: event.target.value}))
  }

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignUp(prev => ({...prev, email: event.target.value}))
  }

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignUp(prev => ({...prev, password: event.target.value}))
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" sx={{
            display: 'flex', 
            width: '100%', 
            height: '100%',
            paddingTop: '100px',
            flexDirection: 'column',
            justifyContent: 'center'}}>
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Регистрация
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  placeholder='Name'
                  value={signUp?.firstName}
                  onChange={handleFirstName}
                  fullWidth
                  id="firstName"
                  label="Имя"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  placeholder='Name'
                  value={signUp?.lastName}
                  onChange={handleLastName}
                  id="lastName"
                  label="Фамилия"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  placeholder='username'
                  value={signUp?.userName}
                  onChange={handleUserName}
                  id="username"
                  label="Псевдоним"
                  name="username"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  placeholder='xxxxxxx@gmail.com'
                  value={signUp?.email}
                  onChange={handleEmail}
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="username"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  value={signUp?.password}
                  onChange={handlePassword}
                  name="password"
                  label="Пароль"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Зарегистрироваться
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/signin">
                  У вас уже есть аккаунт? Войти
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SignUp
