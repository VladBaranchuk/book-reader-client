import './index.less'
import { useEffect, useContext } from 'react';
import { readerContext } from "../reader/Reader"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box } from '@mui/material';

function ContentView() {
  const context = useContext(readerContext)
  if (!context) return null

  const { rendition, atStart, atEnd, isPanelBar } = context

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

  return (
    <Box className={isPanelBar ? "content-view content-view--withbar" : "content-view content-view--fullscreen"}>
      <Box className="content-view__pagination" onClick={goPrevPage}>
        <ArrowBackIosIcon color={atStart ? 'disabled' : undefined}></ArrowBackIosIcon>
      </Box>
      <Box className="content-view__book" ref={context.contentViewRef}></Box>
      <Box className="content-view__pagination" onClick={goNextPage}>
        <ArrowForwardIosIcon color={atEnd ? 'disabled' : undefined} ></ArrowForwardIosIcon>
      </Box>
    </Box >
  )
}

export default ContentView
