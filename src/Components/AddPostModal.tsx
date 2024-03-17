import { Dialog, Box, TextField, Button, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useFormik } from "formik";
import { useRef, useState } from "react";
import * as YUP from "yup";
import { db } from "DB/FirebaseDB";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable } from "firebase/storage";
 
interface ModalProps {
  open: boolean;
  onClose: () => void;
}
 
const AddPostModal = (props: ModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const postsCollectionRef = collection(db, "posts");
  const inputRef = useRef<any>("");
  const location = useLocation();
  const storage = getStorage();
 
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
 
    validationSchema: YUP.object({
      title: YUP.string()
        .required("Title is required")
        .min(5, "Minimum 5 Characters")
        .max(100, "Maxiumum 100 characters"),
 
      description: YUP.string()
        .required("Description is required")
        .min(40, "Minimum 40 characters")
        .max(1000, "Maximum 1000 characters"),
    }),
 
    onSubmit: () => {
      setIsLoading(true);
      addDoc(postsCollectionRef, {
        title: formik.values.title,
        body: formik.values.description,
        date: new Date().toDateString(),
        comments: [],
      })
        .then(response => {
          const storageRef = ref(storage, response.id);
          uploadBytesResumable(storageRef, inputRef.current.files[0]);
          props.onClose();
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
  });
  return (
<Dialog onClose={props.onClose} open={props.open}>
<Box
        sx={{
          backgroundColor: "white",
          width: 500,
          height: "70vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "15px",
          padding: 10,
          overflowY: "scroll",
        }}
>
<Typography variant="h4">Add New Post</Typography>
<TextField
          value={formik.values.title}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          error={formik.touched.title && !!formik.errors.title}
          helperText={formik.errors.title}
          name="title"
          fullWidth
          label="Title"
        />
<TextField
          value={formik.values.description}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          name="description"
          error={formik.touched.description && !!formik.errors.description}
          helperText={formik.errors.description}
          multiline
          fullWidth
          label="Description"
        />
<label
          style={{
            backgroundColor: "#1976d2",
            color: "#fff",
            padding: "10px",
            cursor: "pointer",
            width: "100%",
            textAlign: "center",
          }}
          htmlFor="file"
>
          Add file
</label>
<input
          ref={inputRef}
          type="file"
          style={{ display: "none" }}
          name="file"
          id="file"
        />
 
        <Button
          disabled={isLoading}
          fullWidth
          style={{ backgroundColor: "maroon", color: "white" }}
          onClick={() => formik.handleSubmit()}
>
          {isLoading ? "Loading ..." : "Save"}
</Button>
<Button onClick={props.onClose} variant="contained" fullWidth>
          Close
</Button>
</Box>
</Dialog>
  );
};
 
export default AddPostModal;
