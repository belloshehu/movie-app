import {configureStore} from '@reduxjs/toolkit'
import authSlice from './features/auth/authSlice'
import modalSlice from './features/modal/modalSlice'
import movieSlice from './features/movie/movieSlice'

export const store = configureStore({
    reducer: {
        movie: movieSlice,
        auth: authSlice,
        modal: modalSlice
    }
})