import React, {useEffect, useState} from 'react'
import Filter from '../../components/FilterContainer/FilterContainer'
import MovieList from '../../components/MovieList/MovieList'
import HeroSection from '../../components/HeroSection/HeroSection'
import SearchBar from '../../components/SearchBar/SearchBar'
import Navbar from '../../components/Navbar/Navbar'
import { useDispatch } from 'react-redux'
import axios from 'axios'

export const Home = () => {
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()

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
        <div className='flex flex-col'>
            <Navbar />
            <HeroSection />
            <SearchBar />
            <section className='flex flex-col lg:flex-row gap-2 w-full relative p-2 lg:p-20 lg:py-10'>
                <Filter />
                <MovieList 
                />
            </section>
        </div>
    )
}
