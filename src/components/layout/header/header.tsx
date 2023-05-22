import { Box, Button } from '@mui/material'
import { FC, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MyContext } from '../layout';
import { Session } from 'inspector';

const menu = [
    {name: 'Каталог', path: '/catalog/1', isAuth: false, role: "Guest"}
];

const Header: FC = () => {

    const navigate = useNavigate();

    const token = sessionStorage.getItem('token');
    const role = sessionStorage.getItem('role');

    const exitHandler = () => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('role');
        navigate('/');
    }

    var context = useContext(MyContext);

    return (
        <div style={{background: '#fe4e1c', width: '100%', height: '50px', display: context.read ? 'flex' : 'none'}}>
            <div style={{width: '25%', justifyContent: 'center', height: '50px'}}>
                <Link to='/'>
                    <img height="40px" style={{margin: '5px 10px'}} src="logo.png"/>
                </Link>
            </div>
            <div style={{width: '50%', height: 'inherit'}}>
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', justifyContent: 'center', height: 'inherit' } }}>
                <Link to='/catalog/1'>
                    <Button sx={{ my: 2, color: 'white', display: 'block', margin: '8px' }}>
                        Каталог
                    </Button>
                </Link>

                {(role === "User") && 
                    <Link to="/favorite-books/1">
                        <Button
                        sx={{ my: 2, color: 'white', display: 'block', margin: '8px' }}
                        >
                            Избранные
                        </Button>
                    </Link>
                }

                {(role === "User") && 
                    <Link to="/current-books/1">
                        <Button
                        sx={{ my: 2, color: 'white', display: 'block', margin: '8px' }}
                        >
                            Текущие
                        </Button>
                    </Link>
                }

                {(role === "User") && 
                    <Link to="/readed-books/1">
                        <Button
                        sx={{ my: 2, color: 'white', display: 'block', margin: '8px' }}
                        >
                            Прочитанные
                        </Button>
                    </Link>
                }

                {(role === "User") && 
                    <Link to="/scheduled-books/1">
                        <Button
                        sx={{ my: 2, color: 'white', display: 'block', margin: '8px' }}
                        >
                            Сохраненные
                        </Button>
                    </Link>
                }

                {(role === "Administrator") && 
                    <Link to="/admin-bar">
                        <Button
                        sx={{ my: 2, color: 'white', display: 'block', margin: '8px' }}
                        >
                            Админ панель
                        </Button>
                    </Link>
                }
                </Box>
            </div>
            <div style={{width: '25%', height: 'inherit', display: 'flex', justifyContent: 'center'}}>
                {
                    token ? 
                        <Box sx={{display: 'flex', flexDirection: 'row', height: 'inherit'}}>
                            {
                                (role === "User") && 
                                    <Link to='/profile'>
                                        <Button sx={{ my: 2, color: 'white', display: 'block', margin: '8px' }}>
                                            Профиль
                                        </Button>
                                    </Link>
                            }
                            <Button sx={{ my: 2, color: 'white', display: 'block', margin: '8px' }} onClick={exitHandler}>
                                Выйти
                            </Button>
                        </Box>
                            :
                        <Link to='/signin'>
                            <Button sx={{ my: 2, color: 'white', display: 'block', margin: '8px' }}>
                                Войти
                            </Button>
                        </Link>
                }
                
            </div>
        </div>  
    )
}

export default Header