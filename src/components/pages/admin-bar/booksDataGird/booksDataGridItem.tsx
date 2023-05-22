import { FC, useState } from 'react'
import { Book } from '../../../../types'
import { Box, Button, Card, CardMedia, FormControlLabel, Rating, Typography } from '@mui/material'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import PublicIcon from '@mui/icons-material/Public';
import PublicOffIcon from '@mui/icons-material/PublicOff';
import { publish, recall } from '../../../../http-requests';

interface IData{
    item: Book,
    edit: Function,
    remove: Function
}

const BooksDataGridItem: FC<IData> = ({item, edit, remove}) => {
    
    const [book, setBook] = useState<Book>(item!);
    const [isPulbic, setIsPublic] = useState<boolean>(item.isPublic);

    const editHandler = () => {
        edit(book)
    }

    const removeHandler = () => {
        remove(book)
    }

    const isPublicHandler = () => {
        if(isPulbic){
            recall(book.id)
                .then(x => setIsPublic(x!.isPublic))
        }
        else{
            publish(book.id)
                .then(x => setIsPublic(x!.isPublic))
        }
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
                <Box sx={{display: 'flex', flexDirection: 'row'}}>
                    <CardMedia
                        component="img"
                        image={book.coverImageUrl}
                        sx={{width: '80px'}}
                    />
                    <Box sx={{display: 'flex', flexDirection: 'column', m:1, ml: 2}}>
                        <Typography color="text.secondary">
                            <b>{book?.title}</b>
                        </Typography>
                        <Typography color="text.secondary" sx={{fontSize: '14px', mt: 1}}>
                            Автор: {book?.authorName}
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-around'}}>
                    <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                        <Button onClick={editHandler} sx={{minWidth: '32px', '&:hover .MuiSvgIcon-root': { color: 'orange' }}}>
                            <ModeEditOutlineOutlinedIcon sx={{color: 'gray'}}/>
                        </Button>
                        <Button onClick={removeHandler} sx={{minWidth: '32px', '&:hover .MuiSvgIcon-root': { color: 'red' }}}>
                            <DeleteOutlineOutlinedIcon sx={{color: 'gray'}}/>
                        </Button>
                    </Box>
                    <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <Button onClick={isPublicHandler}>
                            {isPulbic ? <PublicIcon sx={{color: 'green'}}/> : <PublicOffIcon sx={{color: 'red'}}/>}
                        </Button> 
                    </Box>
                </Box>
                
        </Card>
    )
}

export default BooksDataGridItem