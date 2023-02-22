import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import MovieList from './components/MovieList/MovieList';
import Filter from './components/FilterContainer/FilterContainer';
import HeroSection from './components/HeroSection/HeroSection';
import SearchBar from './components/SearchBar/SearchBar';
import { useSelector, useDispatch } from 'react-redux';
import { getMovies } from './features/movie/movieSlice';
import {Routes, Route} from 'react-router-dom'
import { Home } from './pages/Home/Home';
import { MovieDetail } from './pages/MovieDetail/MovieDetail';


function App() {
  const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getMovies())
    }, [])

  return (
    <div className='flex flex-col gap-5 relative bg-indigo-900'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/movie/:id' element={<MovieDetail />}/>
      </Routes>
    </div>
  );
}

export default App;
