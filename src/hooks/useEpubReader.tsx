import { useRef, useEffect, useState } from "react"
import Epub, { Book, EpubCFI, NavItem, Rendition } from "epubjs"
import useSearchDrawer from "./useSearchDrawer"
import useBookContent, { MatchSearches } from "./useBookContent"
import { IReaderProps } from "../components/reader/Reader"
import useBookmarks, { addBookmarkFn, Bookmarks, removeBookmarkFn } from "./useBookmark"
import useBookmarkDrawer from "./useBookmarkDrawer"
import useSnackbar from "./useSnackbar"
import useNotes, { Notes, addNoteFn, removeNoteFn } from "./useNote"
import useNoteDrawer from "./useNoteDrawer"
import { Note } from "../types"

export type BookContents = Array<{
  href: string,
  text: string[]
}>

export type EpubReaderState = {
  bookId: string,
  ebookUrl: string,
  fontSize: string,
  book: Book,
  catalogue: NavItem[] | null,
  rendition: React.MutableRefObject<Rendition | null>,
  contentViewRef: React.RefObject<HTMLDivElement>,
  isCatalogue: boolean,
  percentage: number,
  atStart: boolean,
  atEnd: boolean,
  currentChapter: string,
  isSearchDrawer: boolean,
  bookContents: BookContents,
  bookmarks: Bookmarks,
  notes: Note[],
  currentCfi: string,
  isNoteDrawer: boolean,
  isBookmarkDrawer: boolean,
  isSnackbar: boolean,
  snackbarMessage: string,
  isPanelBar: boolean,
  setIsPanelBar: (flag: boolean) => void,
  setEbookUrl: (url: string) => void,
  setFontSize: (value: string) => void,
  toggleSearchDrawer: () => void,
  toggleCatalogue: () => void,
  setCurretChapter: (href: string) => void,
  searchBookContents: (searchString: string) => MatchSearches,
  addBookmark: addBookmarkFn,
  removeBookmark: removeBookmarkFn,
  addNote: addNoteFn,
  removeNote: removeNoteFn,
  toggleBookmarkDrawer: () => void,
  toggleNoteDrawer: () => void,
  showToast: (message: string) => void
} | null

export interface ILocationChangeProps {
  end: string, href: string, index: number, percentage: number, start: string
}

function useEpubReader({ bookId, url, epubOptions }: IReaderProps): EpubReaderState {
  if (!url) return null

  const [ebookUrl, setEbookUrl] = useState(url)
  const { isSearchDrawer, toggleSearchDrawer } = useSearchDrawer()
  const { isBookmarkDrawer, toggleBookmarkDrawer } = useBookmarkDrawer()
  const { isNoteDrawer, toggleNoteDrawer } = useNoteDrawer()
  const contentViewRef = useRef<HTMLDivElement>(null)
  const [catalogue, setCatalogue] = useState<NavItem[] | null>(null)
  const [isCatalogue, setIsCatalogue] = useState(false);
  const [isPanelBar, setIsPanelBar] = useState(true)
  const rendition = useRef<Rendition | null>(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)
  const [percentage, setPercentage] = useState(0)
  const [currentChapter, setCurretChapter] = useState('')
  const [currentCfi, setCurrentCfi] = useState('')
  const { isSnackbar, snackbarMessage, showToast } = useSnackbar()
  const [fontSize, setFontSize] = useState('100%')

  const toggleCatalogue = () => {
    setIsCatalogue(!isCatalogue)
  }

  const book = Epub(ebookUrl, epubOptions);

  const { bookContents, searchBookContents } = useBookContent(book)
  const { bookmarks, addBookmark, removeBookmark } = useBookmarks()
  const { notes, addNote, removeNote } = useNotes(bookId);

  const init = async () => {
    const { toc } = await book.loaded.navigation
    const node = contentViewRef.current as HTMLDivElement
    const width = window.getComputedStyle(node).getPropertyValue('width')
    const epubRendition = book.renderTo(node, { width, height: '100%' });
    const firstChapter = toc[0]
    const currentCfi = epubRendition.location?.start.cfi

    setCurretChapter(firstChapter.href)
    setCurrentCfi(currentCfi)
    setCatalogue(toc)
    rendition.current = epubRendition

    epubRendition.themes.fontSize(fontSize);
    epubRendition.display(currentCfi);

    epubRendition.on('locationChanged', ({ percentage, href }: ILocationChangeProps) => {
      setCurretChapter(href)
      setPercentage(percentage)
      setCurrentCfi(epubRendition.location.start.cfi)
      setAtStart(epubRendition.location.atStart)
      setAtEnd(epubRendition.location.atEnd)
    })
  }

  useEffect(() => {
    init()

    return () => {
      book.destroy()
    }
  }, [ebookUrl]);

  return {
    bookId,
    ebookUrl,
    fontSize,
    book,
    catalogue,
    isCatalogue,
    rendition,
    contentViewRef,
    percentage,
    atStart,
    atEnd,
    currentChapter,
    isSearchDrawer,
    bookContents,
    bookmarks,
    notes,
    currentCfi,
    isBookmarkDrawer,
    isNoteDrawer,
    isSnackbar,
    snackbarMessage,
    isPanelBar,
    setIsPanelBar,
    setEbookUrl,
    setFontSize,
    toggleSearchDrawer,
    toggleCatalogue,
    setCurretChapter,
    searchBookContents,
    addBookmark,
    removeBookmark,
    toggleBookmarkDrawer,
    addNote,
    removeNote,
    toggleNoteDrawer,
    showToast
  }
}

export default useEpubReader