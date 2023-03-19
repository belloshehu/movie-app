import './App.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMovies } from './features/movie/movieSlice';
import {Routes, Route, Navigate} from 'react-router-dom'
import { Home } from './pages/Home/Home';
import { MovieDetail } from './pages/MovieDetail/MovieDetail';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import { setUser, clearUser } from './features/auth/authSlice';
import Sidebar from './components/Sidebar/Sidebar';
import Favorites from './pages/Favorites/Favorites';
import Modal from './components/Modal/Modal';


function App() {
  const { user } = useSelector(store => store.auth)
  const {isOpen, isShowing} = useSelector( store => store.modal)
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
              dispatch(setUser(data.user))
            })
          .catch((error)=>{
              dispatch(clearUser())
          })
      }
      // getUser()
    }, [])

  return (
    <div className='flex flex-col gap-5 relative bg-indigo-900'>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/movie/:id' element={<MovieDetail />}/>
        <Route path='/favorites' element={!user? <Navigate to='/login' />: <Favorites />} />
        <Route path='/login' element={ user? <Navigate to='/' />: <Login /> }/>
        <Route path='/signup' element={ user? <Navigate to='/' />: <Signup /> }/>
      </Routes>
      { isOpen && <Sidebar /> }
      { isShowing && <Modal /> }
    </div>
  );
}

export default App;
