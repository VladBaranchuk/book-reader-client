import { 
    AddRatingRequest,
    AddRatingResponse,
    AddToCurrentBooksRequest,
    AddToCurrentBooksResponse,
    AddToFavoriteBooksRequest,
    AddToFavoriteBooksResponse,
    AddToReadedBooksRequest,
    AddToReadedBooksResponse,
    AddToScheduledBooksRequest,
    AddToScheduledBooksResponse,
    AuthenticateRequest, 
    AuthenticateResponse, 
    CreateAuthorRequest, 
    CreateAuthorRespose, 
    CreateBookRequest, 
    CreateBookResponse, 
    CreateCategoryRequest, 
    CreateCategoryResponse, 
    CreateCommentRequest, 
    CreateCommentResponse, 
    CreateNoteRequest, 
    CreateNoteResponse, 
    CreateUserRequest, 
    DeleteAuthorResponse, 
    DeleteBookResponse, 
    DeleteCategoryResponse, 
    DeleteNoteResponse, 
    Empty, 
    ErrorMessage, 
    FileInfo, 
    GetAuthorBooksResponse, 
    GetAuthorResponse, 
    GetAuthorsResponse, 
    GetBookResponse, 
    GetBooksResponse, 
    GetCategoriesResponse, 
    GetCategoryResponse, 
    GetNotesResponse, 
    GetUserResponse, 
    GetUsersResponse, 
    PublishResponse, 
    RecallResponse, 
    RefreshRequest, 
    RemoveFromCurrentBooksResponse, 
    RemoveFromFavoriteBooksResponse, 
    RemoveFromReadedBooksResponse, 
    RemoveFromScheduledBooksResponse, 
    RemoveRatingResponse,
    SearchBooksRequest,
    UpdateAuthorRepsonse,
    UpdateAuthorRequest,
    UpdateBookRequest,
    UpdateBookResponse,
    UpdateCategoryRequest,
    UpdateCategoryResponse,
    UpdateUserRequest,
    UserBookResponse
} from "./types";

const host = "http://localhost:8080";

// Auth controller
export const authenticate = (body: AuthenticateRequest) => 
    request<AuthenticateResponse>(`${host}/api/auth`, header("POST", JSON.stringify(body), false, true));

export const refresh = (body: RefreshRequest) => 
    request<AuthenticateResponse>(`${host}/api/auth/refresh`, header("POST", JSON.stringify(body), false, true));


// Author controller
export const createAuthor = (body: CreateAuthorRequest) => 
    request<CreateAuthorRespose>(`${host}/api/authors`, header("POST", JSON.stringify(body), true, true));

export const getAuthor = (authorId: string) => 
    request<GetAuthorResponse>(`${host}/api/authors/${authorId}`, header("GET"));

export const getAuthors = () => 
    request<GetAuthorsResponse>(`${host}/api/authors`, header("GET"));

export const getAuthorBooks = (authorId: string) => 
    request<GetAuthorBooksResponse>(`${host}/api/authors/${authorId}/books`, header("GET", undefined, true, false));

export const updateAuthor = (authorId: string, body: UpdateAuthorRequest) => 
    request<UpdateAuthorRepsonse>(`${host}/api/authors/${authorId}`, header("PUT", JSON.stringify(body), true, true));

export const searchAuthors = (query: string) => 
    request<GetAuthorsResponse>(`${host}/api/authors/search?query=${query}`, header("GET", undefined, true));

export const deleteAuthor = (authorId: string) => 
    request<DeleteAuthorResponse>(`${host}/api/authors/${authorId}`, header("DELETE", undefined, true));

    
// Book controller
export const addRating = (bookId: string, body: AddRatingRequest) =>
    request<AddRatingResponse>(`${host}/api/books/${bookId}/rating`, header("POST", JSON.stringify(body), true, true))

export const removeRating = (bookId: string) =>
    request<RemoveRatingResponse>(`${host}/api/books/${bookId}/rating`, header("DELETE", undefined, true, false))

export const createBook = (uploadBook: CreateBookRequest) => {

    const form = new FormData();

    form.append('title', uploadBook.title);
    form.append('description', uploadBook.description);
    form.append('edition', (uploadBook.edition !== undefined ? uploadBook.edition : 1).toString());
    form.append('year', (uploadBook.year !== undefined ? uploadBook.year : 0).toString());
    form.append('totalPages', (uploadBook.totalPages !== undefined ? uploadBook.totalPages : 0).toString());
    form.append('authorId', uploadBook.authorId);
    uploadBook.categories.map(category => {
        form.append('categories', category);
    });
    form.append('coverImage', uploadBook.coverImage!);
    form.append('bookFile', uploadBook.bookFile!);

    var response = request<CreateBookResponse>(`${host}/api/Books`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            ContentType: 'application/json; charset=utf8',
            Authorization: `Bearer ${sessionStorage.getItem('token')}`
        },
        body: form
    });

    return response;
}

export const getBooks = (page: number, size: number) => 
    request<GetBooksResponse>(`${host}/api/books?page=${page}&size=${size}`, header("GET", undefined, true, false));

export const getBook = (bookId: string) => 
    request<GetBookResponse>(`${host}/api/books/${bookId}`, header("GET", undefined, true, false));

export const getImageBlob = async (bookId: string) => {

    var response = request<GetBookResponse>(`${host}/api/books/${bookId}`, {
        method: "GET",
        headers: {
            Accept: 'application/json',
            ContentType: 'application/json; charset=utf8',
            Authorization: `Bearer ${sessionStorage.getItem('token')}`
        }
    });

    var result = await response;
    
    return await requestBlob(result!.coverImageUrl, {method: "GET"});
}

export const deleteBook = (bookId: string) => 
    request<DeleteBookResponse>(`${host}/api/books/${bookId}`, header("DELETE", undefined, true));

export const updateBook = (bookId: string, updateBook: UpdateBookRequest) => {

    const form = new FormData();

    form.append('id', updateBook.id);
    form.append('title', updateBook.title);
    form.append('description', updateBook.description);
    form.append('edition', (updateBook.edition !== undefined ? updateBook.edition : 1).toString());
    form.append('year', updateBook.year.toString());
    form.append('totalPages', updateBook.totalPages.toString());
    form.append('authorId', updateBook.authorId);
    updateBook.categories.map(category => {
        form.append('categories', category);
    });
    form.append('coverImage', updateBook.coverImage!);
    form.append('bookFile', updateBook.bookFile!);

    var response = request<UpdateBookResponse>(`${host}/api/books/${bookId}`, {
        method: "PUT",
        headers: {
            Accept: 'application/json',
            ContentType: 'application/json; charset=utf8',
            Authorization: `Bearer ${sessionStorage.getItem('token')}`
        },
        body: form
    });

    return response;
}

export const getCurrentBooks = (page: number, size: number) => 
    request<GetBooksResponse>(`${host}/api/books/current?page=${page}&size=${size}`, header("GET", undefined, true, false));

export const addToCurrentBooks = (body: AddToCurrentBooksRequest) => 
    request<AddToCurrentBooksResponse>(`${host}/api/books/current`, header("POST", JSON.stringify(body), true, true));

export const getFavoriteBooks = (page: number, size: number) => 
    request<GetBooksResponse>(`${host}/api/books/favorite?page=${page}&size=${size}`, header("GET", undefined, true, false));

export const addToFavoriteBooks = (body: AddToFavoriteBooksRequest) => 
    request<AddToFavoriteBooksResponse>(`${host}/api/books/favorite`, header("POST", JSON.stringify(body), true, true));

export const getReadedBooks = (page: number, size: number) => 
    request<GetBooksResponse>(`${host}/api/books/readed?page=${page}&size=${size}`, header("GET", undefined, true, false));

export const addToReadedBooks = (body: AddToReadedBooksRequest) => 
    request<AddToReadedBooksResponse>(`${host}/api/books/readed`, header("POST", JSON.stringify(body), true, true));

export const getScheduledBooks = (page: number, size: number) => 
    request<GetBooksResponse>(`${host}/api/books/scheduled?page=${page}&size=${size}`, header("GET", undefined, true, false));

export const addToScheduledBooks = (body: AddToScheduledBooksRequest) => 
    request<AddToScheduledBooksResponse>(`${host}/api/books/scheduled`, header("POST", JSON.stringify(body), true, true));

export const publish = (bookId: string) => 
    request<PublishResponse>(`${host}/api/books/${bookId}/publish`, header("PUT", undefined, true, false));

export const recall = (bookId: string) => 
    request<RecallResponse>(`${host}/api/books/${bookId}/recall`, header("PUT", undefined, true, false));

export const removeFromFavoriteBooks = (bookId: string) => 
    request<RemoveFromFavoriteBooksResponse>(`${host}/api/books/favorite/${bookId}`, header("DELETE", undefined, true, false));

export const removeFromReadedBooks = (bookId: string) => 
    request<RemoveFromReadedBooksResponse>(`${host}/api/books/readed/${bookId}`, header("DELETE", undefined, true, false));

export const removeFromCurrentBooks = (bookId: string) => 
    request<RemoveFromCurrentBooksResponse>(`${host}/api/books/current/${bookId}`, header("DELETE", undefined, true, false));

export const removeFromScheduledBooks = (bookId: string) => 
    request<RemoveFromScheduledBooksResponse>(`${host}/api/books/scheduled/${bookId}`, header("DELETE", undefined, true, false));

export const searchBooks = (page: number, size: number, body: SearchBooksRequest) => 
    request<GetBooksResponse>(`${host}/api/books/search?page=${page}&size=${size}`, header("PUT", JSON.stringify(body) , true, true));

export const getNotes = (bookId: string) => 
    request<GetNotesResponse>(`${host}/api/books/${bookId}/notes`, header("GET", undefined, true));

export const createComment = (bookId: string, body: CreateCommentRequest) => 
    request<CreateCommentResponse>(`${host}/api/books/${bookId}/comments`, header("POST", JSON.stringify(body) , true, true));

export const deleteComment = (bookId: string, commentId: string) => 
    request<CreateCommentResponse>(`${host}/api/books/${bookId}/comments/${commentId}`, header("DELETE", undefined , true, false));

export const getFile = (bookId: string) =>
    request<FileInfo>(`${host}/api/books/${bookId}/file`, header("GET", undefined, true, false));

export const getFileBlob = async (bookId: string) => {

    var response = request<FileInfo>(`${host}/api/books/${bookId}/file`, {
        method: "GET",
        headers: {
            Accept: 'application/json',
            ContentType: 'application/json; charset=utf8',
            Authorization: `Bearer ${sessionStorage.getItem('token')}`
        }
    });

    var result = await response;

    return await requestBlob(result!.tempUrl, {method: "GET"});
}

export const isCurrentBook = (bookId: string) =>
    request<UserBookResponse>(`${host}/api/books/current/${bookId}/is-current`, header("GET", undefined, true, false));

export const isFavoriteBook = (bookId: string) =>
    request<UserBookResponse>(`${host}/api/books/favorite/${bookId}/is-favorite`, header("GET", undefined, true, false));

export const isReadedBook = (bookId: string) =>
    request<UserBookResponse>(`${host}/api/books/readed/${bookId}/is-readed`, header("GET", undefined, true, false));

export const isScheduledBook = (bookId: string) =>
    request<UserBookResponse>(`${host}/api/books/scheduled/${bookId}/is-scheduled`, header("GET", undefined, true, false));


// Category controller
export const createCategory = (body: CreateCategoryRequest) => 
    request<CreateCategoryResponse>(`${host}/api/categories`, header("POST", JSON.stringify(body), true, true));

export const getCategories = () => 
    request<GetCategoriesResponse>(`${host}/api/categories`, header("GET"));

export const getCategory = (categoryId: string) => 
    request<GetCategoryResponse>(`${host}/api/categories/${categoryId}`, header("GET"));

export const updateCategory = (categoryId: string, body: UpdateCategoryRequest) => 
    request<UpdateCategoryResponse>(`${host}/api/categories/${categoryId}`, header("PUT", JSON.stringify(body), true, true));

export const searchCategories = (query: string) => 
    request<GetCategoriesResponse>(`${host}/api/categories/search?query=${query}`, header("GET", undefined, true));

export const deleteCategory = (categoryId: string) => 
    request<DeleteCategoryResponse>(`${host}/api/categories/${categoryId}`, header("DELETE", undefined, true));



// Note controller
export const createNote = (body: CreateNoteRequest) => 
    request<CreateNoteResponse>(`${host}/api/notes`, header("POST", JSON.stringify(body), true, true));

export const deleteNote = (noteId: string) => 
    request<DeleteNoteResponse>(`${host}/api/notes/${noteId}`, header("DELETE", undefined, true, false));


// User controller
export const addAvatar = (userId: string, file: File) => {
    const form = new FormData();

    form.append('avatar', file);

    var response = request<GetUserResponse>(`${host}/api/users/${userId}/avatar`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            ContentType: 'application/json; charset=utf8',
            Authorization: `Bearer ${sessionStorage.getItem('token')}`
        },
        body: form
    });

    return response;
}

export const createUser = (body: CreateUserRequest) => 
    request<GetUserResponse>(`${host}/api/users`, header("POST", JSON.stringify(body), false, true));

export const getUsers = (page: number, size: number) => 
    request<GetUsersResponse>(`${host}/api/users?page=${page}&size=${size}`, header("GET", undefined, true));

export const getCurrentUser = () => 
    request<GetUserResponse>(`${host}/api/users/current`, header("GET", undefined, true));

export const getCurrentUserWithToken = (token: string) => 
    request<GetUserResponse>(`${host}/api/users/current`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }});

export const getUser = (userId: string) => 
    request<GetUserResponse>(`${host}/api/users/${userId}`, header("GET", undefined, true));

export const updateUser = (userId: string, body: UpdateUserRequest) => 
    request<GetUserResponse>(`${host}/api/users/${userId}`, header("PUT", JSON.stringify(body), true, true));

export const searchUsers = (query: string) => 
    request<GetUsersResponse>(`${host}/api/users/search?query=${query}`, header("GET", undefined, true));

export const lockout = (userId: string) => 
    request<GetUserResponse>(`${host}/api/users/${userId}/lockout`, header("POST", undefined, true));

export const unlocked = (userId: string) => 
    request<GetUserResponse>(`${host}/api/users/${userId}/unlocked`, header("POST", undefined, true));

const header = (method: string, requestBody: string = "", isAuth: boolean = false, isBody: boolean = false): RequestInit => {
    
    if(isAuth && isBody){
        return {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            },
            body: requestBody
        }
    }
    
    if(isAuth){
        return {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        }
    }

    if(isBody){
        return {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: requestBody
        }
    }

    return {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        }
    }
    
}

const request = async <TResponse>(url: string, config: RequestInit): Promise<TResponse | undefined> => {
    const response = await fetch(url, config);
    const result = await response.json()
    
    if(response.status >= 400) {
        let error = result as ErrorMessage
        alert(error.ErrorMessage)
        return undefined
    }

    return result as TResponse; 
}

const requestBlob = async (url: string, config: RequestInit = {}): Promise<Blob> => {
    const response = await fetch(url, config);
    return await response.blob();
}



