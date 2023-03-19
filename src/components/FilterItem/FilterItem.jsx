import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { filterByGenreAndDate } from '../../features/movie/movieSlice'

const FilterItem = ({text, type}) => {
  const [filter, setFilter] = useState({Date: '', Genre: ''}) 
  
  const dispatch = useDispatch()

  const handleClick = () =>{
    setFilter((prev)=>{
        return {...prev, [type]: text}}
    )
    dispatch(filterByGenreAndDate(filter)) 
  }
  return (
    <li 
        className='text-white p-2 border-b-2 bg-indigo-500 hover:bg-indigo-400 hover:text-md hover:px-4 w-full cursor-pointer transition-all duration-150'
        onClick={handleClick}
        >
        {text}
    </li>
  )
}

export default FilterItem