import React, {useEffect} from 'react'
import { useSelector } from 'react-redux'
import Movie from '../Movie/Movie'
import FavouriteMovie from '../FavouriteMovie/FavouriteMovie'


const MovieList = () => {
    const { isLoading, filteredMovies, favourites } = useSelector(store => store.movie)
    useEffect(() =>{

    }, [filteredMovies])
    if(isLoading){
        return (
            <div className='flex justify-center items-center h-[100px] w-full rounded-xl'>
                <h2 className=' text-indigo-900 text-3xl p-3'>Loading movies...</h2>
            </div>
        )
    }
    return (
        <div 
            className='grid grid-cols-1 lg:grid-cols-3 gap-3 w-full px-2'>
            {
                filteredMovies?.map(movie => <Movie key={movie.imdbID} {...movie} /> )
            }
        </div>
    )
}

export default MovieList