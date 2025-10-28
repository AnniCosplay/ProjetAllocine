import { Carousel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


const MoviesCarousel = ({title, movies}) => {
    const navigate = useNavigate();
    return <>
        <h2>{title}</h2>
        <Carousel className="col-12 col-md-6">
            {movies.map((movie) => {
                return <Carousel.Item key={movie.id}>
                    <img onClick={() => navigate('/movie/' + movie.id)} className="block w-100 rounded cursor" src={"https://image.tmdb.org/t/p/original" + movie.backdrop_path} alt="" />
                    <Carousel.Caption>
                        <h2>{movie.title}</h2>
                    </Carousel.Caption>
                </Carousel.Item>
            })}
        </Carousel>
    </>
}

export default MoviesCarousel;