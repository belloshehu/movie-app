import {configureStore} from '@reduxjs/toolkit'
import authSlice from './features/auth/authSlice'
import movieSlice from './features/movie/movieSlice'

export const store = configureStore({
    reducer: {
        movie: movieSlice,
        auth: authSlice
    }
})