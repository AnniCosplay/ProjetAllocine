import { useState, useEffect } from "react";
import MoviesService from "../Services/MoviesService";
import { Container } from "react-bootstrap";
import PeoplesCard from "./PeoplesCard";

const CastingsTab = ({ movie }) => {
    const [castings, setCastings] = useState([]);

    const fetchCasting = async () => {
        try {
            const response = await MoviesService.getCasting(movie.id);
            setCastings(response.data);

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (movie.id) {
            fetchCasting();
        }
    }, [movie])

    return <>
        <Container className="d-flex flexb-column gapt-3 align-items-center">
            <h2 className="text-decoration-underline">Acteurs</h2>
            <div className="d-flex gap-3 justify-content-center flex-wrap">
                {castings.cast && castings.cast.map((actor) => {
                    return <PeoplesCard key={actor.id} peoples={actor} />
                })}

            </div>
            <h2 className="text-decoration-underline">Équipes</h2>
        </Container>
    </>;
}

export default CastingsTab;