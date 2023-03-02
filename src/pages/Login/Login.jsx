import React from 'react'
import { FaGoogle } from 'react-icons/fa'
import './Login.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
import LoginForm from '../../components/LoginForm/LoginForm'

const Login = () => {
    const [user, setUser] = useState(null)
        const googleLogin = async() =>{
        console.log('logging with google')
        window.open('http://localhost:5000/auth/google', '_self')
        // try {
        //     const res =  await axios.get('http://localhost:5000/auth/google/', {
        //         headers: {
        //             "Content-Type": "application/json",
        //             'Access-Control-Allow-Origin': '*',
        //             }
        //     })
        //     // setUser(res)
        //     console.log(res.data)
        // } catch (error) {
        //     console.log(error)
        // }
    }
  return (
    <div className='login'>
        <article className='social-auth'>
            <h3 className='font-bold text-center '>Login with</h3>
            <div className='py-5'>
                <button 
                    className='social-auth-link bg-red-900'
                    onClick={googleLogin}
                >
                    <FaGoogle />
                    <p>Google</p>
                </button>
            </div>
        </article>
        <article>
           <LoginForm />
        </article>
    </div>
  )
}

export default Login