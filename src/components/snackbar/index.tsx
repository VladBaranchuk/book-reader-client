import { useContext } from 'react';
import { readerContext } from '../reader/Reader';
import { Slide, SlideProps, Snackbar, SnackbarOrigin } from '@mui/material';

function GlobalSnackbar() {
  const context = useContext(readerContext)
  if (!context) return null

  const { isSnackbar, snackbarMessage } = context

  const transition = (props: SlideProps) => {
    return <Slide {...props} direction="up" />;
  }

  const anchorOriginOptions: SnackbarOrigin = { vertical: 'bottom', horizontal: 'center' }

  return (
    <Snackbar
      TransitionComponent={transition}
      anchorOrigin={anchorOriginOptions}
      open={isSnackbar}
      message={snackbarMessage}
    />
  )
}

export default GlobalSnackbar