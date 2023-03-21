import React, {useState} from 'react'
import { useEffect } from 'react'
import { FaSearch } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { getMovies } from '../../features/movie/movieSlice'

const SearchBar = () => {
  const [searchKey, setSearchKey] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    const getData = setTimeout(() => {
      dispatch(getMovies(searchKey))
    }, 2000)

    return () => clearTimeout(getData)
  }, [searchKey])

  return (
    <form 
      className='w-full flex justify-center mt-1 p-4'
      onSubmit={(e)=>{e.preventDefault(true)}}
      >
      <div className='relative w-full lg:w-1/3 mx-auto animate-bounce hover:animate-none'>
        <input 
            type='search' 
            name='search'
            value={searchKey}
            onChange={(e)=>setSearchKey(e.target.value)}
            placeholder='Enter movie name...'
            className='p-4 px-4 text-indigo-900 rounded-md w-full border-2 outline-none shadow-md'
        />
        <FaSearch 
          className='absolute text-3xl top-4 right-5 text-indigo-900'
        />
      </div>  
    </form>
  )
}

export default SearchBar