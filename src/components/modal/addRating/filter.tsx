import { Autocomplete, Box, Button, ButtonPropsColorOverrides, Checkbox, CircularProgress, FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Rating, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import React, { FC, ReactNode, SyntheticEvent, useEffect, useState } from "react";
import { getAuthors, getCategories, searchBooks } from "../../../http-requests";
import { AddRatingRequest, Author, Category, GetBooksResponse, SearchBooksRequest } from "../../../types";

interface IAddRating {
    setBooks: React.Dispatch<React.SetStateAction<GetBooksResponse | undefined>>
    onClose: React.MouseEventHandler<HTMLButtonElement>
}

const Filter: FC<IAddRating> = ({setBooks, onClose}) => {

    const [authors, setAuthors] = useState<Author[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [filter, setFilter] = useState<SearchBooksRequest>({
        searchString: undefined,
        minRatingValue: undefined,
        maxRatingValue: undefined,
        isPopular: undefined,
        isNewer: undefined,
        isBetter: undefined,
        estimateDate: 4,
        categories: undefined,
        authorId: undefined
    });

    useEffect(() => {
        getAuthors()
            .then(x => setAuthors(x!.authors))
        
        getCategories()
            .then(x => setCategories(x!.categories))
    }, []) 

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        var query = event.target.value.length === 0 ? undefined : event.target.value;
        setFilter(prev => ({...prev, searchString: query}))
    }

    const handleIsPopular = (event: SyntheticEvent<Element, Event>, checked: boolean) => {
        setFilter(prev => ({...prev, isPopular: checked}))
    }

    const handleIsNewer = (event: SyntheticEvent<Element, Event>, checked: boolean) => {
        setFilter(prev => ({...prev, isNewer: checked}))
    }

    const handleIsBetter = (event: SyntheticEvent<Element, Event>, checked: boolean) => {
        setFilter(prev => ({...prev, isBetter: checked}))
    }

    const handleEstimateDate = (event: SelectChangeEvent<number>) => {
        var query = event.target.value === undefined ? undefined : event.target.value;
        setFilter(prev => ({...prev, estimateDate: query as number}))
    }

    const handleMinRating = (event: SyntheticEvent<Element, Event>, value: number | null) => {
        var query = value === null ? undefined : value;
        setFilter(prev => ({...prev, minRatingValue: query}))
    }

    const handleMaxRating = (event: SyntheticEvent<Element, Event>, value: number | null) => {
        var query = value === null ? undefined : value;
        setFilter(prev => ({...prev, maxRatingValue: query}))
    }

    const handleAuthor = (event: SyntheticEvent<Element, Event>, value: { id: string; label: string; } | null) => {
        value === null ? setFilter(prev => ({...prev, authorId: undefined})) : setFilter(prev => ({...prev, authorId: value.id}))
    }

    const handleCategories = (event: SyntheticEvent<Element, Event>, value: { id: string; label: string; }[] | null) => {
        value === null ? setFilter(prev => ({...prev, categories: undefined})) : setFilter(prev => ({...prev, categories: value.map(item => item.id)}))
    }

    const searchHandler = () => {
        setBooks(undefined);
        searchBooks(1, 12, filter)
        .then(x => setBooks(x))
    }

    const categoryProps = {
        options: categories.map(option => ({id: option.id, label: option.name})),
    };

    const authorProps = {
        options: authors.map(option => ({id: option.id, label: `${option.firstName} ${option.lastName}`})),
    };

return (
    <React.Fragment>
        <Box sx={{
            position: 'fixed',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: '5rem',
            zIndex: 1
        }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'start',
                flexDirection: 'column',
                alignItems: 'center',
                width: '900px',
                height: '400px',
                background: 'white',
                borderRadius: '8px'
            }}>
                <Box sx={{width: '100%', display: 'flex', justifyContent: 'end', mb:2}}>
                    <Button sx={{ color: 'gray', minWidth: '32px'}} onClick={onClose}><CloseIcon/></Button>
                </Box>
                <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <TextField sx={{width: '400px', mb: 3}} value={filter.searchString} onChange={handleSearch} id="outlined-basic" label="Поиск" variant="outlined" size='small' />
                    <Box sx={{display: 'flex', alignItems: 'end', mb: 3}}>
                        <Box sx={{mr:1}}>
                            <FormGroup sx={{width: '400px', mb: 1}}>
                                <FormControlLabel control={<Checkbox />} value={filter.isPopular} onChange={handleIsPopular} label="Популярные" />
                                <FormControlLabel control={<Checkbox />} value={filter.isNewer} onChange={handleIsNewer} label="Новые" />
                                <FormControlLabel control={<Checkbox />} value={filter.isBetter} onChange={handleIsBetter} label="Лучшие" />
                            </FormGroup>
                            <FormControl sx={{width: '400px'}}>
                                <InputLabel id="demo-simple-select-label" size='small'>Время</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="время"
                                    size='small'
                                    onChange={handleEstimateDate}
                                    value={filter.estimateDate}
                                >
                                    <MenuItem value={1}>За неделю</MenuItem>
                                    <MenuItem value={2}>За месяц</MenuItem>
                                    <MenuItem value={3}>За год</MenuItem>
                                    <MenuItem value={4}>За все время</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <Box>
                            <Box sx={{width: '400px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', mb: 3}}>
                                <Box>
                                    <Typography component="legend">Минимальный рейтинг</Typography>
                                    <Rating name="read-only" value={filter.minRatingValue} onChange={handleMinRating} />
                                </Box>
                                <Box>
                                    <Typography component="legend">Максимальный рейтинг</Typography>
                                    <Rating name="read-only" value={filter.maxRatingValue} onChange={handleMaxRating} />
                                </Box>
                            </Box>
                            <Autocomplete
                                {...categoryProps}
                                disableClearable
                                disablePortal
                                multiple
                                id="tags-standard"
                                sx={{width: '400px', mb: 1}}
                                onChange={handleCategories}
                                getOptionLabel={(option) => option.label}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        variant="outlined"
                                        label="Категории"
                                        size="small"
                                    />
                                    )}
                                size="small"/>
                            <Autocomplete
                                {...authorProps}
                                disablePortal
                                id="combo-box-demo"
                                onChange={handleAuthor}
                                renderInput={(params) => <TextField {...params} label="Aвтор"/>}
                                size="small"/>
                        </Box>
                    </Box>
                    <Button variant="contained" onClick={searchHandler}>Поиск</Button>
                </Box>
            </Box>
        </Box>
    </React.Fragment>
  );
}

export default Filter;
