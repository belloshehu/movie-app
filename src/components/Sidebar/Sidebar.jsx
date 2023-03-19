import React from 'react'
import { FaTimes } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { clearUser, userLogout } from '../../features/auth/authSlice'
import { closeSidebar } from '../../features/modal/modalSlice'
import Brand from '../Brand/Brand'

const Sidebar = () => {
    const {user} = useSelector( store => store.auth)
    const dispatch = useDispatch()

    const logout = () =>{
        try {
            dispatch(userLogout()).unwrap()
            document.cookie = null
            localStorage.removeItem('user')
            localStorage.removeItem('token')
            dispatch(clearUser())
            dispatch(closeSidebar())
        } catch (error) {
            console.log(error)
        }
      }

    return (
        <div className='visible lg:invisible bg-white w-[95%] fixed top-2 left-2 h-screen flex flex-col gap-5 p-3 py-10 z-50'>
            <FaTimes  
                className='text-3xl absolute -top-2 -right-2 shadow-lg text-white p-1 bg-indigo-900 rounded-full'
                onClick={()=> dispatch(closeSidebar())}
            />
            <Brand />
            <hr/>
            {
                user? (
                <div className='flex flex-col gap-2'>
                    <p className='text-center'>Hello, {user.username}</p>
                    <Link 
                        className='bg-indigo-900 p-2 text-white rounded-md mt-10 text-center'
                        onClick={logout}>Logout
                    </Link>
                </div>
                ):(
                <Link to='/login' 
                    onClick={()=>dispatch(closeSidebar())} 
                    className='bg-indigo-900 p-2 text-white rounded-md mt-10 text-center'
                    >Login
                </Link>
                )
            }
        </div>
    )
}

export default Sidebar