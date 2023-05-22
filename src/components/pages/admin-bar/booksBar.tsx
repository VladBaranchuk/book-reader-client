import { Box, Button, Card, CardMedia, TextField, ButtonPropsColorOverrides, Autocomplete, Divider, CircularProgress } from '@mui/material';
import React, { FC, SyntheticEvent, useEffect, useState } from 'react'
import CheckIcon from '@mui/icons-material/Check';
import ImageUploading, { ImageListType, ImageType } from "react-images-uploading";
import { Author, Book, Category, CreateBookRequest, UpdateBookRequest } from '../../../types';
import { createBook, deleteBook, getAuthors, getBook, getBooks, getCategories, getFile, getFileBlob, getImageBlob, searchBooks, updateBook } from '../../../http-requests';
import BooksDataGrid from './booksDataGird/booksDataGrid';

enum ToDo{
    None,
    Add,
    Edit
}

enum Success{
    None,
    Load,
    Success
}

const BooksBar: FC = () => {

    const [defaultAuthor, setDefaultAuthor] = useState<{id: string, label: string} | undefined>({
        id: "",
        label: ""
    });
    const [defaultCategories, setDefaultCategories] = useState<Array<{id: string, label: string}> | undefined>([]);
    const [defaultImage, setDefaultImage] = useState<string>('');
    const [success, setSuccess] = useState<Success>(Success.None);
    const [image, setImage] = useState<ImageType[]>([]);
    const [editImage, setEditImage] = useState<ImageType[]>([]);
    const [search, setSearch] = useState<string>("");
    const [books, setBooks] = useState<Book[]>([]);
    const [authors, setAuthors] = useState<Author[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [todo, setTodo] = useState<ToDo>(ToDo.Add);
    const [newBook, setNewBook] = useState<CreateBookRequest>({
        title: "",
        description: "",
        edition: 0,
        year: 0,
        totalPages: 0,
        authorId: "",
        categories: [],
        coverImage: new Blob(),
        bookFile: new Blob()
    });
    const [editItem, setEditItem] = useState<UpdateBookRequest>({
        id: "",
        title: "",
        description: "",
        edition: 0,
        year: 0,
        totalPages: 0,
        authorId: "",
        categories: [],
        coverImage: new Blob(),
        bookFile: new Blob()
    });

    useEffect(() => {
        getBooks(1, 20)
            .then(x => setBooks(x!.books))

        getAuthors()
            .then(x => setAuthors(x!.authors))
        
        getCategories()
            .then(x => setCategories(x!.categories))
    }, []) 

    const authorProps = {
        options: authors.map(option => ({id: option.id, label: `${option.firstName} ${option.lastName}`})),
    };

    const categoryProps = {
        options: categories.map(option => ({id: option.id, label: option.name})),
    };

    const editHandler = (item: Book) => {
        getBook(item.id)
            .then(x => {
                setEditItem({
                    id: x!.id,
                    title: x!.title,
                    description: x!.description,
                    edition: Number(x!.edition),
                    year: x!.year,
                    totalPages: x!.totalPages,
                    authorId: x!.authorId,
                    categories: x!.categories.map(x => x.id),
                    coverImage: new Blob(),
                    bookFile: new Blob()
                })
                setDefaultAuthor(authorProps.options.find(author => author.id === x!.authorId))
                setDefaultCategories(categoryProps.options.filter(category => x!.categories.find(x => x.id === category.id)))
                setDefaultImage(x!.coverImageUrl)
                getImageBlob(x!.id)
                    .then(blob => {
                        setEditImage([{dataURL: x!.coverImageUrl}])
                        setEditItem(prev => ({...prev, coverImage: blob}))
                    })
                getFileBlob(x!.id)
                    .then(x => setEditItem(prev => ({...prev, bookFile: x})))
        });

        setTodo(ToDo.Edit);
    }

    const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewBook(prev => ({...prev, title: event.target.value}))
    }
    const handleEditTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditItem(prev => ({...prev, title: event.target.value}))
    }

    const handleDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewBook(prev => ({...prev, description: event.target.value}))
    }
    const handleEditDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditItem(prev => ({...prev, description: event.target.value}))
    }

    const handleEdition = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewBook(prev => ({...prev, edition: event.target.valueAsNumber}))
    }
    const handleEditEdition = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditItem(prev => ({...prev, edition: event.target.valueAsNumber}))
    }

    const handleYear = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewBook(prev => ({...prev, year: event.target.valueAsNumber}))
    }
    const handleEditYear = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditItem(prev => ({...prev, year: event.target.valueAsNumber}))
    }

    const handleTotalPages = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewBook(prev => ({...prev, totalPages: event.target.valueAsNumber}))
    }
    const handleEditTotalPages = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditItem(prev => ({...prev, totalPages: event.target.valueAsNumber}))
    }

    const handleAuthor = (event: SyntheticEvent<Element, Event>, value: { id: string; label: string; } | null) => {
        value === null ? setNewBook(prev => ({...prev, authorId: ""})) : setNewBook(prev => ({...prev, authorId: value.id}))
    }
    const handleEditAuthor = (event: SyntheticEvent<Element, Event>, value: { id: string; label: string; } | null) => {
        value === null ? setEditItem(prev => ({...prev, authorId: ""})) : setEditItem(prev => ({...prev, authorId: value.id}))
        setDefaultAuthor(authorProps.options.find(author => author.id === value?.id))
    }

    const handleCategories = (event: SyntheticEvent<Element, Event>, value: { id: string; label: string; }[] | null) => {
        value === null ? setNewBook(prev => ({...prev, categories: []})) : setNewBook(prev => ({...prev, categories: value.map(item => item.id)}))
    }
    const handleEditCategories = (event: SyntheticEvent<Element, Event>, value: { id: string; label: string; }[] | null) => {
        value === null ? setEditItem(prev => ({...prev, categories: []})) : setEditItem(prev => ({...prev, categories: value.map(item => item.id)}))
    }

    const uploadImageHandler = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
        setImage(imageList as ImageType[]);
        setNewBook(prev => ({...prev, coverImage: imageList[0]?.file as Blob}))
    };
    const uploadEditImageHandler = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
        setEditImage(imageList as ImageType[]);
        setEditItem(prev => ({...prev, coverImage: imageList[0]?.file as Blob}))
    };

    const uploadFileHandler = (event: React.FormEvent<HTMLInputElement>) => {
        setNewBook(prev => ({...prev, bookFile: event.currentTarget.files?.item(0)!}))
        //setInputChange('success')
    }
    const uploadEditFileHandler = (event: React.FormEvent<HTMLInputElement>) => {
        setEditItem(prev => ({...prev, bookFile: event.currentTarget.files?.item(0)!}))
        //setInputChange('success')
    }

    const removeHandler = (item: Book) => {
        removeBookHandler(item);
    }

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        var query = event.target.value.length === 0 ? "" : event.target.value;
        setSearch(query);
        setBooks([])
        searchBooks(1, 20, {searchString: query})
        .then(x => setBooks(x!.books));
    }

    const handleClearButton = () => {
        setTimeout(() => {
            setNewBook({
                title: "",
                description: "",
                edition: 0,
                year: 0,
                totalPages: 0,
                authorId: "",
                categories: [],
                coverImage: new Blob(),
                bookFile: new Blob()
            });
            setSuccess(Success.None);
        }, 1000);
    }

    const updateBookHandler = () => {
        updateBook(editItem.id, editItem)
        .then(item => {
            setSuccess(Success.Success);
            handleClearButton();

            const newBooks = books.filter(o => o.id !== item?.id);

            setBooks([]);
            setBooks([...newBooks, item as Book]);
        })
    }

    const createBookHandler = () => {
        createBook(newBook)
        .then(item => {
            setSuccess(Success.Success);
            handleClearButton();

            books.unshift(item as Book)

            setBooks([]);
            setBooks(books);
        })
    }

    const removeBookHandler = (item: Book) => {
        deleteBook(item.id)
            .then(item => {
                const newBooks = books.filter(x => x.id !== item?.id);

                setBooks([]);
                setBooks(newBooks);
            })
    }

    return (
        <Box sx={{width: '100%', height: '77vh', display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'start'}}>
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
                    <BooksDataGrid data={books} editHandler={editHandler} removeHandler={removeHandler}/>
                </Box>
                <Button variant="contained" onClick={() => setTodo(ToDo.Add)} component="label" color='success'>
                    Добавить книгу
                </Button>   
            </Box>
            <Divider orientation="vertical" />
            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                {
                    todo === ToDo.Add && 
                        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            <Box sx={{display: 'flex', flexDirection: 'row'}}>
                                <Box sx={{display: 'flex', flexDirection: 'column',  width: '400px'}}>
                                    <TextField 
                                        InputLabelProps={{ shrink: true }} 
                                        value={newBook.title}
                                        onChange={handleTitle}
                                        label="Наименование" 
                                        variant="outlined" 
                                        size="small" />
                                    <Box sx={{display: 'flex', flexDirection: 'row',  width: '400px'}}>
                                        <TextField 
                                            InputLabelProps={{ shrink: true }} 
                                            sx={{mr: 1.5, mt: 1.5, width: '25%'}} 
                                            value={newBook.edition}
                                            onChange={handleEdition}
                                            inputProps={{ type: 'number', min: 0, max: 100}}
                                            label="Издание" 
                                            variant="outlined" 
                                            size="small" />
                                        <TextField 
                                            InputLabelProps={{ shrink: true }} 
                                            sx={{mr: 1.5, mt: 1.5, width: '25%'}} 
                                            value={newBook.year}
                                            onChange={handleYear}
                                            inputProps={{ type: 'number', min: 1500, max: 2023}}
                                            label="Год" 
                                            variant="outlined" 
                                            size="small" />
                                        <TextField 
                                            InputLabelProps={{ shrink: true }} 
                                            sx={{mt: 1.5, width: '50%'}} 
                                            value={newBook.totalPages}
                                            onChange={handleTotalPages}
                                            inputProps={{ type: 'number', min: 0, max: 1500}}
                                            label="Количество страниц" 
                                            variant="outlined" 
                                            size="small" />
                                    </Box>
                                    <Autocomplete
                                        {...authorProps}
                                        disablePortal
                                        id="combo-box-demo"
                                        sx={{mt: 1.5}}
                                        onChange={handleAuthor}
                                        renderInput={(params) => <TextField {...params} label="Aвтор"/>}
                                        size="small"/>
                                    <Autocomplete
                                        {...categoryProps}
                                        disableClearable
                                        disablePortal
                                        multiple
                                        id="tags-standard"
                                        sx={{mt: 1.5}}
                                        
                                        onChange={handleCategories}
                                        getOptionLabel={(option) => option.label}
                                        isOptionEqualToValue={(option, value) => option.id === value.id}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                variant="outlined"
                                                label="Категории"
                                                size="small"
                                            />
                                            )}
                                        size="small"/>
                                    <TextField 
                                        InputLabelProps={{ shrink: true }} 
                                        sx={{mt: 1.5}} 
                                        value={newBook.description}
                                        onChange={handleDescription}
                                        label="Описание" 
                                        variant="outlined" 
                                        size="small"
                                        rows={10}
                                        multiline />
                                </Box>
                                <Box sx={{display: 'flex', flexDirection: 'column',  width: '240px', ml:5}}>
                                    <ImageUploading
                                        value={image}
                                        onChange={uploadImageHandler}
                                        maxNumber={1}
                                    >
                                        {({
                                        imageList,
                                        onImageUpload,
                                        onImageRemoveAll,
                                        dragProps
                                        }) => (
                                        <div>
                                            <Card sx={{width: '255px', height: '350px', boxShadow: 'none', border: '1px solid #c4c4c4'}}
                                                onClick={onImageUpload}
                                                {...dragProps}
                                            >
                                                {imageList.map((image, index) => (
                                                    <CardMedia sx={{width: '240px', margin: '0 auto'}} component='img' image={image.dataURL} />

                                                ))}
                                            </Card>
                                            <Button variant="outlined" color="error" sx={{mt: 1.5}} onClick={onImageRemoveAll}>
                                                Удалить
                                            </Button>
                                        </div>
                                        )}
                                    </ImageUploading>
                                    <Button sx={{mt: 1.5, width: '255px'}} variant="outlined" color="success" component="label">
                                        {newBook.bookFile.size !== 0 ? <CheckIcon sx={{color: "green"}}/> : "Загрузить файл"}
                                        <input hidden type="file" accept="application/epub+zip" onChange={uploadFileHandler} />
                                    </Button>
                                </Box>
                            </Box>
                            <Box sx={{mt: 3}}>
                            {
                                success === Success.None ?
                                <Button variant="contained" onClick={createBookHandler} component="label" color='success'>Добавить</Button> :
                                    success === Success.Load ?
                                        <Box sx={{ display: 'flex' }}>
                                            <CircularProgress />
                                        </Box> :
                                        success === Success.Success &&
                                            <Button component="label">
                                                <CheckIcon sx={{color: "green"}}/>
                                            </Button>
                            }       
                            </Box>
                        </Box>
                }
                {
                    todo === ToDo.Edit && 
                        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            <Box sx={{display: 'flex', flexDirection: 'row'}}>
                                <Box sx={{display: 'flex', flexDirection: 'column',  width: '400px'}}>
                                    <TextField 
                                        InputLabelProps={{ shrink: true }} 
                                        value={editItem.title}
                                        onChange={handleEditTitle}
                                        label="Наименование" 
                                        variant="outlined" 
                                        size="small" />
                                    <Box sx={{display: 'flex', flexDirection: 'row',  width: '400px'}}>
                                        <TextField 
                                            InputLabelProps={{ shrink: true }} 
                                            sx={{mr: 1.5, mt: 1.5, width: '25%'}} 
                                            value={editItem.edition}
                                            onChange={handleEditEdition}
                                            inputProps={{ type: 'number', min: 0, max: 100}}
                                            label="Издание" 
                                            variant="outlined" 
                                            size="small" />
                                        <TextField 
                                            InputLabelProps={{ shrink: true }} 
                                            sx={{mr: 1.5, mt: 1.5, width: '25%'}} 
                                            value={editItem.year}
                                            onChange={handleEditYear}
                                            inputProps={{ type: 'number', min: 1500, max: 2023}}
                                            label="Год" 
                                            variant="outlined" 
                                            size="small" />
                                        <TextField 
                                            InputLabelProps={{ shrink: true }} 
                                            sx={{mt: 1.5, width: '50%'}} 
                                            value={editItem.totalPages}
                                            onChange={handleEditTotalPages}
                                            inputProps={{ type: 'number', min: 0, max: 1500}}
                                            label="Количество страниц" 
                                            variant="outlined" 
                                            size="small" />
                                    </Box>
                                    <Autocomplete
                                        {...authorProps}
                                        disablePortal
                                        id="combo-box-demo"
                                        sx={{mt: 1.5}}
                                        value={defaultAuthor}
                                        onChange={handleEditAuthor}
                                        renderInput={(params) => <TextField {...params} label="Aвтор"/>}
                                        size="small"/>
                                    <Autocomplete
                                        {...categoryProps}
                                        disableClearable
                                        disablePortal
                                        multiple
                                        id="tags-standard"
                                        sx={{mt: 1.5}}
                                        value={defaultCategories}
                                        onChange={handleEditCategories}
                                        getOptionLabel={(option) => option.label}
                                        isOptionEqualToValue={(option, value) => option.id === value.id}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                variant="outlined"
                                                label="Категории"
                                                size="small"
                                            />
                                            )}
                                        size="small"/>
                                    <TextField 
                                        InputLabelProps={{ shrink: true }} 
                                        sx={{mt: 1.5}} 
                                        value={editItem.description}
                                        onChange={handleEditDescription}
                                        label="Описание" 
                                        variant="outlined" 
                                        size="small"
                                        rows={10}
                                        multiline />
                                </Box>
                                <Box sx={{display: 'flex', flexDirection: 'column',  width: '240px', ml:5}}>
                                    <ImageUploading
                                        value={editImage}
                                        onChange={uploadEditImageHandler}
                                        maxNumber={1}
                                    >
                                        {({
                                        imageList,
                                        onImageUpload,
                                        onImageRemoveAll,
                                        dragProps
                                        }) => (
                                        <div>
                                            <Card sx={{width: '255px', height: '350px', boxShadow: 'none', border: '1px solid #c4c4c4'}}
                                                onClick={onImageUpload}
                                                {...dragProps}
                                            >
                                                {
                                                    imageList.map((image, index) => (
                                                        <CardMedia sx={{width: '240px', margin: '0 auto'}} component='img' image={image.dataURL} />
                                                    ))
                                                }
                                            </Card>
                                            <Button variant="outlined" color="error" sx={{mt: 1.5}} onClick={onImageRemoveAll}>
                                                Удалить
                                            </Button>
                                        </div>
                                        )}
                                    </ImageUploading>
                                    <Button sx={{mt: 1.5, width: '255px'}} variant="outlined" color="success" component="label">
                                        {editItem.bookFile.size != 0 ? <CheckIcon sx={{color: "green"}}/> : "Загрузить файл"}
                                        <input hidden type="file" accept="application/epub+zip" onChange={uploadEditFileHandler} />
                                    </Button>
                                </Box>
                            </Box>
                            <Box sx={{mt: 3}}>
                            {
                                success === Success.None ?
                                <Button variant="contained" onClick={updateBookHandler} component="label" color='warning'>Обновить</Button> :
                                    success === Success.Load ?
                                        <Box sx={{ display: 'flex' }}>
                                            <CircularProgress />
                                        </Box> :
                                        success === Success.Success &&
                                            <Button component="label">
                                                <CheckIcon sx={{color: "green"}}/>
                                            </Button>
                            }        
                            </Box>
                        </Box>
                }
            </Box>
        </Box>   
    )
}

export default BooksBar
