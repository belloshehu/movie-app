import React from 'react'
import { FaFacebook, FaGoogle } from 'react-icons/fa'
import './Signup.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
import LoginForm from '../../components/LoginForm/LoginForm'
import SignupForm from '../../components/SignupForm/SignupForm'
import Brand from '../../components/Brand/Brand'

const Signup = () => {
    const [user, setUser] = useState(null)
        const googleLogin = async() =>{
        console.log('logging with google')
        window.open('http://localhost:5000/auth/google', '_self')
    }
  return (
    <div className='signup'>
        <Brand />

        <article>
           <SignupForm />
           <div className='flex justify-between'>
                <p>Have an account?</p>
                <Link to={'/login'} className='underline'>Login</Link>
           </div>
        </article>

        <article className='social-auth'>
            <h3 className=''>Signup with</h3>
            <div className='flex justify-between gap-2'>
                <button 
                    className='social-auth-link bg-red-500'
                    onClick={googleLogin}
                >
                    <FaGoogle />
                    <p>Google</p>
                </button>
                <button 
                    className='social-auth-link bg-blue-500'
                    onClick={googleLogin}
                >
                    <FaFacebook />
                    <p>Facebook</p>
                </button>
            </div>
        
        </article>
    </div>
  )
}

export default Signup