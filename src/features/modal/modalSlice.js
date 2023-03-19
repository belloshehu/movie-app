import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
    name: 'modal', 
    initialState: {
        isOpen: false,
        isShowing: false
    }, 
    reducers: {
        openModal: (state) =>{
            state.isShowing = true
        }, 
        closeModal: (state) =>{
            state.isShowing = false
        }, 
        openSidebar: (state) =>{
            state.isOpen = true
        }, 
        closeSidebar: (state) =>{
            state.isOpen = false
        }, 
        
    }
})

export const {openModal, closeModal, openSidebar, closeSidebar} = modalSlice.actions
export default modalSlice.reducer