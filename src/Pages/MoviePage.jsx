import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import MoviesService from "../Services/MoviesService";
import CastingsTab from "../Components/CastingsTab";
import SimilarMoviesTab from "../Components/SimilarMoviesTab";
import SagaMoviesTab from "../Components/SagaMoviesTab";



const MoviePage = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState({});
    const [key, setKey] = useState("casting");
    const [isInFavorite, setIsInFavorite] = useState(false);
    const [isInWatchList, setIsInWatchList] = useState(false);
    const navigate = useNavigate();

    const fetchMovie = async () => {
        try {
            const response = await MoviesService.getMovie(id);
            setMovie(response.data);
            (response.data.results);
        } catch (error) {
            console.error(error);
        }
    }

    const addToFavorite = async () => {
        try {
            const payload = {
                "media_type": "movie",
                "media_id": id,
                "favorite": true
            }
            const response = await MoviesService.addToFavorite(payload);
            setIsInFavorite(true);

        } catch (error) {
            console.error(error);
        }
    }

    const removeToFavorite = async () => {
        try {
            const payload = {
                "media_type": "movie",
                "media_id": id,
                "favorite": false
            }
            const response = await MoviesService.addToFavorite(payload);
            setIsInFavorite(false);

        } catch (error) {
            console.error(error);
        }
    }

    const addToWatchList = async () => {
        try {
            const payload = {
                "media_type": "movie",
                "media_id": id,
                "watchlist": true
            }
            const response = await MoviesService.addToWatchList(payload);
            setIsInWatchList(true);
        } catch (error) {
            console.error(error);
        }
    }
    const removeToWatchList = async () => {
        try {
            const payload = {
                "media_type": "movie",
                "media_id": id,
                "watchlist": false
            }
            const response = await MoviesService.addToWatchList(payload);
            setIsInWatchList(false);
        } catch (error) {
            console.error(error);
        }
    }

    const checkFavorite = async () => {
        try {
            let page = 1;
            while (true) {
                const response = await MoviesService.getFavoriteMovies(page);
                // La liste de mes films.
                let data = response.data.results;
                let exist = data.find((movie) => movie.id == id);

                if (exist != undefined) {
                    setIsInFavorite(true);
                }
                if (page >= response.data.total_pages) {
                    break;
                }
                page++;
            }
        } catch (error) {
            console.error(error);
            
        }
    }

    const checkWatchList = async () => {
        try {
            let page = 1;
            while (true) {
                const response = await MoviesService.getWatchListMovies(page);
                // La liste de mes films.
                let data = response.data.results;
                let exist = data.find((movie) => movie.id == id);

                if (exist != undefined) {
                    setIsInWatchList(true);
                }
                if (page >= response.data.total_pages) {
                    break;
                }
                page++;
            }
        } catch (error) {
            console.error(error);
            
        }
    }

    useEffect(() => {
        fetchMovie();
        checkFavorite();
        checkWatchList();
    }, [id])

    return <>
        <Container fluid className="d-flex flex-column align-items-center gap-3 pt-3">
            {/* Partie Globale en dessous */}
            <Container className="d-flex">

                {/* Partie Gauche en dessous */}
                <Container className="d-flex flex-column align-items-center gap-3 col-6">
                    <img className="col-12" src={"https://image.tmdb.org/t/p/original" + movie.poster_path} alt={"IMAGE-" + movie.title} />
                </Container>

                {/* Partie Droite en dessous */}
                <Container className="d-flex flex-column align-items-center gap-3 col-6">
                    <h1>{movie.title ? movie.title : "Non renseigné"}</h1>

                    <div className="d-flex justify-content-between col-10">
                        {isInFavorite ? <button className="btn btn-danger" onClick={removeToFavorite}>Retirer des favoris</button> :
                        <button className="btn btn-success" onClick={addToFavorite}>Ajouter aux favoris</button>}
                        {isInWatchList ? <button className="btn btn-danger" onClick={removeToWatchList}>Retirer de la watchList</button> :
                        <button className="btn btn-success" onClick={addToWatchList}>Ajouter à la watchList</button>}
                    </div>
                    
                    <h2 className="text-decoration-underline">Description</h2>
                    <p style={{ maxHeight: "30vh", overflow: "auto", textAlign: "justify", paddingRight: "15px" }}>
                        {movie.overview ? movie.overview : "Non renseigné"}</p>

                    <h2 className="text-decoration-underline">Date de sortie</h2>
                    <p>{movie.release_date ? movie.release_date : "Non renseigné"}</p>

                    <h2 className="text-decoration-underline">Genres</h2>
                    <div className="d-flex gap-3">
                        {movie.genres ? movie.genres.map((genre) => {
                            return <span key={genre.id} className="btn btn-info" onClick={() => { navigate("/genre/" + genre.id) }}>{genre.name}</span>
                        }) : 'Non renseigné'}
                    </div>

                    <h2 className="text-decoration-underline">Note</h2>
                    <p>{movie.vote_average ? movie.vote_average : "Non renseigné"}/10</p>

                    <h2 className="text-decoration-underline">Statut</h2>
                    <p>{movie.status ? movie.status : "Non renseigné"}</p>

                    <h2 className="text-decoration-underline">Saga</h2>
                    <p>{movie.belongs_to_collection ? movie.belongs_to_collection.name : "Aucune Saga"}</p>

                    <h2 className="text-decoration-underline">Productions</h2>
                    <div className="d-flex gap-3">
                        {movie.production_companies ? movie.production_companies.map((compagny) => {
                            return <span className="btn btn-info" key={compagny.id}>{compagny.name}</span>
                        }) : "Non renseigné"}
                    </div>
                    <h2 className="text-decoration-underline">Pays de production</h2>
                    <div className="d-flex gap-3">
                        {movie.production_countries ? movie.production_countries.map((country) => {
                            return <span className="btn btn-info" key={country.iso_3166_1}>{country.name}</span>
                        }) : "Non renseigné"}
                    </div>

                </Container>
            </Container>
            <Tabs id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mb-3">
                <Tab eventKey={"casting"} title="Casting">
                    <CastingsTab movie={movie} />
                </Tab>
                <Tab eventKey={"similar-movies"} title="Film similaire">
                    <SimilarMoviesTab movie={movie} />
                </Tab>
                <Tab eventKey={"saga-movies"} title="Film de la saga">
                    <SagaMoviesTab movie={movie} />
                </Tab>
            </Tabs>


        </Container >

    </>;

}
export default MoviePage;

