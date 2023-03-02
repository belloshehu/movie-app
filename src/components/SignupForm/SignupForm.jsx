import axios from 'axios'
import React, {useState, useEffect} from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { clearMessage, localLogin, localSignup } from '../../features/auth/authSlice'
import FormError from '../FormError/FormError'
import './LoginForm.css'
import FormInputError from '../FormInputError/FormInputError'
import { useNavigate } from 'react-router-dom'



const SignupForm = () => {
    const dispatch = useDispatch()
    const {userLoading, message, user} = useSelector( store => store.auth) 
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            passwordRepeat: '',
            username: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Email is required'),
            username: Yup.string().min(2, "Must be atlest 2 characters").required('Username is required'),
            password: Yup.string().min(8, "Must be at least 8 characters").required("Password required")
            .matches(/[a-z]+/, "Must contain atleast one lowercase character")
            // .matches(/[A-Z]+/, "One uppercase character")
            // .matches(/[@$!%*#?&]+/, "One special character")
            .matches(/\d+/, "Must contain atleast one number"),
            passwordRepeat: Yup.string().min(8, "Must be at least 8 characters").required("Password required")
            .matches(/[a-z]+/, "Must contain atleast one lowercase character")
            // .matches(/[A-Z]+/, "One uppercase character")
            // .matches(/[@$!%*#?&]+/, "One special character")
            .matches(/\d+/, "Must contain atleast one number")
        }),
        onSubmit: async(values) => {
            dispatch(clearMessage())
            dispatch(localSignup(values))
        }
    })

    useEffect(() => {
        dispatch(clearMessage())
    }, [])
    
    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <FormError message={message}/>
                <div className='form-group'>
                    <label htmlFor='email'>
                        Email<sup className='text-red-500 font-bold'>*</sup>
                    </label>
                    <input 
                        type='email' 
                        id='email'
                        {...formik.getFieldProps('email')}
                    />
                    <FormInputError 
                        isTouched={formik.touched.email}
                        errorMessage={formik.errors.email}
                    />
                </div>

                <div className='form-group'>
                    <label htmlFor='email'>
                        username<sup className='text-red-500 font-bold'>*</sup>
                    </label>
                    <input 
                        type='text' 
                        id='username'
                        {...formik.getFieldProps('username')}
                    />
                    <FormInputError 
                        isTouched={formik.touched.username}
                        errorMessage={formik.errors.username}
                    />
                </div>
            
                <div className='form-group'>
                    <label htmlFor='password'>
                        Password<sup className='text-red-500 font-bold'>*</sup>
                    </label>
                    <input 
                        type='password'
                        id='password'
                        {...formik.getFieldProps('password')}
                    />
                    <FormInputError 
                        isTouched={formik.touched.password}
                        errorMessage={formik.errors.password}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='passwordRepeat'>
                        Password repeat<sup className='text-red-500 font-bold'>*</sup>
                    </label>
                    <input 
                        type='password'
                        id='passwordRepeat'
                        {...formik.getFieldProps('passwordRepeat')}
                    />
                    <FormInputError 
                        isTouched={formik.touched.passwordRepeat}
                        errorMessage={formik.errors.passwordRepeat}
                    />
                </div>
                <button 
                    className='p-2 text-white text-center my-2 rounded-md'
                    type='submit'
                    >Submit
                </button> 
            </form>
        </div>
    )
}

export default SignupForm