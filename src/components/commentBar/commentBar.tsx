import { FC } from 'react'
import { Comment } from '../../types'
import CommentItem from './commentItem'

interface ICommentBar {
    catalog: Comment[] | undefined
}

const CommentBar: FC<ICommentBar> = ({catalog}) => {

    return (
        <div style={{display: 'flex', width: '600px', alignItems: 'start', flexDirection: "column"}}>
            {catalog?.map((item, index) => {
                return <CommentItem key={index} item={item} />
            })}
        </div>
    )
}

export default CommentBar