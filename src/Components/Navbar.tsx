import { useContext, useState } from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useLocation, Link } from "react-router-dom";
import AddPostModal from "./AddPostModal";
 
import { LoginContext } from "Context/Context";
import { auth } from "DB/FirebaseDB";
import { signOut } from "firebase/auth";
 
const Navbar = () => {
  const location = useLocation();
  const { isLoggedIn } = useContext(LoginContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
 
  const logoutHandler = () => {
    signOut(auth).then(() => {});
  };
 
  if (location.pathname != "/login") {
    return (
<>
<AppBar style={{ backgroundColor: "maroon" }} position="sticky">
<Toolbar
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "0 auto",
 
              width: "clamp(300px, 80%, 1200px)",
            }}
>
<Typography variant="h6">
<Link style={{ color: "#fff" }} to="/">
                Fitness Blog
</Link>
</Typography>
<Box style={{ display: "flex", gap: 20 }}>
              {isLoggedIn && (
<Button onClick={() => setIsModalOpen(true)} variant="contained">
                  Add Post
</Button>
              )}
              {isLoggedIn ? (
<Button onClick={logoutHandler} variant="contained">
                  Logout
</Button>
              ) : (
<Button variant="contained">
<Link style={{ width: "100%", color: "white" }} to="/login">
                    Login
</Link>
</Button>
              )}
</Box>
</Toolbar>
</AppBar>
<AddPostModal onClose={() => setIsModalOpen(false)} open={isModalOpen} />
</>
    );
  } else {
    return null;
  }
};
 
export default Navbar;
