import { FC, useState } from 'react'
import { Category } from '../../../../types'
import { Box, Button, Card, SxProps, Theme, Typography } from '@mui/material'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

interface IData{
    item: Category,
    edit: Function,
    remove: Function
}

const CategoriesDataGridItem: FC<IData> = ({item, edit, remove}) => {
    const [category, setCategory] = useState<Category>(item!);

    const editHandler = () => {
        edit(category)
    }

    const removeHandler = () => {
        remove(category)
    }

    return (
        <Card sx={{width: '98%', 
            minHeight: '40px', 
            mb: 1, 
            mr: 1, 
            display: 'flex', 
            boxSizing: 'border-box', 
            flexDirection: 'row', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            boxShadow: 'none', 
            border: '1px solid #c4c4c4', 
            '&:hover': {
                borderColor: 'black'
            },
            '&:hover .MuiTypography-root': {
                color: 'black'
            }}}>
                <Typography variant="body2" color="text.secondary" sx={{pl: 1}}>
                    <b>{category.name}</b>
                </Typography>
                <Box>
                    <Button onClick={editHandler} sx={{minWidth: '32px', '&:hover .MuiSvgIcon-root': { color: 'orange' }}}>
                        <ModeEditOutlineOutlinedIcon sx={{color: 'gray'}}/>
                    </Button>
                    <Button onClick={removeHandler} sx={{minWidth: '32px', '&:hover .MuiSvgIcon-root': { color: 'red' }}}>
                        <DeleteOutlineOutlinedIcon sx={{color: 'gray'}}/>
                    </Button>
                </Box>
        </Card>
    )
}

export default CategoriesDataGridItem