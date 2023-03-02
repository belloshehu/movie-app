import React from 'react'
import { FaHeart } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { clearUser } from '../../features/auth/authSlice'
import Favourites from '../Favourites/Favourites'
import './Navbar.css'

const Navbar = () => {
  const {user} = useSelector(store => store.auth)
  const dispatch = useDispatch()
  const logout = () =>{
    window.open('http://localhost:5000/auth/logout', '_self')
    document.cookie = null
    dispatch(clearUser())
  }

  return (
    <header className='header text-white flex justify-between items-center p-2 bg-indigo-500 lg:px-20'>
        <Link 
          className='text-center text-3xl font-bold'
          to='/'
        >
            <span className='bg-white text-indigo-900 p-2 shadow-lg shadow-black rounded-md'>M</span>Moviex
        </Link>
        <div 
          className='flex gap-2 items-center'
        >
          {
            user? (
              <div className='flex gap-1 items-center'>
                  <p>Hello, {user.username}</p>
                  <Link 
                    className='bg-slate-400 p-2 rounded-md' 
                    onClick={logout}>Logout</Link>
              </div>
            ):(
              <Link to='/login' className='bg-indigo-900 p-2 rounded-md'>Login</Link>
            )
          }
          <Favourites />
        </div>
    </header>
  )
}

export default Navbar