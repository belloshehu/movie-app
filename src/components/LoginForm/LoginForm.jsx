import axios from 'axios'
import React, {useState} from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { localLogin } from '../../features/auth/authSlice'
import FormError from '../FormError/FormError'
import './LoginForm.css'
import FormInputError from '../FormInputError/FormInputError'



const LoginForm = () => {
    const dispatch = useDispatch()
    const {userLoading, message, user} = useSelector( store => store.auth) 
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Email is required'),
            password: Yup.string().min(8, "Must be at least 8 characters").required("Password required")
            .matches(/[a-z]+/, "Must contain atleast one lowercase character")
            // .matches(/[A-Z]+/, "One uppercase character")
            // .matches(/[@$!%*#?&]+/, "One special character")
            .matches(/\d+/, "Must contain atleast one number")
        }),
        onSubmit: async(values) => {
            dispatch(localLogin(values))
        }
    })

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
                <button 
                    className='p-2 text-white text-center my-2 rounded-md'
                    type='submit'
                    >Submit
                </button> 
            </form>
        </div>
    )
}

export default LoginForm