import { Box, Button, ButtonPropsColorOverrides, CircularProgress, Rating } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import React, { FC, useState } from "react";
import CheckIcon from '@mui/icons-material/Check';
import { addRating } from "../../../http-requests";
import { AddRatingRequest } from "../../../types";

interface IAddRating {
    bookId: string,
    onClose: React.MouseEventHandler<HTMLButtonElement>
}

enum Success{
    None,
    Load,
    Success
}

const AddRating: FC<IAddRating> = ({bookId, onClose}) => {
  
    const [success, setSuccess] = useState<Success>(Success.None)
    const [rating, setRating] = useState<AddRatingRequest>({
        value: 0
    });

    const addRatingHandler = (event: React.SyntheticEvent<Element, Event>, value: number | null) => {
        setRating({value: value!});
        setSuccess(Success.Load)
        addRating(bookId, {value: value!})
        .then(result => setSuccess(Success.Success))
    }

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
                width: '250px',
                background: 'white',
                borderRadius: '8px'
            }}>
                <Box sx={{width: '100%', display: 'flex', justifyContent: 'end'}}>
                    <Button sx={{ color: 'gray', minWidth: '32px'}}><CloseIcon/></Button>
                </Box>
                    <Rating
                        value={rating.value}
                        precision={1}
                        max={5}
                        name="unique-rating"
                        onChange={addRatingHandler}
                        sx={{height: '40px', display: 'flex', alignItems: 'center'}}
                    />
                {
                    success === Success.None ?
                        <Button sx={{m: 1}} onClick={onClose}>Ok</Button> :
                        success === Success.Load ?
                            <Box sx={{ display: 'flex' }}>
                                <CircularProgress />
                            </Box> :
                            success === Success.Success &&
                                <Button onClick={onClose} sx={{m: 1}}>
                                    <CheckIcon sx={{color: "green"}}/>
                                </Button>
                }
                
            </Box>
        </div>
    </React.Fragment>
  );
}

export default AddRating;
