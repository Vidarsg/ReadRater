import React, { useState, useContext } from "react";
import {
  ThemeProvider,
  createTheme,
  makeStyles,
} from "@material-ui/core/styles";
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
} from "@material-ui/core";
import image from "./images/book-icon.png";
import readService from "./service";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./context";

const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const imagestyle = {
  position: "absolute",
  top: "100px",
  right: "-160px",
};

export default function Login() {
  const navigate = useNavigate();
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { user, setUser } = useContext(UserContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const buttonName = event.nativeEvent.submitter.name;
    if (
      buttonName === "admin-button" &&
      username === "admin" &&
      password === "admin123"
    ) {
      // If the input matches the admin credentials, redirect to the admin page
    } else if (buttonName === "default-button") {
      readService
        .logIn(username, password)
        .then((user) => setUser(user))
        .then(() => navigate("/"))
        //navigates to home page
        .catch((error) => setError(error.response.data));
      // Redirect to the default page
    } else {
      setError("This account does not have admin privileges");
    }
  };

  return (
    <div style={{ backgroundColor: "#011707", height: "100vh" }}>
      <Container
        component="main"
        maxWidth="xs"
        style={{ position: "relative", right: "100px", paddingTop: "100px" }}
      >
        <Box mt={5}>
          <Typography component="h1" variant="h5" style={{ color: "white" }}>
            Login
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Typography color="error">{error}</Typography>
            <Button
              type="submit"
              name="default-button"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            {/* {<Button
              type="submit"
              name="admin-button"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
              // style={{ color: "#2f5f2e" }}
            >
              Sign In As Admin
            </Button>} */}
          </form>
        </Box>
        <img src={image} alt="ReadRater Logo" style={imagestyle} />
      </Container>
    </div>
  );
}
