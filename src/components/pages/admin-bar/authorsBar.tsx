import { Box, Button, TextField, Divider, CircularProgress } from '@mui/material';
import React, { FC, useEffect, useState } from 'react'
import CheckIcon from '@mui/icons-material/Check';
import { Author, CreateAuthorRequest } from '../../../types';
import { createAuthor, getAuthors, searchAuthors, deleteAuthor, updateAuthor } from '../../../http-requests';
import AuthorsDataGrid from './authorsDataGrid/authorsDataGrid';
import Notify from '../../modal/addRating/notify';

enum ToDo{
    None,
    Add,
    Edit
}

enum Success{
    None,
    Load,
    Success
}

const AuthorsBar: FC = () => {

    const [notify, setNotify] = useState<boolean>(false);
    const [success, setSuccess] = useState<Success>(Success.None)
    const [search, setSearch] = useState<string>("");
    const [authors, setAuthors] = useState<Author[]>([]);
    const [todo, setTodo] = useState<ToDo>(ToDo.Add);
    const [newAuthor, setNewAuthor] = useState<CreateAuthorRequest>({
        firstName: "",
        lastName: ""
    });
    const [editItem, setEditItem] = useState<Author>({
        id: "",
        firstName: "",
        lastName: ""
    });

    useEffect(() => {
        getAuthors()
            .then(x => setAuthors(x!.authors))
    }, []);

    const editHandler = (item: Author) => {
        setEditItem(item);
        setTodo(ToDo.Edit);
    }

    const removeHandler = (item: Author) => {
        removeAuthorHandler(item);
    }

    const handleFirstName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewAuthor(prev => ({...prev, firstName: event.target.value}))
    }

    const handleLastName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewAuthor(prev => ({...prev, lastName: event.target.value}))
    }

    const handleEditFirstName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditItem(prev => ({...prev, firstName: event.target.value}))
    }

    const handleEditLastName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditItem(prev => ({...prev, lastName: event.target.value}))
    }



    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        var query = event.target.value.length === 0 ? "" : event.target.value;
        setSearch(query);
        setAuthors([])
        searchAuthors(query)
        .then(x => setAuthors(x!.authors));
    }


    const handleClearButton = () => {
        setTimeout(() => {
            setNewAuthor({
                firstName: "",
                lastName: ""
            });
            setSuccess(Success.None);
        }, 1000);
    }



    const updateAuthorHandler = () => {
        updateAuthor(editItem.id, editItem)
        .then(item => {
            if(item){
                setSuccess(Success.Success);
                handleClearButton();

                const newAuthors = authors.map(o => {
                    if (o.id === item?.id) {
                        return item as Author;
                    }
                    return o;
                });

                setAuthors([]);
                setAuthors(newAuthors);
            }
        })
    }

    const createAuthorHandler = () => {
        createAuthor(newAuthor)
        .then(item => {
            if(item){
                setSuccess(Success.Success);
                handleClearButton();

                authors.unshift(item as Author)

                setAuthors([]);
                setAuthors(authors);
            }
        })
    }

    const removeAuthorHandler = (item: Author) => {
        deleteAuthor(item.id)
        .then(item => {
            const newAuthors = authors.filter(x => x.id !== item?.id);

            setAuthors([]);
            setAuthors(newAuthors);
        })
    }

    return (
        <>
        <Box sx={{width: '100%', height: '77vh', display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'start'}}>
                <Box sx={{display: 'flex', flexDirection: 'row', width: '30vw', alignItems: 'center', justifyContent: 'center', margin: '30px auto'}}>
                    <TextField
                        margin="normal"
                        placeholder='поиск'
                        required
                        fullWidth
                        sx={{m:0}}
                        size='small'
                        value={search}
                        onChange={handleSearch}/>
                </Box>
                <Box sx={{width: '100%', height: '740px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <AuthorsDataGrid data={authors} editHandler={editHandler} removeHandler={removeHandler}/>
                </Box>
                <Button variant="contained" onClick={() => setTodo(ToDo.Add)} component="label" color='success'>
                    Добавить автора
                </Button>   
            </Box>
            <Divider orientation="vertical" />
            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                {
                    todo === ToDo.Add && 
                        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
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
                            {
                                success === Success.None ?
                                <Button variant="contained" onClick={createAuthorHandler} component="label" color='success'>Добавить</Button> :
                                    success === Success.Load ?
                                        <Box sx={{ display: 'flex' }}>
                                            <CircularProgress />
                                        </Box> :
                                        success === Success.Success &&
                                            <Button component="label">
                                                <CheckIcon sx={{color: "green"}}/>
                                            </Button>
                            }       
                            </Box>
                        </Box>
                }
                {
                    todo === ToDo.Edit && 
                        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            <Box sx={{display: 'flex', flexDirection: 'row'}}>
                                <Box sx={{display: 'flex', flexDirection: 'column',  width: '400px'}}>
                                <TextField 
                                    InputLabelProps={{ shrink: true }} 
                                    value={editItem.firstName}
                                    onChange={handleEditFirstName}
                                    label="Имя" 
                                    variant="outlined" 
                                    size="small" />
                                <TextField 
                                    sx={{mt:1.5}}
                                    InputLabelProps={{ shrink: true }} 
                                    value={editItem.lastName}
                                    onChange={handleEditLastName}
                                    label="Фамилия" 
                                    variant="outlined" 
                                    size="small" />
                                </Box> 
                            </Box>
                            <Box sx={{mt: 3}}>
                            {
                                success === Success.None ?
                                <Button variant="contained" onClick={updateAuthorHandler} component="label" color='warning'>Обновить</Button> :
                                    success === Success.Load ?
                                        <Box sx={{ display: 'flex' }}>
                                            <CircularProgress />
                                        </Box> :
                                        success === Success.Success &&
                                            <Button component="label">
                                                <CheckIcon sx={{color: "green"}}/>
                                            </Button>
                            }        
                            </Box>
                        </Box>
                }
            </Box>
        </Box> 
        </>
    )
}

export default AuthorsBar