import { FC, useState } from 'react'
import { Author } from '../../../../types'
import { Box, Button, Card, Typography } from '@mui/material'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Notify from '../../../modal/addRating/notify';

interface IData{
    item: Author,
    edit: Function,
    remove: Function
}

const AuthorsDataGridItem: FC<IData> = ({item, edit, remove}) => {
    const [author, setAuthor] = useState<Author>(item!);
    const [notify, setNotify] = useState<boolean>(false);

    const editHandler = () => {
        edit(author)
    }

    const removeHandler = () => {
        setNotify(true)
    }

    return (
        <>
        {notify && <Notify onDelete={() => {remove(author); setNotify(false)}} onClose={setNotify} message={"Автор будет удален вместе со всеми его книгами"}/>}
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
                    <b>{author.firstName + " " + author.lastName}</b>
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
        </>
    )
}

export default AuthorsDataGridItem