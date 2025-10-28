import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import PeoplesService from "../Services/PeoplesService";
import PeoplesCard from "../Components/PeoplesCard";
import Paginations from "../Components/Paginations";

const PeoplesPage = () => {
const [peoples, setPeoples] = useState([]);
const [maxPages, setMaxPages] = useState(500);
const [currentPage, setCurrentPage] = useState(1);


const fetchPeoples = async () => {
        try {
            const response = await PeoplesService.getPeoples(currentPage);
            setPeoples(response.data.results);

        } catch (error) {
            console.error(error);
        }
    }

     useEffect(() => {
            fetchPeoples();
             window.scrollTo({top: 0, behavior : "instant"})
        }, [currentPage])


    return <>
        <Container fluid className="d-flex flex-column align-items-center gap-3 pt-3">
            <h1>Personnalités</h1>
        <div className="d-flex flex-wrap gap-3 justify-content-center">
                {peoples.map((people) => {
                    return <PeoplesCard peoples={people} key={people.id} />

                })}
            </div>
            <Paginations currentPage={currentPage} setCurrentPage={setCurrentPage} maxPages={maxPages} />
        </Container>
    </>;
}

export default PeoplesPage;