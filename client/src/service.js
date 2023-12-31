import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000/api";

class ReadService {
  getAllBooks() {
    return axios.get("/books").then((response) => response.data);
  }

  getDistinctAuthors() {
    return axios.get("/authors").then((response) => response.data);
  }

  getDistinctGenres() {
    return axios.get("/genres").then((response) => response.data);
  }

  getDistinctYears() {
    return axios.get("/years").then((response) => response.data);
  }

  addRating(verdi, vurdering, bruker_id, bok_id) {
    return axios
      .post("/rating", {
        verdi: verdi,
        vurdering: vurdering,
        bruker_id: bruker_id,
        bok_id: bok_id,
      })
      .then((response) => response.data);
  }

  logIn(brukernavn, passord) {
    return axios
      .get("/log_in/" + brukernavn + "/" + passord)
      .then((response) => response.data);
  }

  addBook(navn, tittel, sjanger, bilde, aar, rangering, bruker_id) {
    return axios
      .post("/books", {
        navn: navn,
        tittel: tittel,
        sjanger: sjanger,
        bilde: bilde,
        aar: aar,
        rangering: rangering,
        bruker_id: bruker_id,
      })
      .then((response) => response.data);
  }

  getAllRatings(bokID) {
    return axios.get("/ratings/" + bokID).then((response) => response.data);
  }

  deleteRating(ratingID) {
    return axios.delete("/delRating/" + ratingID).then((response) => response.data);
  }
}

const readService = new ReadService();
export default readService;
