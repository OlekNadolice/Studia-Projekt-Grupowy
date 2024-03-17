import React, { FC } from "react";

import { Box, Typography } from "@mui/material";
 
interface CommentProps {

  text: string;

  date: string;

}
 
const Comment: FC<CommentProps> = props => {

  return (

    <Box

      sx={{

        display: "flex",

        flexWrap: "wrap",

        wordBreak: "break-word",

        gap: "5px",

        justifyContent: "space-between",

        alignItems: "center",

        border: "1px solid #e8e8e8",

        padding: "1rem",

      }}

    >

      <Typography variant="body1">{props.text}</Typography>

      <Typography variant="body1">{props.date}</Typography>

    </Box>

  );

};
 
export default Comment;
