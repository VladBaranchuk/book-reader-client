import { Box, Button, TextField, ButtonPropsColorOverrides, Divider } from '@mui/material';
import React, { FC, useEffect, useState } from 'react'
import { OverridableStringUnion } from '@mui/types';
import { Category, CreateCategoryRequest } from '../../../types';
import { createCategory, getCategories, searchCategories } from '../../../http-requests';
import CateroiesDataGrid from './categoriesDataGrid/categoriesDataGrid';

const CategoriesBar: FC = () => {

    const [newCategoryChange, setNewCategoryChange] = useState<OverridableStringUnion<"inherit" | "primary" | "secondary" | "error" | "info" | "success" | "warning", ButtonPropsColorOverrides>>('info')
    const [search, setSearch] = useState<string>("");
    const [categories, setCategories] = useState<Category[]>([]);
    const [newCategory, setNewCategory] = useState<CreateCategoryRequest>({
        name: ""
    });

    useEffect(() => {
        getCategories()
            .then(x => setCategories(x!.categories))
    }, []) 

    const handleCategoryName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewCategory(prev => ({...prev, name: event.target.value}))
    }

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        var query = event.target.value.length === 0 ? "" : event.target.value;
        setSearch(query);
        setCategories([])
        searchCategories(query)
        .then(x => setCategories(x!.categories));
    }

    const createCategoryHandler = () => {
        createCategory(newCategory)
        .then(x => {
            setNewCategoryChange('success');
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
                    <CateroiesDataGrid data={categories}/>
                </Box>
                <Button variant="contained" component="label">
                    Добавить категорию
                </Button>   
            </Box>
            <Divider orientation="vertical" />
            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
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
                    <Button variant="contained" color={newCategoryChange} onClick={createCategoryHandler} component="label">
                        Добавить категорию
                    </Button>               
                </Box>
            </Box>
        </Box> 
    )
}

export default CategoriesBar