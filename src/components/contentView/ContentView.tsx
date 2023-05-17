import './index.less'
import { useEffect, useContext, useState } from 'react';
import { readerContext } from "../reader/Reader"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box, Menu, MenuItem } from '@mui/material';
import { Contents, Rendition } from 'epubjs';

var cfiRangeProp = ""

function ContentView() {
  
  const context = useContext(readerContext)
  if (!context) return null

  const { rendition, atStart, atEnd, isPanelBar, addNote } = context

  const goPrevPage = async () => {
    rendition.current && await rendition.current.prev()
  }

  const goNextPage = async () => {
    rendition.current && await rendition.current.next()
  }

  const handleKeyPress = ({ key }: KeyboardEvent) => {
    key && key === 'ArrowRight' && goNextPage()
    key && key === 'ArrowLeft' && goPrevPage()
  }

  const offListenKeyup = () => {
    document.removeEventListener('keyup', handleKeyPress, false)
  }

  useEffect(() => {
    offListenKeyup()
    rendition.current?.on('keyup', handleKeyPress)
    document.addEventListener('keyup', handleKeyPress, false)

    return offListenKeyup
  }, [rendition.current])

  const [contextMenu, setContextMenu] = useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);

  const handleContextMenu = (event: MouseEvent) => {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6,
          }
        : // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
          // Other native context menus might behave different.
          // With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
          null,
    );
  };

  const handleClose = () => {
    setContextMenu(null);
  };

  const handleSave = () => {
    rendition.current?.book.getRange(cfiRangeProp)
      .then(x => addNote(cfiRangeProp, x.toString()))
    handleClose()
  }

  rendition.current?.on("rendered", (rendition: Rendition, iframe: Window) => {
    iframe.document.documentElement.addEventListener('contextmenu', handleContextMenu);
  });

  rendition.current?.on("selected", (cfiRange: string, contents: Contents) => {
    cfiRangeProp = cfiRange;
  });

  return (
    <Box className={isPanelBar ? "content-view content-view--withbar" : "content-view content-view--fullscreen"} >
      <Box className="content-view__pagination" onClick={goPrevPage}>
        <ArrowBackIosIcon color={atStart ? 'disabled' : undefined}></ArrowBackIosIcon>
      </Box>
      <Box className="content-view__book" ref={context.contentViewRef}>
      <Menu
        open={contextMenu !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
      >
        <MenuItem onClick={handleSave}>Сохранить заметку</MenuItem>
      </Menu>
      </Box>
      
      <Box className="content-view__pagination" onClick={goNextPage}>
        <ArrowForwardIosIcon color={atEnd ? 'disabled' : undefined} ></ArrowForwardIosIcon>
      </Box>
    </Box >
  )
}

export default ContentView
