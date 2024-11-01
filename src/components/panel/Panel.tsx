import "./index.less"
import { useContext, useRef } from "react";
import { Toolbar, AppBar, Box, Typography, Slide, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import DoubleArrowRoundedIcon from '@mui/icons-material/DoubleArrowRounded';
import { readerContext } from "../reader/Reader"
import SearchDrawer from "../searchDrawer/index"
import BookmarkDrawer from "../bookmarkDrawer";
import FormatSizeOutlinedIcon from '@mui/icons-material/FormatSizeOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { MyContext } from "../layout/layout";
import { useNavigate, useParams } from "react-router-dom";
import NotesIcon from '@mui/icons-material/Notes';
import NoteDrawer from "../noteDrawer/noteDrawer";

function Panel() {

  const role = sessionStorage.getItem('role');

  const context = useContext(readerContext)
  if (!context) return null

  const { isBookmarkDrawer: isSearchDrawer, toggleSearchDrawer, toggleCatalogue, rendition,
    isPanelBar, setIsPanelBar, addBookmark,
    removeBookmark, currentCfi,
    bookmarks, toggleBookmarkDrawer,
    showToast, setEbookUrl, toggleNoteDrawer, fontSize, setFontSize } = context

  const appbarRef = useRef<HTMLDivElement>(null);
  var contextt = useContext(MyContext);

  const isBookmarkAdded = bookmarks.find(bookmark => bookmark.cfi === currentCfi);

  const {id} = useParams();
  const navigate = useNavigate();
  
  const closeButton = () => {
    contextt.setTrue()
    navigate(`/books/${id}`)
  }

  const resize = (isFullHeight: boolean) => {
    const originWidth = rendition.current?.settings.width!
    const appbarH = 48;

    const height = isFullHeight ? window.innerHeight : window.innerHeight - appbarH

    if (typeof originWidth === 'number') {
      rendition.current?.resize(originWidth, height)
    } else {
      const nOriginWidth = originWidth.match(/\d+/)
      if (nOriginWidth) {
        rendition.current?.resize(Number(nOriginWidth[0]), height)
      }
    }
  }

  const hidePanelBar = () => {
    setIsPanelBar(false)
    resize(true)
  }

  const ShowPanelBar = () => {
    setIsPanelBar(true)
    resize(false)
  }

  const onAddBookmark = () => {
    addBookmark({
      name: 'bookmark',
      cfi: currentCfi
    })
    showToast('Add bookmark success')
  }

  const onRemoveBookmark = () => {
    removeBookmark(currentCfi)
    showToast('Remove bookmark success')
  }

  const toggleFontSize = () => {
    fontSize === '100%' ? setFontSize('140%') : setFontSize('100%')

    rendition.current?.themes.fontSize(fontSize)
  }

  return (
    <Box sx={{ flexGrow: 1}}>
      <SearchDrawer></SearchDrawer>
      <BookmarkDrawer></BookmarkDrawer>
      <NoteDrawer></NoteDrawer>

      <div className="right-fixed-box">
        <IconButton size="large" aria-label="hide" color="inherit" sx={{ transform: 'rotate(90deg)' }} onClick={ShowPanelBar}>
          <DoubleArrowRoundedIcon sx={{color: 'gray'}} />
        </IconButton>
      </div>
      <Slide direction="down" in={isPanelBar} mountOnEnter unmountOnExit>
        <AppBar ref={appbarRef} className="appbar" position="static" sx={{ position: 'relative', backgroundColor: '#fe4e1c', boxShadow: 'none' }}>
          <Toolbar variant="dense">
            <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={toggleCatalogue}>
              <MenuIcon />
            </IconButton>

            {isSearchDrawer}

            <Typography
              variant="h5"
              noWrap
              component="div"
              sx={{ flexGrow: 1, alignSelf: 'flex-end' }}
            >
            </Typography>


            { role && <IconButton size="large" color="inherit" onClick={toggleNoteDrawer}>
              <NotesIcon />
            </IconButton>}
            <IconButton size="large" aria-label="toggle-fontsize" color="inherit" onClick={toggleFontSize}>
              <FormatSizeOutlinedIcon />
            </IconButton>

            {isBookmarkAdded ?
              role && <IconButton size="large" aria-label="bookmark-added" color="inherit" onClick={onRemoveBookmark}>
                <BookmarkAddedIcon />
              </IconButton> :
              role && <IconButton size="large" aria-label="bookmark-add" color="inherit" onClick={onAddBookmark}>
                <BookmarkAddIcon />
              </IconButton>
            }
            { role && <IconButton size="large" aria-label="bookmark-list" color="inherit" onClick={toggleBookmarkDrawer}>
              <FormatListBulletedOutlinedIcon />
            </IconButton>}
            {/* <IconButton size="large" aria-label="search" color="inherit" onClick={toggleSearchDrawer}>
              <SearchIcon />
            </IconButton>  */}
            <IconButton size="large" aria-label="hide" color="inherit" sx={{ transform: 'rotate(-90deg)' }} onClick={hidePanelBar}>
              <DoubleArrowRoundedIcon/>
            </IconButton>
            <IconButton size="large" aria-label="fullscreen" color="inherit" onClick={closeButton}>
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Slide>

    </Box>
  )
}

export default Panel
