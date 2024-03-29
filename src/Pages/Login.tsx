import { FC, useState, useContext } from "react";
import { LoginContext } from "Context/Context";

import { TextField, Button, Typography, Box, Paper, InputAdornment } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import HttpsIcon from "@mui/icons-material/Https";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "DB/FirebaseDB";
import { useFormik } from "formik";
import * as yup from "yup";

const Login: FC = () => {
  const [error, setError] = useState("");
  const { setIsLoggedIn } = useContext(LoginContext);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: yup.object({
      email: yup.string().required("Email is required").email("Invalid email"),
      password: yup.string().required("Password is required"),
    }),

    onSubmit: () => {
      loginUser();
    },
  });

  const loginUser = async () => {
    try {
      const response = await signInWithEmailAndPassword(
        auth,
        formik.values.email,
        formik.values.password
      );
      setIsLoggedIn(true);
    } catch (error) {
      setError("Invalid Login Data");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
      }}
    >
      <Paper
        elevation={10}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 30,
          width: "clamp(310px, 50vw, 500px)",
          height: "70vh",
        }}
      >
        <AccountCircleIcon style={{ fontSize: "3rem" }} />
        <Typography variant="h3">Sign In</Typography>
        {error && (
          <Typography style={{ color: "red" }} variant="body2">
            {error}
          </Typography>
        )}

        <TextField
          label="Email"
          value={formik.values.email}
          name="email"
          id="email"
          error={formik.touched.email && !!formik.errors.email}
          onChange={formik.handleChange}
          helperText={formik.errors.email}
          onBlur={formik.handleBlur}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          value={formik.values.password}
          label="Password"
          id="password"
          name="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && !!formik.errors.password}
          helperText={formik.errors.password}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <HttpsIcon />
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          style={{ backgroundColor: "maroon", width: "50%" }}
          disableElevation={true}
          onClick={() => formik.handleSubmit()}
        >
          Login
        </Button>
      </Paper>
    </Box>
  );
};

export default Login;
