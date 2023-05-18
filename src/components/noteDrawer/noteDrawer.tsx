import React, { useContext, useState } from 'react';
import { Drawer, List, ListItem, ListItemText, Divider, ListSubheader, ListItemButton } from "@mui/material"
import { readerContext } from "../reader/Reader"

function NoteDrawer() {
  const context = useContext(readerContext)
  if (!context) return null

  const { rendition, notes } = context

  const { isNoteDrawer, toggleNoteDrawer } = context

  const [ prevRange, setPrevRange ] = useState<string | null>(null)

  const goToNote = (cfiRange: string) => {
    if (prevRange !== null)
      rendition.current?.annotations.remove(prevRange, "highlight");

    rendition.current?.display(cfiRange);
    rendition.current?.annotations.add("highlight", cfiRange);
    setPrevRange(cfiRange)
  }

  return (
    <React.Fragment>
      <Drawer
        anchor='right'
        open={isNoteDrawer}
        onClose={toggleNoteDrawer}
      >
        <List sx={{ width: '300px', maxWidth: 360, bgcolor: 'background.paper' }} subheader={<ListSubheader>Notes</ListSubheader>}>
          {
            notes?.map((note, index) => (
              <ListItemButton key={index} onClick={() => goToNote(note.cfiRange)}>
                <ListItem alignItems="flex-start">
                  <ListItemText/>
                  {index+1 + ". " + note.text}
                </ListItem>
                <Divider component="li" />
              </ListItemButton>
            ))
          }
        </List>
      </Drawer>
    </React.Fragment >
  )
}

export default NoteDrawer
