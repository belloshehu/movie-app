import React from 'react'
import { useState } from 'react'
import FilterItem from '../FilterItem/FilterItem'
import { useSelector } from 'react-redux'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

const Filter = ({filterKey: key}) => {
    const {filters} = useSelector(store => store.movie)
    const [show, setShow] = useState(true)
    return (
        <div className='relative'>
            <h3 
                className='flex justify-between bg-slate-200 text-indigo-900 p-2 rounded-t-md'
                >
                    {key.slice(0, 1).toUpperCase()}{key.slice(1,)} 
                    <span 
                        className='text-xl font-bold px-2 text-indigo-900 hover:bg-slate-400 rounded-md'
                        onClick={()=> setShow(!show)}
                        >
                        {
                            show? (
                                <FaChevronUp/>
                            ) : <FaChevronDown/>
                        }
                    </span>
            </h3>
            {show? (
                <ul className='absolute z-10 w-full'>
                    {
                        filters[key].map( (item, index)=> <FilterItem key={index} text={item} type={key} />)
                    }
                </ul>
            ): null}
        </div>
    )
}

export default Filter