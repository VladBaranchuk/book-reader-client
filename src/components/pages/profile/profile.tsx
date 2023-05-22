import { Box, Button, CardMedia, Fab, TextField, Typography } from '@mui/material';
import React, { FC, useEffect, useState } from 'react'
import { addAvatar, getCurrentUser, updateUser } from '../../../http-requests'
import { GetBooksResponse, GetUserResponse, UpdateUserRequest } from '../../../types';
import Catalog from '../../catalog/catalog'
import AddIcon from '@mui/icons-material/Add';

const Profile: FC = () => {

    const userId = sessionStorage.getItem('userId');
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

    const uploadFileHandler = (event: React.FormEvent<HTMLInputElement>) => {
        addAvatar(userId!, event.currentTarget.files?.item(0)!)
        .then(x => setUser(x!))
    }

    return (
        <>
            <Box sx={{m: 4, padding: '20px', borderRadius: "5px", width: '70vw', margin: '20px auto'}}>
                <Typography sx={{mb: 1, fontWeight: 700, fontSize: '26px', color: 'gray'}}>
                    Личные данные
                </Typography>
                <Box sx={{width: '100%', display: 'flex', flexDirection: 'row', mb: 2}}>
                    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'end'}}>
                        {
                            user?.avatarUrl === null ?
                            <CardMedia
                                component="img"
                                image="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                                alt="Paella dish"
                                sx={{width: "460px", borderRadius: "5px", mr: 5}}/> : 
                            <CardMedia
                                component="img"
                                image={user?.avatarUrl}
                                alt="Paella dish"
                                sx={{width: "460px", borderRadius: "5px", mr: 5}}/>
                        }
                        <Fab color="primary" component="label" aria-label="add" size='medium' sx={{mr: 7, mt: -8}}>
                            <AddIcon />
                            <input type="file" hidden accept="image/*" onChange={uploadFileHandler} />
                        </Fab>
                    </Box>
                    <Box>
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
                </Box>
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