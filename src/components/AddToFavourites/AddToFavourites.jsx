import React, {useState} from 'react'
import {FaHeart, FaSpinner} from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { openModal, closeModal } from '../../features/modal/modalSlice'
import { addToFavorites } from '../../features/movie/movieSlice'

const AddToFavourites = (props) => {

  const dispatch = useDispatch()
  const [isAdding, setIsAdding] = useState(false)
  let timer = null

  const handleClick = async () =>{
      setIsAdding(true)

      try {
        const res  = await dispatch(addToFavorites(props.movieProps)).unwrap()
        setIsAdding(false)
        
        dispatch(openModal(`"${props.movieProps.Title}" added`))
        timer = setTimeout(()=>{
          dispatch(closeModal())
        }, 3000)

      } catch (error) {
        setIsAdding(false)

        dispatch(openModal(`"${props.movieProps.Title}" could not be added`))
        timer = setTimeout(()=>{
          dispatch(closeModal())
        }, 3000)
      }
  }

  return (
    <div 
        className='flex gap-2 group p-2 rounded-md group-hover:bg-slate-500 hover:cursor-pointer'
          onClick={handleClick}
        >
        {
          isAdding? (
              <>
                <FaSpinner 
                  className='text-xl animate-spin'
                />
                <p className='opacity-0 group-hover:opacity-100 text-white'>Adding to Favourites</p>
              </>
            ):(
              <>
                <FaHeart 
                  className='text-white shadow-sm group-hover:text-3xl'
                />
                <p className='opacity-0 group-hover:opacity-100 text-white'>Add to Favourites</p>
              </>
          )
        }
        
    </div>
  )
}

export default AddToFavourites