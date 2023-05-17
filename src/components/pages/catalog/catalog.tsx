import { Box, Button, Pagination, Typography } from '@mui/material';
import React, { FC, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getBooks } from '../../../http-requests'
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import { GetBooksResponse } from '../../../types';
import Catalog from '../../catalog/catalog';
import Filter from '../../modal/addRating/filter';

const BookCatalog: FC = () => {

    const [books, setBooks] = useState<GetBooksResponse>();
    const [openFilter, setOpenFilter] = useState<boolean>(false);
    const {id} = useParams();
    const navigate = useNavigate();
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        navigate(`/catalog/${value}`);

        getBooks(value, 12)
        .then(x => setBooks(x))
    };

    useEffect(() => {
        getBooks(Number(id), 12)
        .then(x => setBooks(x))
    }, [id]) 

    const openFilterhandler = () => {
        setOpenFilter(true);
    }

    const closeFilterhandler = () => {
        setOpenFilter(false);
    }

    return (
        <Box>
            {openFilter && <Filter setBooks={setBooks} onClose={closeFilterhandler}/>}
            <Box sx={{width: 910, m: '0 auto', mb: "-20px", display: 'flex', flexDirection: 'row', alignItems: 'space-between'}}>
                <Typography variant="h5" color="text.secondary" sx={{width: '70vw', margin: '20px auto'}}>
                    <b>Все книги</b>
                </Typography>
                <Button onClick={openFilterhandler}>
                    <TuneOutlinedIcon sx={{color: 'gray'}}/>
                </Button>
            </Box>
            <Catalog catalog={books?.books}/>
            <Box sx={{width: '70vw', margin: '20px auto 100px auto', display: 'flex', justifyContent: 'center'}}>
                <Pagination count={10} page={Number(id)} onChange={handleChange}/>
            </Box>
        </Box>  
    )
}

export default BookCatalog