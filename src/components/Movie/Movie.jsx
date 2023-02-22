import React from 'react'
import AddToFavourites from '../AddToFavourites/AddToFavourites'
import './Movie.css'
import { Link } from 'react-router-dom'

const Movie = ({Title, Year, Poster, Type, imdbID}) => {

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
            <Link to={`/movie/${imdbID}`} 
              className='underline'
              >
              <h4 className='font-bold '>{Title}</h4>
            </Link>
            <div className='flex group-hover:flex-col gap-2 justify-between items-center'>
              <small>{Year}</small>
              <AddToFavourites />
            </div>
        </div>
    </article>
  )
}

export default Movie