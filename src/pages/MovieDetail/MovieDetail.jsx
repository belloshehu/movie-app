import React, {useEffect} from 'react'
import { Link, useLocation, } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getSingleMovie } from '../../features/movie/movieSlice'
import AddToFavourites from '../../components/AddToFavourites/AddToFavourites'
import { FaUser } from 'react-icons/fa'
import './MovieDetail.css'


export const MovieDetail = () => {
    const dispatch = useDispatch()
    const {selectedMovie, isLoading} = useSelector(store => store.movie)
    
    const {pathname} = useLocation()
    let id = pathname.split('/')[ pathname.split('/').length - 1]
    id = id.trim()

    
    useEffect(() => {
        dispatch(getSingleMovie(id))
    }, [id])

    if(isLoading){
        return (
            <h1 className='text-white mx-auto mt-20 font-bold'> Loading....</h1>
        )
    }
    return (
        <div className='grid grid-cols-1 gap-10 lg:grid-cols-2 text-white overflow-hidden p-2 lg:p-20'>
            <div className='w-full'>
                <img 
                    src={selectedMovie.Poster} 
                    alt={selectedMovie.Title} 
                    className='w-full h-[500px] aspect-square block rounded-lg'
                />
            </div>
            <div className='text-left w-full'>
                <h1 className='font-bold text-3xl mb-10 bg-slate-400 text-black p-4 rounded-lg lg:text-center'>{selectedMovie.Title}</h1>
                <div className='flex gap-2 items-center'>
                    <h3><span className='detail-span'>Actors:</span> {selectedMovie.Actors}</h3>
                </div>
                <p><span className='detail-span'>Year released:</span> {selectedMovie.Released}</p>
                <p><span className='detail-span'>Genre:</span> {selectedMovie.Genre}</p>
                <p><span className='detail-span'>Runtime:</span> {selectedMovie.Runtime}</p>
                <p><span className='detail-span'>Awards:</span> {selectedMovie.Awards}</p>
                <p><span className='detail-span'>Written by:</span> {selectedMovie.Writer}</p>
                <p><span className='detail-span'>Directed by:</span> {selectedMovie.Director}</p>
                
                <div className='flex bg-indigo-500'>
                    
                </div>
                <div className='flex flex-col gap-4 my-10'>
                    <AddToFavourites />
                    <div>
                        <Link to='/' className='bg-white text-indigo-900 p-2 px-4 rounded-lg'>Back to search</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
