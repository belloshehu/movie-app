import React from 'react'
import AddToFavourites from '../AddToFavourites/AddToFavourites'
import './Movie.css'

const Movie = ({Title, Year, Poster, Type}) => {

  return (
    <article 
        className='movie-card relative group'>
        <img 
            src={Poster} 
            alt={Title} 
            className='w-full h-full aspect-square rounded-t-md'
        />
        <div 
            className='movie-info movie-info-hover'>
            <h4 className='font-bold '>{Title}</h4>
            <small>{Year}</small>
            <AddToFavourites />
        </div>
    </article>
  )
}

export default Movie