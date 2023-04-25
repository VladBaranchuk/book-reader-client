import { FC, useState } from 'react'
import { User } from '../../../../types'
import { Avatar, Button, Card, Typography } from '@mui/material'
import { lockout, unlocked } from '../../../../http-requests'

interface IData{
    item: User
}

const UsersDataGridItem: FC<IData> = ({item}) => {

    const [user, setUser] = useState<User>(item!);

    const lockoutHandler = () => {
        lockout(user.id)
        .then(x => setUser(x!))
    }

    const unlockHandler = () => {
        unlocked(user.id)
        .then(x => setUser(x!))
    }

    return (
        <Card sx={{width: '100%', mb: 1, p:1, display: 'flex', flexDirection: 'row', alignItems: 'center', boxShadow: 'none', border: '1px solid #c4c4c4'}}>
            <Avatar src={user.avatarUrl} sx={{mr:1}}/>
            <Typography variant="body2" sx={{width: '120px', pl: 1}} color="text.secondary">
                <b>@{user.userName}</b>
            </Typography>
            <Typography variant="body2" sx={{width: '290px', borderLeft: '1px solid gray', pl: 1}} color="text.secondary">
                <b>{user.id}</b>
            </Typography>
            <Typography variant="body2" sx={{width: '100px', borderLeft: '1px solid gray', pl: 1}} color="text.secondary">
                <b>{user.firstName}</b>
            </Typography>
            <Typography variant="body2" sx={{width: '100px', borderLeft: '1px solid gray', pl: 1}} color="text.secondary">
                <b>{user.lastName}</b>
            </Typography>
            <Typography variant="body2" sx={{width: '100px', borderLeft: '1px solid gray', pl: 1}} color="text.secondary">
                <b>{user.role}</b>
            </Typography>
            
            {
                user.isLocked ? 
                <Button variant="contained" color='success' size='small' sx={{ml: 3, boxShadow: 'none'}} onClick={unlockHandler}>Разблокировать</Button> :
                <Button variant="contained" color='error' size='small' sx={{ml: 3, boxShadow: 'none'}} onClick={lockoutHandler}>Заблокировать</Button>
            }
        </Card>
    )
}

export default UsersDataGridItem