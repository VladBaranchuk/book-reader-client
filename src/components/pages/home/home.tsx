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
            <Catalog catalog={books}/>
        </div>  
    )
}

export default Home