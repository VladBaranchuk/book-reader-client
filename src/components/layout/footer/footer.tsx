import { Box, Button } from '@mui/material'
import { FC } from 'react'
import { Link } from 'react-router-dom'

const menu = [
    {name: 'Каталог', path: '/catalog/1', isAuth: false},
   ];

const Footer: FC = () => {

    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    return (
        <div style={{background: 'gray', width: '100%', height: '50px', display: 'flex'}}>
            <div style={{width: '10%', height: 'inherit', display: 'flex', justifyContent: 'center'}}>
                <Link to='/'>
                    <Button sx={{ my: 2, color: 'white', display: 'block', margin: '8px' }}>
                        LOGO
                    </Button>
                </Link>
            </div>
            <div style={{width: '20%', height: 'inherit'}}>
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', justifyContent: 'center' } }}>
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
            <div style={{width: '70%', height: 'inherit', display: 'flex', justifyContent: 'end'}}>
                <Button sx={{ m: 2, color: 'white', display: 'block', margin: '8px' }}>
                    BookReader &copy; 2022
                </Button>
            </div>
        </div>  
    )
}

export default Footer