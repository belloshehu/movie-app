import React from 'react'
import { FaCamera } from 'react-icons/fa'

const HeroSection = () => {
  return (
    <section
        className='flex flex-col lg:flex-row justify-center text-slate-200' 
    >
      <div className='flex flex-col gap-5'>
        <div className='flex gap-2 items-center'>
          <FaCamera
            className='text-7xl text-white'
          />
          <h1
            className='text-2xl lg:text-7xl font-bold text-white'
          >Movie Search</h1>
        </div>
        <p className='text-center text-xl'>
            Search for your favourite movies with ease and save them for later.
        </p>   
      </div>
     
    </section>
  )
}

export default HeroSection