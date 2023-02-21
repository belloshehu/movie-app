import React from 'react'
import {FaHeart} from 'react-icons/fa'

const AddToFavourites = () => {
  return (
    <div 
        className='flex gap-2 group p-2 rounded-md group-hover:bg-slate-500 hover:cursor-pointer'>
        <FaHeart 
            className='text-white shadow-sm group-hover:text-3xl'
        />
        <p className='opacity-0 group-hover:opacity-100 text-white'>Add to Favourites</p>
    </div>
  )
}

export default AddToFavourites