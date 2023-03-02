import axios from 'axios'
import React, {useState} from 'react'

const LoginForm = () => {
    const [values, setValues] = useState({
        email: '',
        password: ''
    })

    const [inputError, setInputError] = useState({
        email: false,
        password: false
    })
    const handleChange = (e)=>{
        console.log(values)
        setValues((prev) => { return {...prev, [e.target.name]: e.target.value}})
    }

    const isValidForm = () =>{
        return values.email && values.password.length >= 8
    }
    const submitForm = async()=>{
        try {
            const res = await axios.post('http://localhost:5000/auth/login', {
                email: values.email,
                password: values.password
            })
            console.log(res.data)
        } catch (error) {
            console.log(error)
        }
    }
    const handleSubmit = (e)=>{
        e.preventDefault(true)
        if(isValidForm()){
            submitForm()
        }else{
            console.log('invalid form')
        }
    }

  return (
    <div>
         <form onSubmit={handleSubmit}>
            <div className='form-group'>
                <label htmlFor='email'>Email</label>
                <input 
                    name='email'
                    type='email' 
                    id='email'
                    value={values.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className='form-group'>
                <label htmlFor='password'>Password</label>
                <input 
                    name='password'
                    type='password'
                    id='password'
                    minLength={8}
                    value={values.password}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className='bg-indigo-900 p-2 text-white text-center my-2 rounded-md'>
                <input 
                    type='submit' 
                    value={'submit'}    
                /> 
            </div>
    
        </form>
    </div>
  )
}

export default LoginForm