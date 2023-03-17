import React from 'react'
import { FaCamera } from 'react-icons/fa'
import cinemaImage from '../../images/cinema.jpg'
import SearchBar from '../SearchBar/SearchBar'
import { useSelector } from 'react-redux'

const HeroSection = () => {
  const {movies, isLoading,} = useSelector(store => store.movie)

  return (
    <section
        className='flex flex-col w-full lg:flex-row justify-center text-slate-200' 
    >
      <div className='flex flex-col gap-5 relative'>
        <img src={cinemaImage} alt='cinema'  className='h-screen w-screen object-cover'/>
        <div className='flex flex-col gap-5 justify-center absolute w-full top-0 left-0 bg-black bg-opacity-60 h-screen'>
          <div className='flex gap-2 items-center justify-center'> 
            <h1
              className='text-3xl lg:text-7xl font-bold text-center text-indigo-400 animate-bounce'
            >Searching for movie made easy</h1>
          </div>
          <div className='w-full'>
            <p className='text-center lg:text-xl px-5 lg:px-20 mb-10'>
                Search for your favourite movies with ease and save them for later.
            </p>
            <SearchBar /> 
            <h2 className='text-center font-bold text-slate-300 text-2xl'>{movies?  movies?.length: 0} {movies?.length > 1? 'results found': 'result found'}</h2>
        </div>
        </div>
      </div>
     
    </section>
  )
}

export default HeroSection