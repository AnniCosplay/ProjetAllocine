import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
import GenresService from '../Services/GenresService';
import { Button, Form } from 'react-bootstrap';

const NavBar = () => {
    const navigate = useNavigate();
    const [genres, setGenres] = useState([]);
    const [search, setSearch] = useState("");

    const fetchGenres = async () => {
        try {
            const response = await GenresService.getGenres();
            setGenres(response.data.genres);

        } catch (error) {
            console.error(error);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            navigate('/search', { state : {search : search}})
        } catch (error) {
            console.error(error);
            
        }
    }

    useEffect(() => {
        fetchGenres();
    }, [])

    return <>
        <Navbar expand="lg" className="bg-dark" variant="dark">
            <Container fluid className="d-flex justify-content-center">
                <Navbar.Brand className="cursor" onClick={() => { navigate("/") }}>AlloCiné 🟡</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    {/* <Nav className="d-flex justify-content-center col-12"> */}
                    <Nav className="me-auto">
                        <Nav.Link onClick={() => { navigate("/") }}>Accueil</Nav.Link>
                        <Nav.Link onClick={() => { navigate("/peoples") }}>Acteurs</Nav.Link>
                        <Nav.Link onClick={() => { navigate("/movies") }}>Films</Nav.Link>
                        <Nav.Link onClick={() => { navigate("/favorite") }}>Mes favoris</Nav.Link>
                        <Nav.Link onClick={() => { navigate("/watchlist") }}>Ma Watchlist</Nav.Link>
                        <NavDropdown title="Genres" id="basic-nav-dropdown">
                            {genres.map((genre) => {
                                return <NavDropdown.Item key={genre.id} onClick={() => { navigate('/genre/' + genre.id) }}>
                                    {genre.name}
                                </NavDropdown.Item>
                            })}
                        </NavDropdown>
                    </Nav>
                    <Form className="d-flex" onSubmit={handleSubmit}>
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            value={search}
                            onChange={(e) => { setSearch(e.target.value) }}
                        />
                        <Button type="submit">Chercher</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </>;
}

export default NavBar;