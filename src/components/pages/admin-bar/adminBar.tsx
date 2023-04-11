import { Box, Button, Card, CardMedia, TextField, Typography, ButtonPropsColorOverrides, Tabs, Tab, Autocomplete } from '@mui/material';
import React, { FC, SyntheticEvent, useEffect, useState } from 'react'
import { OverridableStringUnion } from '@mui/types';
import ImageUploading, { ImageListType, ImageType } from "react-images-uploading";
import { Author, Category, CreateAuthorRequest, CreateBookRequest, CreateCategoryRequest, User } from '../../../types';
import { createAuthor, createBook, createCategory, getAuthors, getCategories, getUsers, searchUsers } from '../../../http-requests';
import DataGrid from '../../dataGrid/datagrid';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }
  
  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
}

function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}

const AdminBar: FC = () => {

    const [value, setValue] = useState(0);
    const [image, setImage] = useState<ImageType[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [authors, setAuthors] = useState<Author[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [search, setSearch] = useState<string>("");
    const [inputChange, setInputChange] = useState<OverridableStringUnion<"inherit" | "primary" | "secondary" | "error" | "info" | "success" | "warning", ButtonPropsColorOverrides>>('info')
    const [uploadChange, setUploadChange] = useState<OverridableStringUnion<"inherit" | "primary" | "secondary" | "error" | "info" | "success" | "warning", ButtonPropsColorOverrides>>('info')
    const [newAuthorChange, setNewAuthorChange] = useState<OverridableStringUnion<"inherit" | "primary" | "secondary" | "error" | "info" | "success" | "warning", ButtonPropsColorOverrides>>('info')
    const [newCategoryChange, setNewCategoryChange] = useState<OverridableStringUnion<"inherit" | "primary" | "secondary" | "error" | "info" | "success" | "warning", ButtonPropsColorOverrides>>('info')
    const [uploadBook, setUploadBook] = useState<CreateBookRequest>({
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
    const [newAuthor, setNewAuthor] = useState<CreateAuthorRequest>({
        firstName: "",
        lastName: ""
    });
    const [newCategory, setNewCategory] = useState<CreateCategoryRequest>({
        name: ""
    });

    useEffect(() => {
        getUsers(1, 50)
            .then(x => setUsers(x!.users))
        
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

    const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUploadBook(prev => ({...prev, title: event.target.value}))
    }

    const handleDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUploadBook(prev => ({...prev, description: event.target.value}))
    }

    const handleEdition = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUploadBook(prev => ({...prev, edition: event.target.valueAsNumber}))
    }

    const handleYear = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUploadBook(prev => ({...prev, year: event.target.valueAsNumber}))
    }

    const handleTotalPages = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUploadBook(prev => ({...prev, totalPages: event.target.valueAsNumber}))
    }

    const handleAuthor = (event: SyntheticEvent<Element, Event>, value: { id: string; label: string; } | null) => {
        value === null ? setUploadBook(prev => ({...prev, authorId: ""})) : setUploadBook(prev => ({...prev, authorId: value.id}))
    }

    const handleCategories = (event: SyntheticEvent<Element, Event>, value: { id: string; label: string; }[] | null) => {
        value === null ? setUploadBook(prev => ({...prev, categories: []})) : setUploadBook(prev => ({...prev, categories: value.map(item => item.id)}))
    }

    const uploadImageHandler = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
        setImage(imageList as ImageType[]);
        setUploadBook(prev => ({...prev, coverImage: imageList[0].file as Blob}))
    };

    const uploadFileHandler = (event: React.FormEvent<HTMLInputElement>) => {
        setUploadBook(prev => ({...prev, bookFile: event.currentTarget.files?.item(0)!}))
        setInputChange('success')
    }

    const uploadBookHandler = () => {
        createBook(uploadBook)
        .then(x => setUploadChange('success'))
    }

    const handleFirstName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewAuthor(prev => ({...prev, firstName: event.target.value}))
    }

    const handleLastName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewAuthor(prev => ({...prev, lastName: event.target.value}))
    }

    const createAuthorHandler = () => {
        createAuthor(newAuthor)
        .then(x => {
            setNewAuthorChange('success')

            getAuthors()
            .then(x => setAuthors(x!.authors))
        })
    }

    const handleCategoryName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewCategory(prev => ({...prev, name: event.target.value}))
    }

    const createCategoryHandler = () => {
        createCategory(newCategory)
        .then(x => {
            setNewCategoryChange('success')

            getCategories()
            .then(x => setCategories(x!.categories))
        })
    }

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        var query = event.target.value.length === 0 ? "" : event.target.value;
        setSearch(query);
        setUsers([])
        searchUsers(query)
        .then(x => setUsers(x!.users));
    }

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <div>
            <Box sx={{display: 'flex', flexDirection: 'column', pt:1}}>
                
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Добавить новую книгу" {...a11yProps(0)} />
                    <Tab label="Добавить нового автора" {...a11yProps(1)} />
                    <Tab label="Добавить новую категорию" {...a11yProps(2)} />
                    <Tab label="Пользователи" {...a11yProps(3)} />
                </Tabs>
                <TabPanel value={value} index={0}>
                    <Box sx={{width: '100%', height: '740px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <Box sx={{display: 'flex', flexDirection: 'row'}}>
                            <Box sx={{display: 'flex', flexDirection: 'column',  width: '400px'}}>
                                <TextField 
                                    InputLabelProps={{ shrink: true }} 
                                    value={uploadBook.title}
                                    onChange={handleTitle}
                                    label="Наименование" 
                                    variant="outlined" 
                                    size="small" />
                                <Box sx={{display: 'flex', flexDirection: 'row',  width: '400px'}}>
                                    <TextField 
                                        InputLabelProps={{ shrink: true }} 
                                        sx={{mr: 1.5, mt: 1.5, width: '25%'}} 
                                        value={uploadBook.edition}
                                        onChange={handleEdition}
                                        inputProps={{ type: 'number', min: 0, max: 100}}
                                        label="Издание" 
                                        variant="outlined" 
                                        size="small" />
                                    <TextField 
                                        InputLabelProps={{ shrink: true }} 
                                        sx={{mr: 1.5, mt: 1.5, width: '25%'}} 
                                        value={uploadBook.year}
                                        onChange={handleYear}
                                        inputProps={{ type: 'number', min: 1500, max: 2023}}
                                        label="Год" 
                                        variant="outlined" 
                                        size="small" />
                                    <TextField 
                                        InputLabelProps={{ shrink: true }} 
                                        sx={{mt: 1.5, width: '50%'}} 
                                        value={uploadBook.totalPages}
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
                                    value={uploadBook.description}
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
                                <Button sx={{mt: 1.5, width: '255px'}} color={inputChange} variant="outlined" component="label">
                                    Загрузить файл : {uploadBook.bookFile.arrayBuffer.name}
                                    <input hidden type="file" accept="application/epub" onChange={uploadFileHandler} />
                                </Button>
                            </Box>
                        </Box>
                        <Box sx={{mt: 3}}>
                            <Button variant="contained" color={uploadChange} onClick={uploadBookHandler} component="label">
                                Добавить книгу
                            </Button>               
                        </Box>
                    </Box>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Box sx={{width: '100%', height: '740px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <Box sx={{display: 'flex', flexDirection: 'row'}}>
                            <Box sx={{display: 'flex', flexDirection: 'column',  width: '400px'}}>
                                <TextField 
                                    InputLabelProps={{ shrink: true }} 
                                    value={newAuthor.firstName}
                                    onChange={handleFirstName}
                                    label="Имя" 
                                    variant="outlined" 
                                    size="small" />
                                <TextField 
                                    sx={{mt:1.5}}
                                    InputLabelProps={{ shrink: true }} 
                                    value={newAuthor.lastName}
                                    onChange={handleLastName}
                                    label="Фамилия" 
                                    variant="outlined" 
                                    size="small" />
                            </Box> 
                        </Box>
                        <Box sx={{mt: 3}}>
                            <Button variant="contained" color={newAuthorChange} onClick={createAuthorHandler} component="label">
                                Добавить автора
                            </Button>               
                        </Box>
                    </Box>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <Box sx={{width: '100%', height: '740px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <Box sx={{display: 'flex', flexDirection: 'row'}}>
                            <Box sx={{display: 'flex', flexDirection: 'column',  width: '400px'}}>
                                <TextField 
                                    InputLabelProps={{ shrink: true }} 
                                    value={newCategory.name}
                                    onChange={handleCategoryName}
                                    label="Название" 
                                    variant="outlined" 
                                    size="small" />
                            </Box> 
                        </Box>
                        <Box sx={{mt: 3}}>
                            <Button variant="contained" color={newCategoryChange} onClick={createCategoryHandler} component="label">
                                Добавить автора
                            </Button>               
                        </Box>
                    </Box>
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <Box sx={{display: 'flex', flexDirection: 'row', width: '30vw', alignItems: 'center', justifyContent: 'center', margin: '30px auto'}}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            sx={{m:0}}
                            size='small'
                            value={search}
                            onChange={handleSearch}/>
                    </Box>
                    <Box sx={{width: '100%', height: '740px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <DataGrid data={users}/>
                    </Box>
                </TabPanel>
            </Box>
        </div>  
    )
}

export default AdminBar