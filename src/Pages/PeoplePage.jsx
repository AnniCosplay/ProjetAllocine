import { useParams } from "react-router-dom";
import PeoplesService from "../Services/PeoplesService";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import MoviesService from "../Services/MoviesService";
import MoviesCarousel from "../Components/MoviesCarousel";
import MovieCard from "../Components/MovieCard";
import Paginations from "../Components/Paginations";



const PeoplePage = () => {
    const { id } = useParams();
    const [people, setPeople] = useState({});
    const [movies, setMovies] = useState([]);
    const [maxPages, setMaxPages] = useState(500);
    const [currentPage, setCurrentPage] = useState(1);

    const fetchPeople = async () => {
        try {
            const response = await PeoplesService.getPeople(id);
            setPeople(response.data);
            // console.log(response.data);

        } catch (error) {
            console.error(error);
        }
    }

    const fetchMoviesByPeople = async () => {
        try {
            const response = await MoviesService.getMoviesByPeople(id, currentPage);
            setMovies(response.data.results);
            setMaxPages(response.data.total_pages);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchPeople();
    }, [])

    useEffect(() => {
        fetchMoviesByPeople();

    }, [currentPage])

    return <>
        <Container fluid className="d-flex flex-column align-items-center gap-3 pt-3">
            {/* Partie Globale en dessous */}
            <Container className="d-flex">

                {/* Partie Gauche en dessous */}
                <Container className="d-flex flex-column align-items-center gap-3 col-6">
                    <img className="col-12" src={"https://image.tmdb.org/t/p/original" + people.profile_path} alt={people.name} />
                </Container>

                {/* Partie Droite en dessous */}
                <Container className="d-flex flex-column align-items-center gap-1 col-6">
                    <h1>{people.name}</h1>
                    <h2 className="text-decoration-underline">Biographie</h2>
                    <p style={{ maxHeight: "30vh", overflow: "auto", textAlign: "justify", paddingRight: "15px" }}>{people.biography}</p>
                    <h2 className="text-decoration-underline">Date de naissance</h2>
                    <p>{people.birthday == null ? "Non renseigné" : people.birthday}</p>
                    <h2 className="text-decoration-underline">Lieu de naissance</h2>
                    <p>{people.place_of_birth == null ? "Non renseigné" : people.place_of_birth}</p>
                    <h2 className="text-decoration-underline">Date de décès</h2>
                    <p>{people.deathday == null ? "Non renseigné" : people.deathday}</p>
                    <h2 className="text-decoration-underline">Connu pour</h2>
                    <p>{people.known_for_department == null ? "Non renseigné" : people.known_for_department}</p>
                    <h2 className="text-decoration-underline">Notes</h2>
                    <p>{people.popularity == null ? "Non renseigné" : people.popularity}</p>

                </Container>

            </Container>
            <h2 className="text-decoration-underline">Filmographie</h2>
            {/* <MoviesCarousel movies={movies} title={""} /> */}
            <div className="d-flex flex-wrap justify-content-center gap-3">
                {movies.map((movie) => {
                    return <MovieCard movie={movie} key={movie.id} />
                })}

            </div>
            <Paginations currentPage={currentPage} setCurrentPage={setCurrentPage} maxPages={maxPages} />
        </Container>

    </>;
}

export default PeoplePage;