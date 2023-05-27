import { Box, Button, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import React, { FC, useState } from "react";

interface INotify {
    onClose: (value: boolean) => void
    onDelete: () => void
    message: string
}

const Notify: FC<INotify> = ({onClose, onDelete, message}) => {
  
  return (
    <React.Fragment>
        <div style={{
            position: 'fixed',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: '5rem',
            zIndex: 1
        }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'end',
                flexDirection: 'column',
                alignItems: 'center',
                width: '300px',
                background: 'white',
                borderRadius: '8px'
            }}>
                <Box sx={{width: '100%', display: 'flex', justifyContent: 'end'}}>
                    <Button sx={{ color: 'gray', minWidth: '32px'}} onClick={() => onClose(false)}><CloseIcon/></Button>
                </Box>
                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', m:1}}>
                        Вы действительно хотите удалить? {message}
                    <Button color="error" onClick={onDelete}>
                        Удалить
                    </Button>
                </Box>
            </Box>
        </div>
    </React.Fragment>
  );
}

export default Notify;
