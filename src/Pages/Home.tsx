import { useEffect, useState } from "react";
import Post from "Components/Post";
import { Grid } from "@mui/material";
import { db } from "DB/FirebaseDB";
import { query, getDocs, collection, orderBy, documentId, doc } from "firebase/firestore";
import { ref, getStorage, getDownloadURL } from "firebase/storage";
import Loading from "Components/Loading";

interface Posts {
  title: string;
  body: string;
  date: {
    seconds: number;
    nanoseconds: number;
  };
  img: string;
  id: string;
}

const Home = () => {
  const [posts, setPosts] = useState<Posts[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const postsReference = collection(db, "posts");
  const storage = getStorage();

  useEffect(() => {
    let mounted = true;
    const Query = query(postsReference, orderBy("date", "desc"));
    if (mounted) {
      const fetchPosts = async () => {
        try {
          const response = await getDocs(Query);

          const data = response.docs.map(doc => {
            const obj = doc.data();
            const id = doc.id;
            const { title, body, date } = obj;

            return { title, body, date, id };
          });

          const promisesForImages = await Promise.all(
            data.map(element => {
              return getDownloadURL(ref(storage, element.id));
            })
          );

          const output = data.map((element, index) => {
            return { ...element, img: promisesForImages[index] };
          });

          setPosts(output);
        } catch (err) {
          console.log(err);
        }
      };

      fetchPosts();
    }

    return () => {
      mounted = false;
    };
  }, []);

  if (posts.length > 0) {
    return (
      <>
        <Grid
          sx={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "2rem",
            width: "100%",
          }}
          container
          spacing={2}
        >
          {posts.map(element => {
            return (
              <Grid item xs={12} sm={6} xl={3}>
                <Post
                  key={element.id}
                  id={element.id}
                  title={element.title}
                  body={element.body}
                  image={element.img}
                  date={element.date.toString()}
                />
              </Grid>
            );
          })}
        </Grid>
      </>
    );
  } else {
    return <Loading />;
  }
};

export default Home;
