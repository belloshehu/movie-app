import React, {useState} from 'react'
import { FaSpinner, FaTrash } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { openModal, closeModal } from '../../features/modal/modalSlice'
import { removeFromFavorites } from '../../features/movie/movieSlice'

const RemoveFromFavourites = ({id, Title}) => {
  let timer = null
  const dispatch = useDispatch()
  const {user} = useSelector( store => store.auth)
  const [isRemoving, setIsRemoving] = useState(false)

  const navigate = useNavigate() 
  
  const handleClick = async () =>{
    setIsRemoving(true)

    if(user === null){
      navigate('/login', {replace: true})
    }
    else{
      try {
        await dispatch(removeFromFavorites(id)).unwrap()
        setIsRemoving(false)

        dispatch(openModal(`"${Title}" removed`))
        timer = setTimeout(()=>{
          dispatch(closeModal())
        }, 3000)

      } catch (error) {
        setIsRemoving(false)
        dispatch(openModal(`"${Title}" could not be saved. Try again`))
        timer = setTimeout(()=>{
          dispatch(closeModal())
        }, 3000)
      }
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