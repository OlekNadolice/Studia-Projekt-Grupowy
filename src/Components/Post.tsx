import { FC, useState, useContext } from "react";

import { Link } from "react-router-dom";

import { LoginContext } from "Context/Context";
 
import RemovePostModal from "Components/RemovePostModal";
 
import {

  Card,

  CardHeader,

  CardContent,

  CardMedia,

  CardActions,

  Typography,

} from "@mui/material";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
 
interface PostProps {

  title: string;

  image: string;

  body: string;

  date: string;

  id: string;

}
 
const Post: FC<PostProps> = props => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { isLoggedIn } = useContext(LoginContext);
 
  return (

    <>

      <Card elevation={3}>

        <div style={{ height: "200px" }}>

          <CardMedia component="img" image={props.image} />

        </div>

        <CardHeader title={props.title} subheader={props.date} />

        <CardContent>

          <Typography variant="body1">{props.body.slice(0, 25)}...</Typography>

        </CardContent>

        <CardActions style={{ display: "flex", justifyContent: "space-between" }}>

          <Link to={`/post:${props.id}`}>Read more.</Link>

          {isLoggedIn && (

            <DeleteOutlineIcon

              onClick={() => setIsModalOpen(true)}

              style={{ cursor: "pointer" }}

            />

          )}

        </CardActions>

      </Card>

      <RemovePostModal

        id={props.id}

        open={isModalOpen}

        onClose={() => setIsModalOpen(false)}

      />

    </>

  );

};
 
export default Post;
