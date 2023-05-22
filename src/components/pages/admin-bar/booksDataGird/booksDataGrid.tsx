import { FC } from 'react'
import { Book } from '../../../../types'
import { Box } from '@mui/material'
import BooksDataGridItem from './booksDataGridItem'

interface IBooksDataGrid {
    data: Book[]
    editHandler: Function,
    removeHandler: Function
}

const BooksDataGrid: FC<IBooksDataGrid> = ({data, editHandler, removeHandler}) => {
    return (
        <Box sx={{display: 'flex', width: '100%', height: '330px', alignItems: 'start', flexDirection: "column", overflow: "auto",
            scrollbarWidth: 'thin',
            '&::-webkit-scrollbar': {
            width: '0.4em',
            },
            '&::-webkit-scrollbar-track': {
            background: "#f1f1f1",
            },
            '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#888',
            },
            '&::-webkit-scrollbar-thumb:hover': {
            background: '#555'
        }}}>
            {data?.map((item, index) => {
                return <BooksDataGridItem key={index} item={item} edit={editHandler} remove={removeHandler}/>
            })}
        </Box>
    )
}

export default BooksDataGrid