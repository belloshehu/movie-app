import React, {useState} from 'react'
import { useEffect } from 'react'
import { FaSearch } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { getMovies } from '../../features/movie/movieSlice'

const SearchBar = () => {
  const [searchKey, setSearchKey] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getMovies(searchKey))
  }, [searchKey])

  return (
    <form 
      className='w-full flex justify-center mt-1 bg-indigo-900 p-4'
      >
      <div className='relative lg:w-1/3'>
        <input 
            type='search' 
            name='search'
            value={searchKey}
            onChange={(e)=>setSearchKey(e.target.value)}
            placeholder='Enter movie name...'
            className='p-2 px-4 rounded-full w-full border-2 outline-none shadow-md shadow-white'
        />
        <FaSearch 
          className='absolute top-3 right-5 text-indigo-900'
        />
      </div>  
    </form>
  )
}

export default SearchBar