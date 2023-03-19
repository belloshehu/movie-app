import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
    name: 'modal', 
    initialState: {
        isOpen: false,
        isShowing: false, 
        modalMessage: ''
    }, 
    reducers: {
        openModal: (state, {payload}) =>{
            state.isShowing = true
            state.modalMessage = payload
        }, 
        closeModal: (state) =>{
            state.isShowing = false
            state.modalMessage = ''
        }, 
        openSidebar: (state) =>{
            state.isOpen = true
        }, 
        closeSidebar: (state) =>{
            state.isOpen = false
        },
        setModalMessage: (state, action) =>{
            state.modalMessage = action.payload
        } 
        
    }
})

export const {
    openModal, 
    closeModal, 
    openSidebar, 
    closeSidebar, 
    setModalMessage
} = modalSlice.actions
export default modalSlice.reducer