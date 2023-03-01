import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import { useDispatch } from 'react-redux';
import { getMovies } from './features/movie/movieSlice';
import {Routes, Route} from 'react-router-dom'
import { Home } from './pages/Home/Home';
import { MovieDetail } from './pages/MovieDetail/MovieDetail';
import Login from './pages/Login/Login';
import { setUser, clearUser } from './features/auth/authSlice';
import axios from 'axios';


function App() {
  const [isLoading, setIsLoading] = useState()
  const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getMovies())
        const getUser = async() =>{
            fetch('http://localhost:5000/auth/login/success', {
              credentials: 'include',
              method: 'GET',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credential': true,
                'Authorization': `Bearer ${document.cookie.startsWith('jwt') }`
              },
            })
            .then((res)=>{
              return res.json()
            })
            .then((data) =>{
              console.log('received: ', data)
              dispatch(setUser(data.user))
            })
          .catch((error)=>{
              console.log(error)
              dispatch(clearUser())
          })
      }
      getUser()
    }, [])

    // useEffect(() => {
    //   const getUser = async()=>{
    //       try {
    //           const res = await axios.get('http://localhost:5000/auth/login/success')
    //           dispatch(setUser(res.data))
    //           console.log('result:', res)
    //           setIsLoading(false)
    //       } catch (error) {
    //           console.log(error)
    //           dispatch(clearUser())
    //           setIsLoading(false)
    //       }
    //   }
    //   getUser()
    // }, [])

  return (
    <div className='flex flex-col gap-5 relative bg-indigo-900'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/movie/:id' element={<MovieDetail />}/>
        <Route path='/login' element={<Login />}/>
      </Routes>
    </div>
  );
}

export default App;
