import React from 'react'
import { FaFacebook, FaGoogle } from 'react-icons/fa'
import './Login.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
import LoginForm from '../../components/LoginForm/LoginForm'
import Brand from '../../components/Brand/Brand'

const Login = () => {
    const [user, setUser] = useState(null)
    const facebookLogin = async() => {
        window.open('http://localhost:5000/auth/facebook', '_self')
    }
    const googleLogin = async() => {
        console.log('logging with google')
        window.open('http://localhost:5000/auth/google', '_self')
    }
  return (
    <div className='login'>
        <Brand />

        <article>
           <LoginForm />
           <div className='flex justify-between'>
                <p>Have no account?</p>
                <Link to={'/signup'} className='underline'>Signup</Link>
           </div>
        </article>

        <article className='social-auth'>
            <h3 className=''>Login with</h3>
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
                    onClick={facebookLogin}
                >
                    <FaFacebook />
                    <p>Facebook</p>
                </button>
            </div>
        </article>
        
    </div>
  )
}

export default Login