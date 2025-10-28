import { Container } from "react-bootstrap";
import Carousel from 'react-bootstrap/Carousel';
import MoviesService from "../Services/MoviesService";
import { useEffect, useState } from "react";
import MoviesCarousel from "../Components/MoviesCarousel";


const HomePage = () => {
    const [movies, setMovies] = useState([]);
    const [moviesUpComing, setMoviesUpComing] = useState([]);
    const [moviesTopRated, setMoviesTopRated] = useState([]);
    

    const fetchMoviesPlaying = async () => {
        try {
            const response = await MoviesService.getMoviesPlaying();
            setMovies(response.data.results);
        } catch (error) {
            console.error(error);

        }
    }

    const fetchMoviesUpComing = async () => {
        try {
            const response = await MoviesService.getMoviesUpComing();
            setMoviesUpComing(response.data.results);

        } catch (error) {
            console.log(error);

        }

    }

    const fetchMoviesTopRated = async () => {
        try {
            const response = await MoviesService.getMoviesTopRated();
            setMoviesTopRated(response.data.results);

        } catch (error) {
            console.error(error);
        }
    }

    // useEffect avec des dépendances vide [] ligne 20, alors le code entre les {} se font
    // au chargement de la page.
    useEffect(() => {
        fetchMoviesPlaying();
        fetchMoviesUpComing();
        fetchMoviesTopRated();
    }, [])

    return <>
        <Container fluid className="d-flex flex-column align-items-center pt-3 pb-3 gap-3">
            <h1>AlloCiné 🟡</h1>
            {/* <div fluid className="d-flex"> */}
            <MoviesCarousel title={"Films à l'affiche"} movies={movies} />
            <MoviesCarousel title={"Films à venir"} movies={moviesUpComing} />
            <MoviesCarousel title={"Films mieux notés"} movies={moviesTopRated} />
            {/* </div> */}
        </Container >
    </>;


}

export default HomePage;