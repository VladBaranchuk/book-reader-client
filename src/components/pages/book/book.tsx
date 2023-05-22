import { Avatar, Box, Button, ButtonGroup, Card, CardActions, CardMedia, Checkbox, ClickAwayListener, Fab, Grow, ListItemText, MenuItem, MenuList, Paper, Popper, Rating, TextField, Typography } from '@mui/material';
import { FC, useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import SendIcon from '@mui/icons-material/Send';
import { addToCurrentBooks, addToFavoriteBooks, addToReadedBooks, addToScheduledBooks, createComment, deleteBook, getAuthorBooks, getBook, getUser, isCurrentBook, isFavoriteBook, isReadedBook, isScheduledBook, removeFromCurrentBooks, removeFromFavoriteBooks, removeFromReadedBooks, removeFromScheduledBooks } from '../../../http-requests'
import { CreateCommentRequest, GetBookResponse, GetBooksResponse, GetUserResponse, Comment } from '../../../types';
import AddRating from '../../modal/addRating/add-rating';  
import CommentBar from '../../commentBar/commentBar';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import BookItem from '../../bookItem/bookItem';
import FavoriteIcon from '@mui/icons-material/Favorite';

const Book: FC = () => {

    const {id} = useParams();
    const navigate = useNavigate();
    const userId = sessionStorage.getItem('userId');
    const role = sessionStorage.getItem('role');
    const [authorBooks, setAuthorBooks] = useState<GetBooksResponse>();
    const [rating, setRating] = useState({
        rating: 0,
        numberOfVoters: 0
    });
    const [comments, setComments] = useState<Comment[]>();
    const [user, setUser] = useState<GetUserResponse>({
        id: "",
        userName: "",
        firstName: "",
        lastName: "",
        isLocked: false,
        lockoutEndAtUtc: new Date(),
        role: "",
        avatarUrl: ""
    });
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
    const [newComment, setNewComment] = useState<CreateCommentRequest>({
        bookId: id!,
        text: ""
    });
    const [addRatingOpen, setAddRatingOpen] = useState<boolean>(false);

    const [isCurrent, setIsCurrent] = useState<boolean>(false);
    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    const [isReaded, setIsReaded] = useState<boolean>(false);
    const [isScheduled, setIsScheduled] = useState<boolean>(false);
   

    const [open, setOpen] = useState(false);
    const anchorRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        getBook(id!)
            .then(x => {
                if (x == undefined) navigate('/catalog/1')
                setBook(x!)
                setRating({rating: x!.rating, numberOfVoters: x!.numberOfVoters})
                setComments(x!.comments)
            })

        if(userId !== null){
            getUser(userId!)
            .then(x => setUser(x!))

            isCurrentBook(id!)
            .then(x => setIsCurrent(x!.isUserBook))

            isFavoriteBook(id!)
            .then(x => setIsFavorite(x!.isUserBook))
            
            isReadedBook(id!)
            .then(x => setIsReaded(x!.isUserBook))

            isScheduledBook(id!)
            .then(x => setIsScheduled(x!.isUserBook))
        }
    }, [])

    useEffect(() => {
        getAuthorBooks(book.authorId)
        .then(x => setAuthorBooks(x!))
    }, [book])

    const currentBookHander = (value: boolean) => {
        value ? addToCurrentBooks({bookId: id!}) : removeFromCurrentBooks(id!)
        setIsCurrent(value)
    }

    const favoriteBookHandler = (value: boolean) => {
        value ? addToFavoriteBooks({bookId: id!}) : removeFromFavoriteBooks(id!)
        setIsFavorite(value)
    }

    const readedBookHandler = (value: boolean) => {
        value ? addToReadedBooks({bookId: id!}) : removeFromReadedBooks(id!)
        setIsReaded(value)
    }

    const scheduledBookHandler = (value: boolean) => {
        value ? addToScheduledBooks({bookId: id!}) : removeFromScheduledBooks(id!)
        setIsScheduled(value)
    }

    const addRatingHandler = () => {
        setAddRatingOpen(!addRatingOpen)
    }

    const newCommnentHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewComment(prev => ({...prev, text: event.target.value}))
    }

    const removeBookHandler = () => {
        deleteBook(id!)
        .then(x => navigate('/'))
    }

    const addCommentHandler = () => {
        createComment(id!, newComment)
        .then(x => {
            setComments(x!.comments)
            setNewComment({
                bookId: id!,
                text: ""
            })
        })

    }
    
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };
    
    const handleClose = (event: Event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
            return;
        }
    
        setOpen(false);
    };

    return (
        <>
        {addRatingOpen && <AddRating bookId={id!} onClose={addRatingHandler} setRatingNumber={setRating}/>}
        <div style={{display: 'flex', width: '72vw', alignItems: 'start', flexDirection: "column", margin: '20px auto', flexWrap: 'wrap'}}>
            <div style={{display: 'flex', width: '72vw', alignItems: 'start', flexDirection: "row", margin: '20px auto', flexWrap: 'wrap'}}>
                <Card sx={{ width: '23vw', m:2, boxShadow: 'none' }}>
                    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'end'}}>
                        <CardMedia
                        component="img"
                        image={book.coverImageUrl}
                        alt="Paella dish"
                        />
                        <Fab color="primary" component="label" size='small' sx={{mr: 1, mt: -6, background: 'white'}} onClick={() => favoriteBookHandler(!isFavorite)}>
                            {isFavorite ? <FavoriteIcon sx={{color: 'red'}} /> : <FavoriteIcon sx={{color: 'gray'}} />}
                        </Fab>
                    </Box>
                    { (userId !== undefined) &&
                        <Box sx={{display: 'flex', flexDirection: 'column', mt: 1}}>
                            <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', m: 1, ml: 0, justifyContent: 'space-between'}}>
                                {
                                    role && <Button variant="contained" onClick={addRatingHandler} sx={{mr: 1, background: '#fe4e1c', '&:hover': { background: '#db4216' }}} size='small'>Оценить</Button>
                                }
                                <Link to={`/books/${id}/reader`}>
                                    <Button variant="contained" size='small' sx={{mr:1}}>Читать</Button>
                                </Link>
                                {
                                    role && <Box>
                                        <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button">
                                            <Button onClick={handleToggle} size='small'>Добавить</Button>
                                            <Button
                                            size="small"
                                            aria-controls={open ? 'split-button-menu' : undefined}
                                            aria-expanded={open ? 'true' : undefined}
                                            aria-label="select merge strategy"
                                            aria-haspopup="menu"
                                            onClick={handleToggle}
                                            >
                                            <ArrowDropDownIcon />
                                            </Button>
                                        </ButtonGroup>
                                        <Popper
                                            sx={{
                                            zIndex: 1,
                                            }}
                                            open={open}
                                            anchorEl={anchorRef.current}
                                            role={undefined}
                                            transition
                                            disablePortal
                                        >
                                            {({ TransitionProps, placement }) => (
                                            <Grow
                                                {...TransitionProps}
                                                style={{
                                                transformOrigin:
                                                    placement === 'bottom' ? 'center top' : 'center bottom',
                                                }}
                                            >
                                                <Paper>
                                                <ClickAwayListener onClickAway={handleClose}>
                                                    <MenuList id="split-button-menu" autoFocusItem>
                                                        <MenuItem>
                                                            <Checkbox checked={isCurrent} onChange={(event) => currentBookHander(event.target.checked)}/>
                                                            <ListItemText primary="Текущие" />
                                                        </MenuItem>
                                                        <MenuItem>
                                                            <Checkbox checked={isReaded} onChange={(event) => readedBookHandler(event.target.checked)}/>
                                                            <ListItemText primary="Прочитанные" />
                                                        </MenuItem>
                                                        <MenuItem>
                                                            <Checkbox checked={isScheduled} onChange={(event) => scheduledBookHandler(event.target.checked)}/>
                                                            <ListItemText primary="Сохраненные" />
                                                        </MenuItem>
                                                    </MenuList>
                                                </ClickAwayListener>
                                                </Paper>
                                            </Grow>
                                            )}
                                        </Popper>
                                    </Box>
                                }
                            </Box>
                            <Box sx={{display: 'flex', flexDirection: 'row', mt: 2}}>
                                {book.categories.map((x, index) => {
                                    return <Typography sx={{color: 'gray', textTransform: 'lowercase', fontSize: '14px'}}>
                                                {x.name}
                                                {
                                                    (index + 1) !== book.categories.length ? "," : ''
                                                }
                                                &nbsp;
                                            </Typography>
                                })}
                            </Box>
                        </Box>
                    }
                </Card>
                <Card sx={{ width: '44vw', m:2, height: 'inherit', boxShadow: 'none'}}>
                    <CardActions disableSpacing>
                        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'start'}}>
                            <Box sx={{display: 'flex', flexDirection: 'column', mb: 1}}>
                                <Typography variant="h4" color="text.secondary">
                                    <b>{book?.title}</b>
                                </Typography>
                                <Typography color="text.secondary" sx={{fontSize: '14px', m: 1}}>
                                    Автор: {book?.authorName}<br/>
                                    Год: {book?.year}<br/>
                                    Издание: {book?.edition}
                                </Typography>
                            </Box>
                            <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'start'}}>
                                <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                    <Rating name="read-only" value={rating.rating} readOnly precision={0.1} sx={{mr:1}} />
                                    <Typography color="text.secondary" sx={{mr:1}}>
                                    <b>{rating.rating.toFixed(1)}</b>
                                    </Typography>
                                </Box>
                                <Typography color="text.secondary">
                                    ({rating.numberOfVoters})
                                </Typography>
                            </Box>
                            <Box sx={{mt: 2}}>
                                <Typography sx={{ml:1, mb:1}} variant="h6" color="text.secondary">
                                    <b>Описание:</b>
                                </Typography>
                                <Typography sx={{ml:3, mb: 3, width: '40vw'}} variant="body1" color="text.secondary">
                                    {book?.description}
                                </Typography>
                            </Box>
                        </Box>
                    </CardActions>
                </Card>
                <Box sx={{display: 'flex', flexDirection: 'row', mt: 3}}>
                    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'end', justifyContent: 'start'}}>
                        { 
                            role && <>
                                <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                    <Avatar src={user.avatarUrl} sx={{mr:1}} />
                                    <TextField
                                        id="filled-multiline-flexible"
                                        label="Комментарий"
                                        sx={{width: '600px'}}
                                        multiline
                                        maxRows={4}
                                        value={newComment.text}
                                        onChange={newCommnentHandler}
                                        variant="filled"
                                        size='small'
                                    />
                                </Box>
                                <Box sx={{mt:1, mb:2}}>
                                    <Button onClick={addCommentHandler}  variant='outlined' endIcon={<SendIcon />}>
                                        Отправить
                                    </Button>
                                </Box>
                            </>
                        }
                        <CommentBar catalog={comments}/>
                    </Box>
                    <Box sx={{width: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', mt: '-16px'}}>
                        {authorBooks?.books.map((item, index) => <BookItem key={index} item={item} />)}
                    </Box>
                </Box>
                
                
            </div>
        </div> 
        </>
    )
}

export default Book