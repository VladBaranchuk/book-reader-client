import { useEffect, useState } from "react";
import { createNote, deleteNote, getNotes } from "../http-requests";
import { Note } from "../types";

export type Notes = Array<Note>

export interface addNoteFn {
  (cfiRange: string, text: string): void
}

export interface removeNoteFn {
  (id: string): void
}

export default function useNotes(bookId: string) {
  const [notes, setNotes] = useState<Notes>([])

  useEffect(() => {  
    getNotes(bookId)
    .then(x => setNotes(x?.notes!))
}, []) 

  const addNote: addNoteFn = (cfiRange, text) => {
    createNote({
      bookId: bookId,
      cfiRange: cfiRange,
      text: text
    })
    .then(x => setNotes([...notes, {id: x?.id!, cfiRange: x?.cfiRange!, text: x?.text!, createdAtUtc: x?.createdAtUtc!}]));
  }

  const removeNote = (id: string) => {
    const noteFilter = notes.filter(note => note.id !== id);
    deleteNote(id)
    .then(x => setNotes(noteFilter))
  }

  return {
    notes,
    addNote,
    removeNote
  }
}