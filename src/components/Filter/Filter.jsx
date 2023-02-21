import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { movies } from '../../data/data'
import FilterItem from '../FilterItem/FilterItem'

const Filter = () => {
    
    const {movies, filters, isLoading, errorMessage} = useSelector(store => store.movie)
    // const [filters, setFilters] = useState({genre: [], date: []})

    useEffect(() => {
        console.log(filters.Year)
    }, [movies])
    if(isLoading){
        return (
            <div>
                <h1>Loading filters</h1>
            </div>
        )
    }
    return (
        <div className='flex flex-col gap-2 p-2 lg:w-1/4'>
            {
                filters? (
                <>
                    <h3 
                        className='font-bold text-white'
                        >Filter by
                    </h3>
                    <div 
                        className='grid grid-cols-2 gap-2 text-white'
                        >
                        {
                            Object.keys(filters)?.map((key, index) =>
                                <div key={index}>
                                    <h3 
                                        className='bg-slate-200 text-indigo-900 p-2 rounded-t-md'
                                        >
                                            {key.slice(0, 1).toUpperCase()}{key.slice(1,)}
                                    </h3>
                                    <ul>
                                        {
                                            filters[key].map( (item, index)=> <FilterItem key={index} text={item}/>)
                                        }
                                    </ul>
                                </div>
                            )
                        }
                    </div>
                </>
                ):null
            }
        </div>
    )
}

export default Filter