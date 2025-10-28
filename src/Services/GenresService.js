import axios from "axios";
import { HEADER, TOKEN } from "./config";

function getGenres() {
    return axios.get("https://api.themoviedb.org/3/genre/movie/list", HEADER)
}

export default {
    getGenres
}