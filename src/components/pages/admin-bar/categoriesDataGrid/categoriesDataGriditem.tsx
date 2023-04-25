import { FC, useState } from 'react'
import { Category } from '../../../../types'
import { Box, Button, Card, Typography } from '@mui/material'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

interface IData{
    item: Category
}

const CategoriesDataGridItem: FC<IData> = ({item}) => {

    const [category, setCategory] = useState<Category>(item!);

    return (
        <Card sx={{width: '98%', minHeight: '40px', mb: 1, mr: 1, display: 'flex', boxSizing: 'border-box', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', boxShadow: 'none', border: '1px solid #c4c4c4'}}>
            <Typography variant="body2" color="text.secondary" sx={{pl: 1}}>
                <b>{category.name}</b>
            </Typography>
            <Box>
                <Button sx={{minWidth: '32px'}}>
                    <ModeEditOutlineOutlinedIcon sx={{color: 'gray'}}/>
                </Button>
                <Button sx={{minWidth: '32px'}}>
                    <DeleteOutlineOutlinedIcon sx={{color: 'gray'}}/>
                </Button>
            </Box>
        </Card>
    )
}

export default CategoriesDataGridItem