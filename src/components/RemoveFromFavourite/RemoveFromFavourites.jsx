import React, {useState} from 'react'
import { FaHeartBroken, FaSpinner, FaTrash } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromFavorites } from '../../features/movie/movieSlice'

const RemoveFromFavourites = ({id}) => {

  const dispatch = useDispatch()
  const [isRemoving, setIsRemoving] = useState(false)

  const handleClick = async () =>{
    setIsRemoving(true)
      try {
        await dispatch(removeFromFavorites(id)).unwrap()
        setIsRemoving(false)
      } catch (error) {
        setIsRemoving(false)
        console.log(error)
      }
  }

  return (
    <div 
        className='flex gap-2 group p-2 rounded-md group-hover:bg-slate-500 hover:cursor-pointer'
        onClick={handleClick}
        >
        {
          isRemoving? (
              <>
                 <FaSpinner 
                    className='text-xl animate-spin'
                  />
                   <p className='opacity-0 group-hover:opacity-100 text-white'>Removing from favourites</p>
              </>
            ):(
              <>
                <FaTrash 
                    className='text-white shadow-sm group-hover:text-3xl'
                />
                <p className='opacity-0 group-hover:opacity-100 text-white'>Remove from favourites</p>
              </>
          )
        }
        
    </div>
  )
}

export default RemoveFromFavourites