import { Box, Button, TextField } from '@mui/material';
import React, { FC, useEffect, useState } from 'react'
import { getBooks, searchBooks } from '../../../http-requests'
import { Book, SearchBooksRequest } from '../../../types';
import Catalog from '../../catalog/catalog'

const Home: FC = () => {
    const [books, setBooks] = useState<Book[]>();
    const [search, setSearch] = useState<SearchBooksRequest>({
        searchString: "",
        minRatingValue: 0,
        maxRatingValue: 5,
        isPopular: false,
        isNewer: false,
        isBetter: false,
        estimateDate: 0,
        categories: [],
        authorId: ""
    });

    // const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setSearch(event.target.value)
    // }

    const handleSearch = () => {
        searchBooks(1, 10, search)
        .then(x => setBooks(x?.books))
    }

    useEffect(() => {
        getBooks(1, 10)
        .then(x => setBooks(x?.books))
    }, [])

    return (
        <div>
            <Box sx={{display: 'flex', flexDirection: 'row', width: '30vw', alignItems: 'center', justifyContent: 'center', margin: '30px auto'}}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    sx={{m:0}}
                    size='small'
                    value={search}
                    onChange={handleSearch}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    onClick={handleSearch}
                    sx={{ ml: 1, width: '50px' }}
                >
                    Поиск
                </Button>
            </Box>
            <Catalog catalog={books}/>
        </div>  
    )
}

export default Home