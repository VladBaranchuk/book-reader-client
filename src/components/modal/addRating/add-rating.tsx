import { Box, Button, ButtonPropsColorOverrides, Rating } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import React, { FC, useState } from "react";
import { OverridableStringUnion } from '@mui/types';
import { addRating } from "../../../http-requests";
import { AddRatingRequest } from "../../../types";

interface IAddRating {
    bookId: string,
    onClose: React.MouseEventHandler<HTMLButtonElement>
}

const AddRating: FC<IAddRating> = ({bookId, onClose}) => {
  
    const [success, setSuccess] = useState<OverridableStringUnion<"inherit" | "primary" | "secondary" | "error" | "info" | "success" | "warning", ButtonPropsColorOverrides>>('info')
    const [rating, setRating] = useState<AddRatingRequest>({
        value: 0
    });

    const addRatingHandler = (event: React.SyntheticEvent<Element, Event>, value: number | null) => {
        setRating(prev => ({...prev, value: value!}))
        addRating(bookId, rating)
        .then(result => setSuccess('success'))
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
                height: '150px',
                background: 'white',
                borderRadius: '8px'
            }}>
                <Box sx={{width: '100%', display: 'flex', justifyContent: 'end'}}>
                    <Button sx={{mb:2, color: 'gray'}} onClick={onClose} endIcon={<CloseIcon/>}/>
                </Box>
                <Rating
                    value={rating.value}
                    precision={1}
                    max={5}
                    name="unique-rating"
                    onChange={addRatingHandler}
                />
                <Button sx={{mt: 3, mb:1}} color={success} onClick={onClose}>Ok</Button>
            </Box>
        </div>
    </React.Fragment>
  );
}

export default AddRating;
