import { FC } from 'react'
import { User } from '../../../../types'
import UsersDataGridItem from './usersDataGridItem'

interface IUserDataGrid {
    data: User[]
}

const UsersDataGrid: FC<IUserDataGrid> = ({data}) => {
    return (
        <div style={{display: 'flex', width: '50.2vw', alignItems: 'start', flexDirection: "column"}}>
            {data?.map((item, index) => {
                return <UsersDataGridItem key={index} item={item} />
            })}
        </div>
    )
}

export default UsersDataGrid