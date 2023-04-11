import { Box, Button } from '@mui/material'
import { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const menu = [
    {name: 'Каталог', path: '/catalog/1', isAuth: false, role: "Guest"}
   ];
   

const Header: FC = () => {

    const navigate = useNavigate();

    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    const exitHandler = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        localStorage.removeItem('role')
        navigate('/')
    }

    return (
        <div style={{background: '#fe4e1c', width: '100%', height: '50px', display: 'flex'}}>
            <div style={{width: '25%', justifyContent: 'center', height: '50px'}}>
                <Link to='/'>
                    <Button sx={{ my: 2, color: 'white', display: 'block', margin: '8px' }}>
                        LOGO
                    </Button>
                </Link>
            </div>
            <div style={{width: '50%', height: 'inherit'}}>
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', justifyContent: 'center', height: 'inherit' } }}>
                {
                    menu.map((page, index) => {
                        if((!page.isAuth || token)){
                            return (<Link key={index} to={page.path}>
                                <Button
                                sx={{ my: 2, color: 'white', display: 'block', margin: '8px' }}
                                >
                                    {page.name}
                                </Button>
                            </Link>)
                        }
                    })
                }

                {(role === "User") && 
                    <Link to="/favorite-books/1">
                        <Button
                        sx={{ my: 2, color: 'white', display: 'block', margin: '8px' }}
                        >
                            Любимые книги
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
                            (role === "User") && <Link to='/profile'>
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