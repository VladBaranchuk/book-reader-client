// Auth controller
export type AuthenticateRequest = {
    email: string,
    password: string
}

export type AuthenticateResponse = {
    accessToken: string,
    refreshToken: string,
    tokenType: string,
    issuedAtUtc: Date,
    jwtTokenExpiresAtUtc: Date,
    refreshTokenExpiresAtUtc: Date
}

export type RefreshRequest = {
    refreshToken: string
}


// Author controller
export type CreateAuthorRequest = {
    firstName: string,
    lastName: string
}

export type CreateAuthorRespose = {
    id: string,
    firstName: string,
    lastName: string
}

export type GetAuthorResponse = {
    id: string,
    firstName: string,
    lastName: string
}

export type GetAuthorsResponse = {
    authors: Author[]
}

export type GetAuthorBooksResponse = {
    books: Book[]
}

export type UpdateAuthorRequest = {
    id: string,
    firstName: string,
    lastName: string
}

export type UpdateAuthorRepsonse = {
    id: string,
    firstName: string,
    lastName: string
}

export type DeleteAuthorResponse = {
    id: string,
    firstName: string,
    lastName: string
}


// Book controller
export type AddRatingRequest = {
    value: number
}

export type AddRatingResponse = {
    id: string,
    title: string,
    description: string,
    edition?: string,
    year: number,
    totalPages: number,
    isPublic: boolean,
    coverImageUrl: string,
    authorName: string,
    rating: number,
    numberOfVoters: number,
    fileId: string,
    authorId: string
    categories: Category[]
    comments: Comment[]
}

export type RemoveRatingResponse = {
    id: string,
    title: string,
    description: string,
    edition?: string,
    year: number,
    totalPages: number,
    isPublic: boolean,
    coverImageUrl: string,
    authorName: string,
    rating: number,
    numberOfVoters: number,
    fileId: string,
    authorId: string
    categories: Category[]
    comments: Comment[]
}

export type CreateBookRequest = {
    title: string,
    description: string,
    edition?: number,
    year: number,
    totalPages: number,
    authorId: string,
    categories: string[],
    coverImage: Blob,
    bookFile: Blob
}

export type CreateBookResponse = {
    id: string,
    title: string,
    description: string,
    edition?: string,
    year: number,
    totalPages: number,
    isPublic: boolean,
    coverImageUrl: string,
    authorName: string,
    rating: number,
    numberOfVoters: number,
    fileId: string,
    authorId: string
}

export type GetBooksResponse = {
    books: Book[]
}

export type GetBookResponse = {
    id: string,
    title: string,
    description: string,
    edition?: string,
    year: number,
    totalPages: number,
    isPublic: boolean,
    coverImageUrl: string,
    authorName: string,
    rating: number,
    numberOfVoters: number,
    fileId: string,
    authorId: string
    categories: Category[]
    comments: Comment[]
}

export type UpdateBookRequest = {
    title: string,
    description: string,
    edition?: string,
    ageRestriction?: number,
    authorId: number,
    image: Blob,
    fileInPdf: Blob
}

export type UpdateBookResponse = {
    id: string,
    title: string,
    description: string,
    edition?: string,
    year: number,
    totalPages: number,
    isPublic: boolean,
    coverImageUrl: string,
    authorName: string,
    rating: number,
    numberOfVoters: number,
    fileId: string,
    authorId: string
}

export type AddToCurrentBooksRequest = {
    bookId: string
}

export type AddToCurrentBooksResponse = {
    id: string,
    title: string,
    description: string,
    edition?: string,
    year: number,
    totalPages: number,
    isPublic: boolean,
    coverImageUrl: string,
    authorName: string,
    rating: number,
    numberOfVoters: number,
    fileId: string,
    authorId: string
}

export type AddToFavoriteBooksRequest = {
    bookId: string
}

export type AddToFavoriteBooksResponse = {
    id: string,
    title: string,
    description: string,
    edition?: string,
    year: number,
    totalPages: number,
    isPublic: boolean,
    coverImageUrl: string,
    authorName: string,
    rating: number,
    numberOfVoters: number,
    fileId: string,
    authorId: string
}

export type AddToReadedBooksRequest = {
    bookId: string
}

export type AddToReadedBooksResponse = {
    id: string,
    title: string,
    description: string,
    edition?: string,
    year: number,
    totalPages: number,
    isPublic: boolean,
    coverImageUrl: string,
    authorName: string,
    rating: number,
    numberOfVoters: number,
    fileId: string,
    authorId: string
}

export type AddToScheduledBooksRequest = {
    bookId: string
}

export type AddToScheduledBooksResponse = {
    id: string,
    title: string,
    description: string,
    edition?: string,
    year: number,
    totalPages: number,
    isPublic: boolean,
    coverImageUrl: string,
    authorName: string,
    rating: number,
    numberOfVoters: number,
    fileId: string,
    authorId: string
}

export type PublishResponse = {
    id: string,
    title: string,
    description: string,
    edition?: string,
    year: number,
    totalPages: number,
    isPublic: boolean,
    coverImageUrl: string,
    authorName: string,
    rating: number,
    numberOfVoters: number,
    fileId: string,
    authorId: string
}

export type RecallResponse = {
    id: string,
    title: string,
    description: string,
    edition?: string,
    year: number,
    totalPages: number,
    isPublic: boolean,
    coverImageUrl: string,
    authorName: string,
    rating: number,
    numberOfVoters: number,
    fileId: string,
    authorId: string
}

export type RemoveFromFavoriteBooksResponse = {
    id: string,
    title: string,
    description: string,
    edition?: string,
    year: number,
    totalPages: number,
    isPublic: boolean,
    coverImageUrl: string,
    authorName: string,
    rating: number,
    numberOfVoters: number,
    fileId: string,
    authorId: string
}

export type RemoveFromReadedBooksResponse = {
    id: string,
    title: string,
    description: string,
    edition?: string,
    year: number,
    totalPages: number,
    isPublic: boolean,
    coverImageUrl: string,
    authorName: string,
    rating: number,
    numberOfVoters: number,
    fileId: string,
    authorId: string
}

export type RemoveFromCurrentBooksResponse = {
    id: string,
    title: string,
    description: string,
    edition?: string,
    year: number,
    totalPages: number,
    isPublic: boolean,
    coverImageUrl: string,
    authorName: string,
    rating: number,
    numberOfVoters: number,
    fileId: string,
    authorId: string
}

export type RemoveFromScheduledBooksResponse = {
    id: string,
    title: string,
    description: string,
    edition?: string,
    year: number,
    totalPages: number,
    isPublic: boolean,
    coverImageUrl: string,
    authorName: string,
    rating: number,
    numberOfVoters: number,
    fileId: string,
    authorId: string
}

export type SearchBooksRequest = {
    searchString?: string,
    minRatingValue?: number,
    maxRatingValue?: number,
    isPopular?: boolean,
    isNewer?: boolean,
    isBetter?: boolean,
    estimateDate?: number,
    categories?: string[],
    authorId?: string
}

export type GetNotesResponse = {
    notes: Note[]
}

export type CreateCommentRequest = {
    bookId: string,
    text: string
}

export type CreateCommentResponse = {
    id: string,
    title: string,
    description: string,
    edition?: string,
    year: number,
    totalPages: number,
    isPublic: boolean,
    coverImageUrl: string,
    authorName: string,
    rating: number,
    numberOfVoters: number,
    fileId: string,
    authorId: string
    categories: Category[]
    comments: Comment[]
}

export type UserBookResponse = {
    id: string,
    isUserBook: boolean
}


// Category controller
export type CreateCategoryRequest = {
    name: string
}

export type CreateCategoryResponse = {
    id: string,
    name: string
}

export type GetCategoriesResponse = {
    categories: Category[]
}

export type GetCategoryResponse = {
    id: string,
    name: string
}

export type UpdateCategoryRequest = {
    id: string,
    name: string
}

export type UpdateCategoryResponse = {
    id: string,
    name: string
}

export type DeleteCategoryResponse = {
    id: string,
    name: string
}


// Note controller
export type CreateNoteRequest = {
    bookId: string,
    cfiRange: string,
    text: string
}

export type CreateNoteResponse = {
    id: string,
    cfiRange: string,
    text: string
    createdAtUtc: Date
}

export type DeleteNoteResponse = {
    id: string,
    cfiRange: string,
    text: string
    createdAtUtc: Date
}


// User controller
export type GetUserResponse = {
    id: string,
    userName: string,
    firstName: string,
    lastName: string,
    isLocked: boolean,
    lockoutEndAtUtc?: Date,
    role: string,
    avatarUrl?: string
}

export type CreateUserRequest = {
    userName: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string
}

export type GetUsersResponse = {
    users: User[]
}

export type UpdateUserRequest = {
    id: string,
    userName: string,
    firstName: string,
    lastName: string
}


// Others
export type Book = {
    id: string,
    title: string,
    description: string,
    edition?: string,
    year: number,
    totalPages: number,
    isPublic: boolean,
    coverImageUrl: string,
    authorName: string,
    rating: number,
    numberOfVoters: number,
    fileId: string,
    authorId: string
}

export type User = {
    id: string,
    userName: string,
    firstName: string,
    lastName: string,
    isLocked: boolean
    lockoutEndAtUtc?: Date,
    role: string,
    avatarUrl?: string
}

export type ErrorMessage = {
    ErrorMessage?: string,
    ValidationErrors?: ValidationError[]
}

export type ValidationError = {
    propertyName: string,
    errorMessage: string
}

export type Category = {
    id: string,
    name: string
}

export type Comment = {
    id: string,
    text: string,
    createdAtUtc: Date,
    userName: string,
    avatarUrl?: string
}

export type Note = {
    id: string,
    cfiRange: string,
    text: string
    createdAtUtc: Date
}

export type FileInfo = {
    publicId: string,
    tempUrl: string,
    urlExpiresAtUtc: Date
}

export type Author = {
    id: string,
    firstName: string,
    lastName: string
}

export type Empty = {
    
}
