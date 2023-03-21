import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";


export const localLogin = createAsyncThunk(
    'auth/localLogin',
    async(values, thunkAPI) =>{
        try {
            const res = await axios.post(`${baseUrl()}/auth/login`, {
                email: values.email,
                password: values.password
            })
            return res.data
        } catch (error) {
            thunkAPI.rejectWithValue('Something went wrong')
            return error.response.data.msg
        }
    }
)
export const userLogout = createAsyncThunk(
    'auth/logout',
    async (arg, thunkAPI) =>{
        try {
            const res = await axios.get(`${baseUrl()}/auth/logout`, {
                headers: {
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            })
            return res.data
        } catch (error) {
            thunkAPI.rejectWithValue('logout failed')
        }
    }
)
export const localSignup = createAsyncThunk(
    'auth/localSignup',
    async(values, thunkAPI) => {
        try {
            const res = await axios.post(`${baseUrl()}/auth/signup`, {
                email: values.email,
                password: values.password,
                username: values.username
            })
            return res.data
        } catch (error) {
            thunkAPI.rejectWithValue('Something went wrong')
            return error.response.data.msg   
        }
    }
)
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: localStorage.getItem('user')? JSON.parse(localStorage.getItem('user')) : null, 
        userLoading: true, 
        message: ''
    },
    reducers: {
        setUser: (state, {payload}) => {
            state.user = payload
        }, 
        clearUser: (state) => {
            state.user = null
        },
        clearMessage: (state)=>{
            state.message = ''
        }
    }, 

    extraReducers: (builder) =>{
        builder
            .addCase(localLogin.pending,  (state) =>{
                state.userLoading = true
                state.message = 'Please wait...'
            })
            .addCase(localLogin.fulfilled,(state, action) => {
                if(action.payload.user){
                    state.userLoading = false
                    state.user = action.payload.user
                    state.message = action.payload.message
                    localStorage.setItem('user', JSON.stringify(action.payload.user))
                    localStorage.setItem('token', JSON.stringify(action.payload.token))
                }else{
                    state.message = action.payload
                }
            })
            .addCase(localLogin.rejected, (state, {payload}) => {
                state.userLoading = false
                state.message = 'Login failed'
            })
            .addCase(localSignup.pending, (state) =>{
                state.userLoading = true
            })
            
            // local signup
            .addCase(localSignup.fulfilled, (state, action) =>{
                state.userLoading = false
                if(action.payload.user){
                    state.userLoading = false
                    state.user = action.payload.user
                    state.message = action.payload.message
                }else{
                    state.message = action.payload
                }
            })
            .addCase(localSignup.rejected, (state) =>{
                state.userLoading = false
                state.message = 'Login failed'
            })

            // logout 

            .addCase(userLogout.pending, (state) =>{
                state.userLoading = true
            })
            .addCase(userLogout.fulfilled, (state) =>{
                state.userLoading = false
            })
            .addCase(userLogout.rejected, (state, action) => {
                state.message = action.payload
            })
    }
})

export const {setUser, clearUser, clearMessage} = authSlice.actions
export default authSlice.reducer