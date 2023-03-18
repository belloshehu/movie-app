import React, {useEffect} from 'react'
import { FaHeart } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import './Favourites.css'

const Favourites = () => {
    const {favourites} = useSelector(store => store.movie)

    useEffect(() => {
    }, [favourites])
    
    return (
      <Link className='relative group' to='/favorites'>
          <FaHeart className='fav-icon'/>
          <span className='fav-number'>{favourites.length}</span>
      </Link>
    )
}

export default Favourites