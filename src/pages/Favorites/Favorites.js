import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from '../../components/Navbar/Navbar'
import { getAllFavorites } from '../../features/movie/movieSlice'
import FavouriteMovie from '../../components/FavouriteMovie/FavouriteMovie'
import { Link } from 'react-router-dom'

const Favorites = () => {
    const {favourites, isLoading} = useSelector(store => store.movie)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllFavorites())
    }, [])
    
    if(isLoading){
        return (
            <div className='flex flex-col justify-center items-center mt-50 p-10'>
                <h1 className='text-center text-indigo-500'>Loading ...</h1>
            </div>
        )
    }
    return (
        <div className='w-full h-full mt-20 pt-50 lg:p-20 p-2'>
            <Navbar />
            <h2 className='text-center text-white font-bold text-xl lg:text-3xl mt-30 mb-10'>My favorite movies ({favourites?.length})</h2>
            {
                favourites?.length > 0? (
                    <div 
                        className='grid grid-cols-1 lg:grid-cols-4 gap-3 w-full px-2'>
                        {
                            favourites?.map(movie => <FavouriteMovie key={movie.imdbID} {...movie} />)
                        }
                    </div>   
                ):(
                    <div className='flex flex-col gap-4 justify-center items-center text-slate-100'>
                        <h2>You have no favorite movies</h2>
                        <Link to='/' className='bg-slate-200 p-2 px-4 rounded-md text-indigo-900'>Add now</Link>
                    </div>
                )
            }   
        </div>
    )
}

export default Favorites