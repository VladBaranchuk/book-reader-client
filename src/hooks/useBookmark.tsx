import { useState } from "react";
import { getCurLocaleTime } from "../utils";

export type BookmarkItem = {
  name: string,
  cfi: string,
  time: string
}

export type Bookmarks = Array<BookmarkItem>

export interface addBookmarkFn {
  (bookmark: Omit<BookmarkItem, 'time'>): void
}

export interface removeBookmarkFn {
  (cfi: string): void
}

export default function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<Bookmarks>(localStorage.getItem('bookmarks') != null ? JSON.parse(localStorage.getItem('bookmarks')!) as BookmarkItem[] : [])

  const addBookmark: addBookmarkFn = (bookmark) => {
    const bookmarkWithTime = {
      ...bookmark,
      time: getCurLocaleTime()
    }

    setBookmarks([
      ...bookmarks,
      bookmarkWithTime,
    ])
    
    localStorage.setItem('bookmarks', JSON.stringify([
      ...bookmarks,
      bookmarkWithTime
    ]))
  }

  const removeBookmark = (cfi: string) => {
    const bookmarksFilter = bookmarks.filter(bookmark => bookmark.cfi !== cfi)
    setBookmarks(bookmarksFilter)
  }

  return {
    bookmarks,
    addBookmark,
    removeBookmark
  }
}