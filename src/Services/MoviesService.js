import axios from "axios";
import { ACCOUNT_ID, HEADER, TOKEN } from "./config";

function getMoviesPlaying() {
    return axios.get("https://api.themoviedb.org/3/movie/now_playing?language=fr-FR", HEADER)
}

function getMoviesUpComing() {
    return axios.get("https://api.themoviedb.org/3/movie/upcoming", HEADER)
}

function getMoviesTopRated() {
    return axios.get("https://api.themoviedb.org/3/movie/top_rated", HEADER)
}

function getMovies(page) {
    return axios.get("https://api.themoviedb.org/3/discover/movie?&page=" + page, HEADER)
}

function getMoviesByPeople(idPeople, page) {
    return axios.get("https://api.themoviedb.org/3/discover/movie?&with_cast=" + idPeople + "&page=" + page, HEADER)
    
}

function getMovie(id) {
    return axios.get("https://api.themoviedb.org/3/movie/" + id, HEADER)
}

function getCasting(id) {
    return axios.get("https://api.themoviedb.org/3/movie/" + id + "/credits?language=fr-FR", HEADER)
    
}

function getSimilarMovies(id, page) {
    return axios.get("https://api.themoviedb.org/3/movie/" + id + "/similar?language=fr-FR&page=" + page, HEADER)
    
}

function getSagaMovies(id) {
    return axios.get("https://api.themoviedb.org/3/collection/" + id + "?language=fr-FR", HEADER)
    
}

function getMoviesByGenre(id, page) {
    return axios.get("https://api.themoviedb.org/3/discover/movie?language=fr-FR&with_genres=" + id + "&page=" + page, HEADER)
    
}

function addToFavorite(data) {
    return axios.post("https://api.themoviedb.org/3/account/" + ACCOUNT_ID + "/favorite", data,  HEADER)
}

function addToWatchList(data) {
    return axios.post("https://api.themoviedb.org/3/account/" + ACCOUNT_ID + "/watchlist", data,  HEADER)
}

function getFavoriteMovies(page) {
    return axios.get("https://api.themoviedb.org/3/account/" + ACCOUNT_ID + "/favorite/movies?language=fr-FR&page=" + page, HEADER)
}

function getWatchListMovies(page) {
    return axios.get("https://api.themoviedb.org/3/account/" + ACCOUNT_ID + "/watchlist/movies?language=fr-FR&page=" + page, HEADER)
}

function searchAll(search, page) {
    return axios.get("https://api.themoviedb.org/3/search/multi?query=" + search + "&page=" + page, HEADER)
}

export default {
    getMoviesPlaying,
    getMoviesUpComing,
    getMoviesTopRated,
    getMovies,
    getMoviesByPeople,
    getMovie,
    getCasting, 
    getSimilarMovies,
    getSagaMovies,
    getMoviesByGenre,
    addToFavorite,
    getFavoriteMovies,
    addToWatchList,
    getWatchListMovies,
    searchAll
}