import React, {useState} from 'react'
import { FaBars, FaChevronDown, FaChevronUp, FaHeart, FaUser } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { clearUser, userLogout } from '../../features/auth/authSlice'
import { openModal, closeModal } from '../../features/modal/modalSlice'
import Favourites from '../Favourites/Favourites'
import './Navbar.css'

const Navbar = () => {
  const {user} = useSelector(store => store.auth)
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()
  const logout = () =>{
    try {
        dispatch(userLogout()).unwrap()
        document.cookie = null
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        dispatch(clearUser())
        dispatch(closeModal())
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <header className='header text-white flex justify-between items-center p-2 bg-indigo-500 lg:px-20'>
        <FaBars 
          className='text-2xl text-white visible lg:hidden' 
          onClick={()=> dispatch(openModal())} />
        <Link 
          className='text-center text-3xl font-bold'
          to='/'
        >
            <span className='bg-white text-indigo-900 p-2 shadow-lg shadow-black rounded-md'>M</span>Moviex
        </Link>
        <div 
          className='lg:flex gap-2 items-center hidden lg:visible relative'
        >
          {
            user? (
              <div className='flex gap-1 items-center'>
                  <FaUser className='text-4xl shadow-xl'/>
                  <p>{user.username}</p>
                  {
                    open? <FaChevronUp onClick={()=> setOpen(false)}/> : <FaChevronDown onClick={()=> setOpen(true)}/> 
                  }
                  {
                    open? (
                      <div className='flex flex-col gap-3  w-full h-fit absolute top-16 left-0 z-50  p-5 bg-slate-100'>
                        <div className='flex items-center gap-2 text-indigo-900'>
                          <FaUser className='text-3xl'/>
                          <p>{user.username}</p>
                        </div>
                        <hr />
                        <Link 
                          className='text-center bg-indigo-400 p-2 rounded-md shadow-xl' 
                          onClick={logout}
                        >Logout</Link>

                      </div>
                    ):null
                  }
              </div>
            ):(
              <Link to='/login' className='bg-indigo-900 p-2 rounded-md'>Login</Link>
            )
          }
          <Favourites />
        </div>
    </header>
  )
}

export default Navbar