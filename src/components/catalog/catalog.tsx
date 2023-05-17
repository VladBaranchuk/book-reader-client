import { FC } from 'react'
import { Book } from '../../types'
import BookItem from '../bookItem/bookItem'

interface ICatalog {
    catalog: Book[] | undefined
}

const Posts: FC<ICatalog> = ({catalog}) => {

    return (
        <div style={{display: 'flex', width: 930, alignItems: 'start', flexDirection: "row", margin: '20px auto', flexWrap: 'wrap'}}>
            {catalog?.map((item, index) => {
                return <BookItem key={index} item={item} />
            })}
        </div>
    )
}

export default Posts