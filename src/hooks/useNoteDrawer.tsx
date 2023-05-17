import { useState } from 'react';

export default (isVisible: boolean = false) => {

  const [isNoteDrawer, setNoteDrawer] = useState(isVisible)
  const toggleNoteDrawer = () => {
    setNoteDrawer(!isNoteDrawer)
  }

  return {
    isNoteDrawer,
    setNoteDrawer,
    toggleNoteDrawer
  }
};