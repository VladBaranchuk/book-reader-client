import { Box, Button, TextField, ButtonPropsColorOverrides, Divider, CircularProgress } from '@mui/material';
import React, { FC, useEffect, useState } from 'react'
import CheckIcon from '@mui/icons-material/Check';
import { Category, CreateCategoryRequest } from '../../../types';
import { createCategory, deleteCategory, getCategories, searchCategories, updateCategory } from '../../../http-requests';
import CateroiesDataGrid from './categoriesDataGrid/categoriesDataGrid';

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

const CategoriesBar: FC = () => {

    const [success, setSuccess] = useState<Success>(Success.None)
    const [search, setSearch] = useState<string>("");
    const [categories, setCategories] = useState<Category[]>([]);
    const [todo, setTodo] = useState<ToDo>(ToDo.Add);
    const [newCategory, setNewCategory] = useState<CreateCategoryRequest>({
        name: ""
    });
    const [editItem, setEditItem] = useState<Category>({
        id: "",
        name: ""
    });

    useEffect(() => {
        getCategories()
            .then(x => setCategories(x!.categories))
    }, []);

    const editHandler = (item: Category) => {
        setEditItem(item);
        setTodo(ToDo.Edit);
    }

    const removeHandler = (item: Category) => {
        removeCategoryHandler(item);
    }

    const handleCategoryName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewCategory(prev => ({...prev, name: event.target.value}))
    }

    const handleEditCategoryName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditItem(prev => ({...prev, name: event.target.value}))
    }



    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        var query = event.target.value.length === 0 ? "" : event.target.value;
        setSearch(query);
        setCategories([])
        searchCategories(query)
        .then(x => setCategories(x!.categories));
    }


    const handleClearButton = () => {
        setTimeout(() => {
            setNewCategory({
                name: ""
            });
            setSuccess(Success.None);
        }, 1000);
    }



    const updateCategoryHandler = () => {
        updateCategory(editItem.id, editItem)
        .then(item => {
            setSuccess(Success.Success);
            handleClearButton();

            const newCategories = categories.map(o => {
                if (o.id === item?.id) {
                    return item as Category;
                }
                return o;
            });

            setCategories([]);
            setCategories(newCategories);
        })
    }

    const createCategoryHandler = () => {
        createCategory(newCategory)
        .then(item => {
            setSuccess(Success.Success);
            handleClearButton();

            categories.unshift(item as Category)

            setCategories([]);
            setCategories(categories);
        })
    }

    const removeCategoryHandler = (item: Category) => {
        deleteCategory(item.id)
        .then(item => {
            const newCategories = categories.filter(x => x.id !== item?.id);

            setCategories([]);
            setCategories(newCategories);
        })
    }

    return (
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
                    <CateroiesDataGrid data={categories} editHandler={editHandler} removeHandler={removeHandler}/>
                </Box>
                <Button variant="contained" onClick={() => setTodo(ToDo.Add)} component="label" color='success'>
                    Добавить категорию
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
                                        value={newCategory.name}
                                        onChange={handleCategoryName}
                                        label="Название" 
                                        variant="outlined" 
                                        size="small" />
                                </Box> 
                            </Box>
                            <Box sx={{mt: 3}}>
                            {
                                success === Success.None ?
                                <Button variant="contained" onClick={createCategoryHandler} component="label" color='success'>Добавить</Button> :
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
                                        value={editItem.name}
                                        onChange={handleEditCategoryName}
                                        label="Название" 
                                        variant="outlined" 
                                        size="small" />
                                </Box> 
                            </Box>
                            <Box sx={{mt: 3}}>
                            {
                                success === Success.None ?
                                <Button variant="contained" onClick={updateCategoryHandler} component="label" color='warning'>Обновить</Button> :
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
    )
}

export default CategoriesBar