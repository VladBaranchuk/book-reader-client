import { FC } from 'react';
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

  return (
    <Card sx={{ width: 300, m:2 }}>
      <Link to={`/books/${item?.id}`}>
        <CardMedia
          component="img"
          height="400"
          image={item?.coverImageUrl}
          alt="Paella dish"
        />
      </Link>
      <CardContent>
        <Link to={`/books/${item?.id}`}>
          <Typography variant="h5" color="text.secondary">
            {item?.title}
          </Typography>
        </Link>
      </CardContent>
      <CardActions disableSpacing>
        <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <Box sx={{mr:10}}>
            <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
              <Rating name="read-only" value={item?.rating} readOnly precision={0.1} sx={{mr:1}} />
              <Typography variant="body2" color="text.secondary" sx={{mr:1}}>
                <b>{item?.rating.toFixed(1)}</b>
              </Typography>
            </Box>
            <Typography sx={{ml:0.5}} variant="body2" color="text.secondary">
              {item?.numberOfVoters}
            </Typography>
          </Box>
        </Box>
      </CardActions>
    </Card>
  );
}

export default OrderItem
