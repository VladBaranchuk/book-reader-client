import AdminBar from "../pages/admin-bar/adminBar";
import Book from "../pages/book/book";
import BookCatalog from "../pages/catalog/catalog";
import CurrentBooks from "../pages/current-books/current-books";
import FavoriteBooks from "../pages/favorite-books/favorite-books";
import Home from "../pages/home/home";
import Profile from "../pages/profile/profile";
import ReadedBooks from "../pages/readed-books/readed-books";
import ReaderPage from "../pages/reader/reader";
import ScheduledBooks from "../pages/scheduled-books/scheduled-books";
import SignIn from "../pages/signin/signin";
import SignUp from "../pages/signup/signup";

export const routes = [
    {
        path: '/',
        element: Home
    },
    {
        path: '/signin',
        element: SignIn
    },
    {
        path: '/signup',
        element: SignUp
    },
    {
        path: '/catalog/:id',
        element: BookCatalog
    },
    {
        path: '/books/:id',
        element: Book
    },
    {
        path: '/books/:id/reader',
        element: ReaderPage
    },
    {
        path: '/favorite-books/:id',
        element: FavoriteBooks
    },
    {
        path: '/current-books/:id',
        element: CurrentBooks
    },
    {
        path: '/readed-books/:id',
        element: ReadedBooks
    },
    {
        path: '/scheduled-books/:id',
        element: ScheduledBooks
    },
    {
        path: '/profile',
        element: Profile
    },
    {
        path: '/admin-bar',
        element: AdminBar
    }
]