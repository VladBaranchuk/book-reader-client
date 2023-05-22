import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { authenticate, getCurrentUserWithToken } from '../../../http-requests';
import { AuthenticateRequest } from '../../../types';

const SignIn: React.FC = () => {
  
    const theme = createTheme();

    const [signIn, setSignIn] = useState<AuthenticateRequest>({
        email: "",
        password: ""
    })
    
    const navigate = useNavigate();
    
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        authenticate(signIn)
        .then(result => {
            sessionStorage.setItem('token', result!.accessToken);

            getCurrentUserWithToken(result!.accessToken)
            .then(result => {
                if(result !== undefined){
                    sessionStorage.setItem('userId', result.id);
                    sessionStorage.setItem('role', result.role);

                    navigate('/catalog/1');
                }
            })
        })
    };

    const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSignIn(prev => ({...prev, email: event.target.value}))
    }
    
    const handlePassword= (event: React.ChangeEvent<HTMLInputElement>) => {
        setSignIn(prev => ({...prev, password: event.target.value}))
    }

    return(
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs" sx={{
                display: 'flex', 
                paddingTop: '200px',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'}}>
                <CssBaseline />
                <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                >
                    <Typography component="h1" variant="h5">
                        Вход
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            value={signIn.email}
                            onChange={handleEmail}
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            value={signIn.password}
                            onChange={handlePassword}
                            label="Пароль"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                        Войти
                        </Button>
                        <Grid container>
                        <Grid item>
                            <Link to="/signup">"У вас нет аккаунта? Зарегистрироваться"</Link>
                        </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}

export default SignIn