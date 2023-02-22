import React from 'react'
import { FaHeart } from 'react-icons/fa'
import Favourites from '../Favourites/Favourites'
import './Navbar.css'

const Navbar = () => {
  return (
    <header className='header text-white flex justify-between items-center p-2 bg-indigo-500 lg:px-20'>
        <h2 
          className='text-center text-3xl font-bold'
          >
            <span className='bg-white text-indigo-900 p-2 shadow-lg shadow-black rounded-md'>M</span>Moviex
        </h2>
        <Favourites />
    </header>
  )
}

export default Navbar