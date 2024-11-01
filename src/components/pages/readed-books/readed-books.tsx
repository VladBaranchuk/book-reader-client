import { Box, Pagination, Typography } from '@mui/material';
import React, { FC, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getReadedBooks } from '../../../http-requests'
import { GetBooksResponse} from '../../../types';
import Catalog from '../../catalog/catalog';

const ReadedBooks: FC = () => {

    const {id} = useParams();
    const [books, setBooks] = useState<GetBooksResponse>();
    const navigate = useNavigate();
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        navigate(`/favorite-books/${value}`);

        getReadedBooks(value, 12)
        .then(x => setBooks(x))
    };

    useEffect(() => {
        getReadedBooks(Number(id), 12)
        .then(x => setBooks(x))
    }, [id]) 

    return (
        <div>
            <Typography variant="h5" color="text.secondary" sx={{width: '70vw', margin: '20px auto'}}>
                <b>Прочитанные книги</b>
            </Typography>
            <Catalog catalog={books?.books}/>
            <Box sx={{width: '70vw', margin: '20px auto 100px auto', display: 'flex', justifyContent: 'center'}}>
                <Pagination count={10} page={Number(id)} onChange={handleChange}/>
            </Box>
        </div>  
    )
}

export default ReadedBooks