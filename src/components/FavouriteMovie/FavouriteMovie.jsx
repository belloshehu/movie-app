import React, { useState } from 'react'
import './FavouriteMovie.css'
import { Link } from 'react-router-dom'
import RemoveFromFavourites from '../RemoveFromFavourite/RemoveFromFavourites'

const FavouriteMovie = ({ Title, Year, Poster, Type, imdbID, _id }) => {
    return (
        <article 
            className='fav-movie-card relative group'>
            <img 
                src={Poster} 
                alt={Title} 
                className='w-full h-full aspect-square'
            />
            <div 
                className='movie-info movie-info-hover'>
                <Link to={`/movie/${imdbID}`} 
                    className='underline'
                >
                    <h4 className='font-bold text-center'>{Title}</h4>
                </Link>
                <div className='flex flex-row  group-hover:flex-col gap-2 justify-center w-full items-center'>
                    <small>{Year.slice(0, 10)}</small>
                    <RemoveFromFavourites
                        id={_id}
                    />
                </div>
            </div>
        </article>
    )
}

export default FavouriteMovie