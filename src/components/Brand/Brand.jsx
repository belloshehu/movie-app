import React from 'react'
import { Link } from 'react-router-dom'

const Brand = () => {
  return (
    <div>
        <Link 
          className='text-center text-3xl font-bold'
          to='/'
        >
            <span className='bg-white text-indigo-900 p-2 px-4 shadow-lg shadow-black rounded-md'>F</span>Favoritemovis
        </Link>
    </div>
  )
}

export default Brand