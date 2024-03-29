import { useState, useEffect, KeyboardEvent } from "react";
import { useParams, Navigate } from "react-router-dom";

import { db } from "DB/FirebaseDB";
import { getDoc, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

import Loading from "Components/Loading";
import { Typography, Box, Input } from "@mui/material";
import Comment from "Components/Comment";

interface Post {
  title: string;
  body: string;
  image: string;
  date: {
    seconds: number;
    nanoseconds: number;
  };
}

interface CommentProps {
  date: string;
  text: string;
}

const PostPage = () => {
  const [post, setPost] = useState<Post>();
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState<CommentProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  let { id } = useParams();
  id = id?.split(":")[1];
  const docRef = doc(db, "posts", `${id}`);
  const storage = getStorage();

  const sendComment = async (event: KeyboardEvent<HTMLInputElement>) => {
    try {
      if (event.key === "Enter" && commentInput.length > 0) {
        const documentReference = doc(db, "posts", `${id}`);
        updateDoc(documentReference, {
          comments: arrayUnion({
            text: commentInput,
            date: new Date().toDateString(),
          }),
        });
        setComments(prevState => [{ text: commentInput, date: "Now" }, ...prevState]);
        setCommentInput("");
      }
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      getDoc(docRef)
        .then(doc => {
          const output = doc.data();
          const ElementId = doc.id;

          if (output) {
            getDownloadURL(ref(storage, ElementId))
              .then(result => {
                return result;
              })
              .then(image => {
                const { title, date, body, comments } = output;

                setPost({
                  title,
                  date,
                  body,
                  image,
                });

                setComments(comments);
              });
          } else {
            setError("Could not find the resources");
          }
        })
        .catch(err => {
          setError(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }

    return () => {
      mounted = false;
    };
  }, [id]);

  if (post) {
    return (
      <Box
        sx={{
          maxWidth: 800,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          padding: "2rem",
          paddingBottom: "4rem",
        }}
      >
        <img style={{ height: "400px", objectFit: "cover" }} src={post.image} />
        <Typography variant="h3">{post.title}</Typography>
        <Typography variant="h6">{post.date}</Typography>
        <Typography variant="h6">{post.body}</Typography>
        <Input
          multiline
          value={commentInput}
          onKeyDown={sendComment}
          placeholder="Leave Your Comment Here..."
          onChange={event => setCommentInput(event.target.value)}
        />
        <Box
          sx={{
            height: "auto",
            maxHeight: "300px",
            overflowY: "scroll",
            display: "flex",
            flexDirection: "column",
            gap: "5px",
          }}
        >
          {comments?.length > 0 &&
            comments.map(element => {
              return (
                <Comment
                  key={element.text + element.date}
                  text={element.text}
                  date={element.date}
                />
              );
            })}
        </Box>
      </Box>
    );
  } else if (error) {
    return (
      <div
        style={{
          height: "90vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h5">{error}</Typography>
      </div>
    );
  } else {
    return <Loading />;
  }
};

export default PostPage;
