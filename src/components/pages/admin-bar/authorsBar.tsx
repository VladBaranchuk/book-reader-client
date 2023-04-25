import { Box, Button, TextField, ButtonPropsColorOverrides } from '@mui/material';
import React, { FC, useEffect, useState } from 'react'
import { OverridableStringUnion } from '@mui/types';
import { CreateAuthorRequest } from '../../../types';
import { createAuthor } from '../../../http-requests';

const AuthorsBar: FC = () => {

    const [newAuthorChange, setNewAuthorChange] = useState<OverridableStringUnion<"inherit" | "primary" | "secondary" | "error" | "info" | "success" | "warning", ButtonPropsColorOverrides>>('info')
    const [newAuthor, setNewAuthor] = useState<CreateAuthorRequest>({
        firstName: "",
        lastName: ""
    });

    useEffect(() => {
    }, []) 

    const handleFirstName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewAuthor(prev => ({...prev, firstName: event.target.value}))
    }

    const handleLastName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewAuthor(prev => ({...prev, lastName: event.target.value}))
    }

    const createAuthorHandler = () => {
        createAuthor(newAuthor)
        .then(x => {
            setNewAuthorChange('success')
        })
    }

    return (
        <Box sx={{width: '100%', height: '740px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Box sx={{display: 'flex', flexDirection: 'row'}}>
                <Box sx={{display: 'flex', flexDirection: 'column',  width: '400px'}}>
                    <TextField 
                        InputLabelProps={{ shrink: true }} 
                        value={newAuthor.firstName}
                        onChange={handleFirstName}
                        label="Имя" 
                        variant="outlined" 
                        size="small" />
                    <TextField 
                        sx={{mt:1.5}}
                        InputLabelProps={{ shrink: true }} 
                        value={newAuthor.lastName}
                        onChange={handleLastName}
                        label="Фамилия" 
                        variant="outlined" 
                        size="small" />
                </Box> 
            </Box>
            <Box sx={{mt: 3}}>
                <Button variant="contained" color={newAuthorChange} onClick={createAuthorHandler} component="label">
                    Добавить автора
                </Button>
            </Box>
        </Box> 
    )
}

export default AuthorsBar