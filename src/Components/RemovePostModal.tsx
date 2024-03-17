import { FC } from "react";
 
import { Dialog, Typography, Button, Box } from "@mui/material";

import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
 
import { deleteDoc, doc } from "firebase/firestore";

import { db } from "DB/FirebaseDB";
 
interface RemovePostModalProps {

  onClose: () => void;

  open: boolean;

  id: string;

}
 
const RemovePostModal: FC<RemovePostModalProps> = props => {

  function removePostHandler() {

    const documentReference = doc(db, "posts", `${props.id}`);

    deleteDoc(documentReference).then(() => {

      props.onClose();

    });

  }
 
  return (

    <Dialog open={props.open} onClose={props.onClose}>

      <Box

        sx={{

          height: "50vh",

          maxWidth: "500px",

          textAlign: "center",

          display: "flex",

          flexDirection: "column",

          justifyContent: "center",

          gap: "10px",

          padding: "1rem",

        }}

      >

        <ErrorOutlineIcon

          style={{ alignSelf: "center", color: "#ff3333", fontSize: "4.2rem" }}

        />

        <Typography variant="h5">

          Are your sure that you want to remove this post ?

        </Typography>

        <Button variant="contained" onClick={removePostHandler}>

          Delete

        </Button>

        <Button onClick={() => props.onClose()}>Cancel</Button>

      </Box>

    </Dialog>

  );

};
 
export default RemovePostModal;
