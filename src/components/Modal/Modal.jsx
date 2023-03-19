import React from 'react'
import { useSelector } from 'react-redux'

const Modal = () => {
    const {modalMessage} = useSelector( store => store.modal)
    return (
        <div className='p-4 rounded-md text-black font-sm bg-white shadow-mg fixed bottom-2 left-2 w-fit h-fit'>{modalMessage}</div>
    )
}

export default Modal