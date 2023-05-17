import { Avatar, Box, Card, CardContent, Typography } from '@mui/material';
import { FC, useState } from 'react';
import { Comment } from "../../types"

interface IItem {
  item: Comment | undefined
}

const CommentItem: FC<IItem> = ({item}) => {

  var [comment, setComment] = useState<Comment>(item!);

  var date = new Date(comment.createdAtUtc);

  

  return (
    <Card sx={{ width: 590, m:1, boxShadow: 'none', background: '#f0f0f0' }}>
      <CardContent sx={{'&:last-child': { pb: 2 }}}>
        <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', mb:2}}>
          <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <Avatar src={item?.avatarUrl} sx={{mr:1}} />
            <Typography color="text.secondary">
              <b>{item?.userName}</b>
            </Typography>
          </Box>
          <Typography color="text.secondary">
            {`${date.getDate() + 1}/${date.getUTCMonth() + 1}/${date.getFullYear()}`}
          </Typography>
        </Box>
          <Typography color="text.secondary" sx={{fontSize: '14px', mt: 1}}>
            {item?.text}
          </Typography>
      </CardContent>
    </Card>
  );
}

export default CommentItem
