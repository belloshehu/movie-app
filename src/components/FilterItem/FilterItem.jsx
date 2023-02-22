import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { filterByGenreAndDate } from '../../features/movie/movieSlice'

const FilterItem = ({text, type}) => {
  const [filter, setFilter] = useState({Date: '', Genre: ''}) 
  
  const dispatch = useDispatch()

  const handleClick = () =>{
    setFilter((prev)=>{
        return {...prev, [type]: text}}
    )
    dispatch(filterByGenreAndDate(filter)) 
  
  //  console.log('clicking..', filter)
  }
  return (
    <li 
        className='text-white p-2 border-b-2 bg-slate-500 hover:bg-slate-400'
        onClick={handleClick}
        >
        {text}
    </li>
  )
}

export default FilterItem