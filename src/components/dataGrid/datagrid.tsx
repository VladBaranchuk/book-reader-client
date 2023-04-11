import { FC } from 'react'
import DataGridItem from '../dataGridItem/dataGridItem'
import { User } from '../../types'

interface IUserDataGrid {
    data: User[]
}

const DataGrid: FC<IUserDataGrid> = ({data}) => {
    return (
        <div style={{display: 'flex', width: '71vw', alignItems: 'start', flexDirection: "column"}}>
            {data?.map((item, index) => {
                return <DataGridItem key={index} item={item} />
            })}
        </div>
    )
}

export default DataGrid