import React from 'react'

const FormError = ({message}) => {
    return (
        <div className='my-2 flex justify-center bg-slate-300'>
            {
                message? (
                    <p className='text-center text-red-500'>{message}</p>
                ): null
            }
        </div>
    )
}

export default FormError