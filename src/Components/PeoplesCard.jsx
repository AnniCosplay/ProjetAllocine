import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const PeoplesCard = ({ peoples }) => {
const navigate = useNavigate();

    return <>
        <Card className="col-3" onClick={() =>{navigate('/people/' + peoples.id)}}>
            <Card.Img variant="top" src={"https://image.tmdb.org/t/p/original" + peoples.profile_path} />
            <Card.Body style={{maxHeight : "250px"}}>
                <Card.Title>{peoples.name}</Card.Title>
                {/* {<Card.Text style={{height : "40%", overflowY : "auto"}}>
                    {peoples.overview}
                </Card.Text> } */}
                <div className="d-flex flex-column align-items-center">
                    <Button variant="primary" onClick={() =>{navigate('/people/' + peoples.id)}}>Voir details</Button>
                </div>
            </Card.Body>
        </Card>
    </>;
}

export default PeoplesCard;