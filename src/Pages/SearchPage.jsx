import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MoviesService from "../Services/MoviesService";
import MovieCard from "../Components/MovieCard";
import PeoplesCard from "../Components/PeoplesCard";
import { Container } from "react-bootstrap";
import Paginations from "../Components/Paginations";


const SearchPage = () => {
    const location = useLocation();
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPages, setMaxPages] = useState(500);

    const fetchSearchAll = async () => {
        try {
            const response = await MoviesService.searchAll(location.state.search, currentPage);
            setData(response.data.results);
            setMaxPages(response.data.total_pages);
        } catch (error) {
            console.error(error);

        }
    }

    useEffect(() => {
        fetchSearchAll();
        window.scrollTo({top: 0, behavior : "instant"})
    }, [location.state, currentPage])

    return <>
        <Container className="d-flex flex-column align-items-center gap-3 pt-5">
            <div className="d-flex flex-wrap gap-3 justify-content-center">
                {data.map((currentData) => {
                    console.log(currentData);
                    return currentData.media_type == "movie" ?
                        <MovieCard key={currentData.id} movie={currentData} /> :
                        <PeoplesCard key={currentData.id} peoples={currentData} />
                })}
            </div>
            <Paginations currentPage={currentPage} setCurrentPage={setCurrentPage} maxPages={maxPages} />
        </Container>
    </>;
}

export default SearchPage;