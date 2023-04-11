import { Box, Button, Card, CardActions, CardMedia, Rating, Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { deleteBook, getBook } from '../../../http-requests'
import { GetBookResponse } from '../../../types';
import AddRating from '../../modal/addRating/add-rating';  

const Book: FC = () => {

    const {id} = useParams();
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');
    const role = localStorage.getItem('role');
    const [book, setBook] = useState<GetBookResponse>({
        id: "",
        title: "",
        description: "",
        edition: undefined,
        year: 0,
        totalPages: 0,
        isPublic: false,
        coverImageUrl: "",
        authorName: "",
        rating: 0,
        numberOfVoters: 0,
        fileId: "",
        authorId: "",
        categories: [],
        comments: []
    });
    const [isFavoriteBook, setIsFavoriteBook] = useState<boolean>(false);
    const [addRatingOpen, setAddRatingOpen] = useState<boolean>(false);
    
    useEffect(() => {
        getBook(id!)
        .then(x => setBook(x!))

        // IsFavoriteBook(userId!, id!)
        // .then(x => setIsFavoriteBook(x.isFavoriteBook))
    }, []) 

    const addRatingHandler = () => {
        setAddRatingOpen(!addRatingOpen)
    }

    const addToFavoriteBooksHandler = () => {
        // addToFavoriteBooks(userId!, bookId!)
        // .then(x => {
        //     IsFavoriteBook(userId!, bookId!)
        //     .then(x => setIsFavoriteBook(x.isFavoriteBook))
        // }) 
    }

    const removeFromFavoriteBooksHandler = () => {
        // removeFromFavoriteBooks(userId!, bookId!)
        // .then(x => {
        //     IsFavoriteBook(userId!, bookId!)
        //     .then(x => setIsFavoriteBook(x.isFavoriteBook))
        // })
    }

    const removeBookHandler = () => {
        deleteBook(id!)
        .then(x => navigate('/'))
    }

    return (
        <>
        {addRatingOpen && <AddRating bookId={id!} onClose={addRatingHandler}/>}
        <div style={{display: 'flex', width: '72vw', alignItems: 'start', flexDirection: "column", margin: '20px auto', flexWrap: 'wrap'}}>
            <div style={{display: 'flex', width: '72vw', alignItems: 'start', flexDirection: "row", margin: '20px auto', flexWrap: 'wrap'}}>
                <Card sx={{ width: '22vw', m:2 }}>
                    <CardMedia
                    component="img"
                    image={book.coverImageUrl}
                    alt="Paella dish"
                    />
                </Card>
                <Card sx={{ width: '45vw', m:2, height: 'inherit' }}>
                    <CardActions disableSpacing>
                        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'start'}}>
                            <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                <Typography variant="h4" color="text.secondary" sx={{m:3}}>
                                    <b>{book?.title}</b>
                                </Typography>
                            </Box>
                            <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'start', ml:3}}>
                                <Box sx={{mr:10}}>
                                    <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                    <Rating
                                        value={book?.rating}
                                        precision={0.1}
                                        max={5}
                                        name="unique-rating"
                                    />
                                        <Typography variant="body2" color="text.secondary" sx={{mr:1}}>
                                            <b>{book?.rating.toFixed(1)}</b>
                                        </Typography>
                                        </Box>
                                    <Typography sx={{ml:0.5}} variant="body2" color="text.secondary">
                                        {book?.numberOfVoters}
                                    </Typography>
                                </Box>
                            </Box>
                            <Box sx={{mt: 2}}>
                                <Typography sx={{ml:3, mb:1}} color="text.secondary">
                                    <b>Год: {book?.year}</b>
                                </Typography>
                                <Typography sx={{ml:3, mb:1}} variant="h6" color="text.secondary">
                                    <b>Описание:</b>
                                </Typography>
                                <Typography sx={{ml:5, mb: 3, width: '40vw'}} variant="body1" color="text.secondary">
                                    {book?.description}
                                </Typography>
                            </Box>
                            { (userId !== undefined) &&
                            <Box sx={{display: 'flex'}}>
                                <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', ml:3, mr:1, justifyContent: 'space-between'}}>
                                {
                                    (role === "User") &&
                                    <Button variant="contained" onClick={addRatingHandler} sx={{mr: 1}} size='small'>Оценить</Button>
                                }
                                {
                                    (role === "User") &&
                                    <Link to={`/books/${id}/reader`}>
                                        <Button variant="contained" size='small'>Читать</Button>
                                    </Link>
                                }
                                    
                                    {/* {
                                        isFavoriteBook ? 
                                        <Button variant="contained" color='error' size='small' onClick={removeFromFavoriteBooksHandler}>Удалить из избранных</Button> :
                                        <Button variant="contained" color='success' size='small' onClick={addToFavoriteBooksHandler}>Добавить в избранное</Button>
                                    } */}
                                </Box>
                                <Box>
                                    {
                                        (role === "Administrator") && 
                                        <Button variant="contained" sx={{width: '36px'}}>Edit</Button>
                                    }
                                </Box>
                            </Box>
                            }
                        </Box>
                    </CardActions>
                </Card>
            </div>
        </div> 
        </>
    )
}

export default Book