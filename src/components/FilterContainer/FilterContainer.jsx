import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { movies } from '../../data/data'
import Filter from '../Filter/Filter'
import FilterItem from '../FilterItem/FilterItem'

const FilterContainer = () => {
    
    const {movies, filters, isLoading, errorMessage} = useSelector(store => store.movie)
    // const [filters, setFilters] = useState({genre: [], date: []})

    useEffect(() => {
        console.log(filters.Year)
    }, [movies])
   
    return (
        <div className='flex flex-col gap-2 p-2 w-full lg:w-1/4'>
            {
                filters? (
                <>
                    <h3 
                        className='font-bold text-white'
                        >Filter by
                    </h3>
                    <div 
                        className='grid grid-cols-2 gap-2 text-white bg-indigo-500 h-fit p-2 lg:sticky lg:top-14'
                        >
                        {
                            Object.keys(filters)?.map((filterKey, index) =>
                                <Filter filterKey={filterKey} key={index}/>
                            )
                        }
                    </div>
                </>
                ):null
            }
        </div>
    )
}

export default FilterContainer