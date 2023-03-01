import React, {useState} from 'react'
import { FaHeart } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import './Favourites.css'

const Favourites = () => {
    const {favourites} = useSelector(store => store.movie)
  return (
    <div className='relative group'>
        <FaHeart className='fav-icon'/>
        <span className='fav-number'>{favourites.length}</span>
    </div>
  )
}

export default Favourites