import { FC } from 'react'
import { Category } from '../../../../types'
import CategoriesDataGridItem from './categoriesDataGriditem'
import { Box } from '@mui/material'

interface ICategoriesDataGrid {
    data: Category[]
}

const CateroiesDataGrid: FC<ICategoriesDataGrid> = ({data}) => {
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
                return <CategoriesDataGridItem key={index} item={item} />
            })}
        </Box>
    )
}

export default CateroiesDataGrid