import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomesPage'
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import NavBar from './Components/NavBar';
import MoviesPage from './Pages/MoviesPage';
import PeoplesPage from './Pages/PeoplesPage';
import PeoplePage from './Pages/PeoplePage';
import MoviePage from './Pages/MoviePage';
import GenrePage from './Pages/GenrePage';
import FavoritePage from './Pages/FavoritePage';
import WatchListPage from './Pages/WatchListPage';
import SearchPage from './Pages/SearchPage';


function App() {

  return (
    <>
      <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/peoples" element={<PeoplesPage />} />
        <Route path="/people/:id" element={<PeoplePage />} />
        <Route path="/movie/:id" element={<MoviePage />} />
        <Route path="/genre/:id" element={<GenrePage />} />
        <Route path="/favorite" element={<FavoritePage />} />
        <Route path="/watchlist" element={<WatchListPage />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
