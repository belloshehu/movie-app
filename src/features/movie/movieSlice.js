import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
import { getRandomText } from '../../utils/randomText'

const url = 'https://www.omdbapi.com/?s=fury&apikey=a954465c'

export const getSingleMovie = createAsyncThunk(
    'movie/getSingleMovie',
    async(movieID, thunkAPI) =>{
        try{
            const movie = await axios (`https://www.omdbapi.com/?i=${movieID}&apikey=a954465c`)
            return movie
        }catch(error){
            console.log(error)
            thunkAPI.rejectWithValue('Something went wrong')
        }
    }
)

export const getMovies = createAsyncThunk(
    'movie/getMovies',
    async(searchKey, thunkAPI) =>{
        if(!searchKey){
            searchKey = getRandomText()
        }
        try{
            const movies = await axios (`https://www.omdbapi.com/?s=${searchKey}&apikey=a954465c`)
            thunkAPI.dispatch(setFilters(movies.data.Search))
            return movies.data.Search
        }catch(error){
            console.log(error)
            thunkAPI.rejectWithValue('Something went wrong')
        }
    }
)
const movieSlice = createSlice({
    name: 'movie',
    initialState: {
        isLoading: true, 
        movies: [],
        selectedMovie: null,
        errorMessage: '',
        filters: {Year: {}, Type: {}},
    },
    reducers: {
        setFilters: (state, {payload}) => {
            // create set of filters from movies object
            const filters = {
                Type:  Array.from(new Set(payload.map(movie => movie.Type))),
                Year: Array.from(new Set(payload.map(movie => movie.Year)))
            }
            state.filters = filters
        }
    },
    extraReducers: {
        [getMovies.pending]:  (state, action) => {
            state.isLoading = true
        },
        [getMovies.fulfilled]: (state, action) => {
            state.isLoading = false
            state.movies = action.payload
        },
        [getMovies.rejected]: (state, action) => {
            state.isLoading = false
            state.errorMessage = action.payload
        },
        [getSingleMovie.pending]: (state, action) => {
            state.isLoading = true
        }, 
        [getSingleMovie.fulfilled]: (state, action) =>{
            state.isLoading = false
            state.selectedMovie = action.payload
        },
        [getSingleMovie.rejected]: (state, action) => {
            state.isLoading = true
        }
    }

})
export const {setFilters} = movieSlice.actions
export default movieSlice.reducer