import React, { useState, useEffect, useContext } from "react";
import {
  ThemeProvider,
  createTheme,
} from "@material-ui/core/styles";
import {
  AppBar,
  Button,
  CssBaseline,
  Grid,
  Box,
  Toolbar,
  Typography,
  Container,
  Link,
} from "@material-ui/core";
import Book from "./Book.js";
import bookIconW from "./images/book-icon_white.png";
import { useNavigate } from "react-router-dom";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Routes,
} from "react-router-dom";
import readService from "./service.js";
import { UserContext } from "./context.js";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="#">
        ReadRater
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const appBarHeight = "70px";

export default function BookPage() {
  const [books, setBooks] = useState([]);
  const { user, setUser } = useContext(UserContext);

  // const [rating, setRating] = useState();
  //This is how you fetch the data from the database, use in components
  useEffect(() => {
    readService
      .getAllBooks()
      .then((data) => {
        setBooks(data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#2f5f2e",
      },
      secondary: {
        main: "#ffffff",
      },
    },
    typography: {
      fontFamily: "Bookman Old Style",
    },
  });

  const navigate = useNavigate();

  const addBook = () => {
    if (user) {
      navigate("add-new-book");
    } else {
      alert("You have to log in to add book!");
      navigate("login");
    }
  };
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar
          position="relative"
          style={{ height: appBarHeight, backgroundColor: "#2F5F2E" }}
        >
          <Toolbar style={{ display: "flex" }}>
            <Box
              style={{
                height: appBarHeight,
                width: appBarHeight,
                display: "flex",
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={bookIconW}
                style={{
                  height: appBarHeight,
                  position: "relative",
                  boxSizing: "borderbox",
                  padding: "10px",
                }}
              />
            </Box>
            <a href="/" style={{ color: "inherit", textDecoration: "none" }}>
              <Typography
                fontSize="26px"
                variant="h6"
                noWrap
              >
                ReadRater
              </Typography>
            </a>
            <Box style={{ flexGrow: "1" }}></Box>
            {user ? null : (
              <Button
                variant="contained"
                color="success"
                style={{ BackgroundColor: "#2F5F2E" }}
                onClick={() => navigate("login")}
              >
                Login
              </Button>
            )}
          </Toolbar>
        </AppBar>
        <main>
          {/* Hero unit */}
          <Box
            sx={{
              bgcolor: "background.paper",
              pt: 6,
              pb: 0,
            }}
          >
            <Container
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                paddingTop: 50,
              }}
            >
              <Typography
                style={{ marginBottom: "30px" }}
                component="h1"
                variant="h2"
                align="center"
                color="text.primary"
                gutterBottom
              >
                Welcome to ReadRater!
              </Typography>
              <Button
                variant="contained"
                color="primary"
                display="inline-block"
                width="150px"
                onClick={addBook}
              >
                Add book
              </Button>{" "}
              {/*#TODO Hvis bruker er logget inn: link til addbook-side. Om nei, til login-side */}
            </Container>
          </Box>
          <Container sx={{ py: 4 }} maxWidth="md">
            {/* End hero unit */}
            <Grid
              container
              spacing={4}
              style={{ marginTop: "30px", marginBottom: "0px", width: "auto" }}
            >
              {books.map((book) => (
                <Grid item key={book.bok_id} xs={10} sm={4} md={3}>
                  <Book
                    title={book.tittel}
                    author={book.navn}
                    year={book.aar}
                    genre={book.sjanger}
                    picture={book.bilde}
                    avg_rating={book.avg_verdi}
                    bookID={book.bok_id}
                    rateEnabled={true}
                  ></Book>
                  {/* #TODO Her kom å legge til infoen fra hver bok */}
                </Grid>
              ))}
            </Grid>
          </Container>
        </main>
        {/* Footer */}
        <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
          <Typography variant="h6" align="center" gutterBottom></Typography>
          <Typography
            variant="subtitle1"
            align="center"
            color="text.secondary"
            component="p"
          >
            ReadRater: The application for rating books!
          </Typography>
          <Copyright />
        </Box>
      </ThemeProvider>
      {/* End footer */}
    </>
  );
}
