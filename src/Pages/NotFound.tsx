import { Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Box
      sx={{
        height: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography style={{ color: "maroon" }} variant="h4">
        404 Not Found
      </Typography>
      <Link to="/">Go back</Link>
    </Box>
  );
};

export default NotFound;
