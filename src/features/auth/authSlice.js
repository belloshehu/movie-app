import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const localLogin = createAsyncThunk(
    'auth/localLogin',
    async(values, thunkAPI) =>{
        console.log('logging in ...: ', values)
        try {
            const res = await axios.post('http://localhost:5000/auth/login', {
                email: values.email,
                password: values.password
            })
            // console.log('from api:', res.data)
            return res.data
        } catch (error) {
            thunkAPI.rejectWithValue('Something went wrong')
            return error.response.data.msg
        }
    }
)

export const localSignup = createAsyncThunk(
    'auth/localSignup',
    async(values, thunkAPI) => {
        try {
            const res = await axios.post('http://localhost:5000/auth/signup', {
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
        user: null, 
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

    extraReducers: {
        [localLogin.pending]: (state) =>{
            state.userLoading = true
            state.message = 'Please wait...'
        }, 
        [localLogin.fulfilled]: (state, action) => {
            if(action.payload.user){
                state.userLoading = false
                state.user = action.payload.user
                state.message = action.payload.message
            }else{
                state.message = action.payload
            }
        },
        [localLogin.rejected]: (state, {payload}) => {
            state.userLoading = false
            state.message = 'Login failed'
        },
        [localSignup.pending]: (state) =>{
            state.userLoading = true
        },
        [localSignup.fulfilled]: (state, action) =>{
            state.userLoading = false
            if(action.payload.user){
                state.userLoading = false
                state.user = action.payload.user
                state.message = action.payload.message
            }else{
                state.message = action.payload
            }
        },
        [localSignup.rejected]: (state) =>{
            state.userLoading = false
            state.message = 'Login failed'
        }
    }
})

export const {setUser, clearUser, clearMessage} = authSlice.actions
export default authSlice.reducer