import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Movie from '../Movie/Movie'
// import {movies} from '../../data/data'
import { getMovies } from '../../features/movie/movieSlice'


const MovieList = () => {
    const {movies, isLoading, filteredMovies} = useSelector(store => store.movie)
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
                filteredMovies?.map(movie => <Movie key={movie.imdbID} {...movie} />)
            }
        </div>
    )
}

export default MovieList