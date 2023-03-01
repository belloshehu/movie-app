import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null
    },
    reducers: {
        setUser: (state, {payload}) => {
            state.user = payload
        }, 
        clearUser: (state, payload) => {
            state.user = null
        }
    }
})

export const {setUser, clearUser} = authSlice.actions
export default authSlice.reducer