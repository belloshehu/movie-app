import React from 'react'

const FilterItem = ({text}) => {
  return (
    <li 
        className='text-white p-2 border-b-2 bg-slate-500 hover:bg-slate-400'>
        {text}
    </li>
  )
}

export default FilterItem