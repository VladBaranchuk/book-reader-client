import { FC, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box, CardActions, CardMedia, Rating } from '@mui/material';
import { Book } from '../../types';
import { Link } from 'react-router-dom';  

interface IItem {
  item: Book | undefined
}

const OrderItem: FC<IItem> = ({item}) => {

  const [book, setBook] = useState<Book>(item!);

  return (
    <Card sx={{ width: 200, m:2 }}>
      <Link to={`/books/${book?.id}`}>
        <CardMedia
          component="img"
          height="300"
          image={book?.coverImageUrl}
        />
      </Link>
      <CardContent>
        <Link to={`/books/${book?.id}`}>
          <Typography color="text.secondary">
            <b>{book?.title}</b>
          </Typography>
          <Typography color="text.secondary" sx={{fontSize: '14px', mt: 1}}>
            Автор: {book?.authorName}
          </Typography>
        </Link>
      </CardContent>
      <CardActions>
        <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <Rating name="read-only" value={book?.rating} readOnly precision={0.1} sx={{mr:1}} />
            <Typography color="text.secondary" sx={{mr:1}}>
              <b>{book?.rating.toFixed(1)}</b>
            </Typography>
          </Box>
          <Typography color="text.secondary">
            ({book?.numberOfVoters})
          </Typography>
        </Box>
      </CardActions>
    </Card>
  );
}

export default OrderItem
