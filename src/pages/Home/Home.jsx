import React, {useState, useEffect} from 'react'
import Filter from '../../components/FilterContainer/FilterContainer'
import MovieList from '../../components/MovieList/MovieList'
import HeroSection from '../../components/HeroSection/HeroSection'
import Navbar from '../../components/Navbar/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import Favorites from '../Favorites/Favorites'
import { getAllFavorites } from '../../features/movie/movieSlice'


export const Home = () => {
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()
    const {movies} = useSelector(store => store.movie)

    useEffect(() => {
        dispatch(getAllFavorites())
    }, [Favorites])
    
    if(isLoading){
        return(
            <section 
                className='flex flex-col lg:flex-row gap-2 w-full relative p-2 lg:p-20 lg:py-10'
            >
                <h2 className='text-center font-bold text-white'>Loading...</h2>   
            </section>
        )
    }
    return (
        <div className='flex flex-col w-full'>
            <Navbar />
            <HeroSection />
            {
                movies? (
                    <section className='flex flex-col lg:flex-row gap-2 w-full p-2 lg:p-20 lg:py-10 relative'>
                    <Filter />
                    <div className='w-full'>
                        <h2 className='text-3xl text-white pl-2 mb-10'>Results ({movies?.length})</h2>
                        <MovieList 
                        />
                    </div>
                </section>
                ): null
            }
        </div>
    )
}
