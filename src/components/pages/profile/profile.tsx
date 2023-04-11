import { Box, Button, CardMedia, TextField, Typography } from '@mui/material';
import React, { FC, useEffect, useState } from 'react'
import { getCurrentUser, updateUser } from '../../../http-requests'
import { GetBooksResponse, GetUserResponse, UpdateUserRequest } from '../../../types';
import Catalog from '../../catalog/catalog'

const Profile: FC = () => {

    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const [user, setUser] = useState<GetUserResponse>();
    const [books, setBooks] = useState<GetBooksResponse>();
    const [updateButtonDisabled, setUpdateButtonDisabled] = useState(true);
    const [updateProfile, setUpdateProfile] = useState<UpdateUserRequest>({
        id: "",
        userName: "",
        firstName: "",
        lastName: ""
    });

    useEffect(() => {
        getCurrentUser()
        .then(result => {
            setUser(result);

            setUpdateProfile({
                id: result!.id,
                userName: result!.userName,
                firstName: result!.firstName,
                lastName: result!.lastName,
            });
        })

        // getFavoriteBooks(userId!, 1, 12)
        // .then(x => setBooks(x))
    }, [])

    const handleUserName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUpdateProfile(prev => ({...prev, userName: event.target.value}))
        setUpdateButtonDisabled(false)
    }

    const handleFirstName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUpdateProfile(prev => ({...prev, firstName: event.target.value}))
        setUpdateButtonDisabled(false)
    }
    
    const handleLastName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUpdateProfile(prev => ({...prev, lastName: event.target.value}))
        setUpdateButtonDisabled(false)
    }

    const updateProfileHandler = () => {
        updateUser(userId!, updateProfile)
        .then(x => setUpdateButtonDisabled(true))
    }

    return (
        <>
            <Box sx={{m: 4, padding: '20px', borderRadius: "5px", width: '70vw', margin: '20px auto'}}>
                <Typography sx={{mb: 1, fontWeight: 700, fontSize: '26px', color: 'gray'}}>
                    Личные данные
                </Typography>
                <CardMedia
                    component="img"
                    image={user?.avatarUrl}
                    alt="Paella dish"
                    sx={{width: "460px", borderRadius: "5px"}}
                />
                <TextField 
                    id="outlined-basic" 
                    InputLabelProps={{ shrink: true }} 
                    sx={{mr: 2, mt: 2}}
                    value={updateProfile.userName} 
                    onChange={handleUserName}
                    label="Псевдоним" 
                    variant="standard"
                    size="small" />
                <br />
                <TextField 
                    id="outlined-basic" 
                    InputLabelProps={{ shrink: true }} 
                    sx={{mr: 2, mt: 2}} 
                    value={updateProfile.firstName}
                    onChange={handleFirstName}
                    label="Имя" 
                    variant="standard"
                    size="small" />
                <TextField 
                    id="outlined-basic" 
                    InputLabelProps={{ shrink: true }} 
                    sx={{mr: 2, mt: 2}}
                    value={updateProfile.lastName} 
                    onChange={handleLastName}
                    label="Фамилия" 
                    variant="standard" 
                    size="small" />
                <br />
                <Button 
                    variant="contained" 
                    sx={{mr: 2, mt: 2}}
                    color='success'
                    disabled={updateButtonDisabled}
                    onClick={updateProfileHandler}
                    >Обновить</Button>
            </Box>
            <Box>
                <Typography variant="h5" color="text.secondary" sx={{width: '70vw', margin: '20px auto'}}>
                    <b>Любимые книги</b>
                </Typography>
                <Catalog catalog={books?.books}/>
            </Box>
        </>  
    )
}

export default Profile