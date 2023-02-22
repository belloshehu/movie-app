import React from 'react'
import Filter from '../../components/FilterContainer/FilterContainer'
import MovieList from '../../components/MovieList/MovieList'
import HeroSection from '../../components/HeroSection/HeroSection'
import SearchBar from '../../components/SearchBar/SearchBar'

export const Home = () => {
  return (
    <div>
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
