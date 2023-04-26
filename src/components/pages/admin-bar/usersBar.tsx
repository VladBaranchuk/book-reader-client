import { Box, TextField } from '@mui/material';
import React, { FC, useEffect, useState } from 'react'
import { User } from '../../../types';
import { getUsers, searchUsers } from '../../../http-requests';
import UsersDataGrid from './usersDataGrid/usersDataGrid';

const UsersBar: FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [search, setSearch] = useState<string>("");

    useEffect(() => {
        getUsers(1, 1000)
            .then(x => setUsers(x!.users))
    }, []) 

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        var query = event.target.value.length === 0 ? "" : event.target.value;
        setSearch(query);
        setUsers([])
        searchUsers(query)
        .then(x => setUsers(x!.users));
    }

    return (
        <Box>
            <Box sx={{display: 'flex', flexDirection: 'row', width: '30vw', alignItems: 'center', justifyContent: 'center', margin: '30px auto'}}>
                <TextField
                    margin="normal"
                    placeholder='поиск'
                    required
                    fullWidth
                    sx={{m:0}}
                    size='small'
                    value={search}
                    onChange={handleSearch}/>
            </Box>
            <Box sx={{width: '100%', height: '740px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <UsersDataGrid data={users}/>
            </Box>
        </Box> 
    )
}

export default UsersBar