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
