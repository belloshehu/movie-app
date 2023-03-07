import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
import { getRandomText } from '../../utils/randomText'

const url = 'https://www.omdbapi.com/?s=fury&apikey=a954465c'

export const getSingleMovie = createAsyncThunk(
    'movie/getSingleMovie',
    async(movieID, thunkAPI) =>{
        try{
            const movie = await axios(`https://www.omdbapi.com/?i=${movieID}&plot=full&apikey=a954465c`)
            return movie.data
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
            const movies = await axios.get(`https://www.omdbapi.com/?s=${searchKey}&apikey=a954465c`)
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
        filters: {Date: {}, Genre: {}},
        filter: {Date: '', Genre: ''},
        favourites: [],
        filteredMovies: []
    },
    reducers: {
        setFilters: (state, {payload}) => {
            // create set of filters from movies object
            const filters = {
                Genre:  Array.from(new Set(payload.map(movie => movie.Type))),
                Date: Array.from(new Set(payload.map(movie => movie.Year)))
            }
            state.filters = filters
        },
        filterByGenreAndDate: (state, {payload}) => {
            const {Genre:genre, Date:date} = payload
            console.log(genre, date)
            if(genre === '' && date === '') return
           else if(genre === ''){
                state.filteredMovies = state.movies.filter( movie => 
                    movie.Year === date
                )
           }else if(date === ''){
                state.filteredMovies = state.movies.filter( movie => 
                    movie.Type === genre
                )
           }else{
                state.filteredMovies = state.movies.filter( movie => 
                    movie.Type === genre && movie.Year === date
                )
           }
           console.log(state.filteredMovies)
        },
    },
    extraReducers: {
        [getMovies.pending]:  (state, action) => {
            state.isLoading = true
        },
        [getMovies.fulfilled]: (state, action) => {
            state.isLoading = false
            state.movies = action.payload
            state.filteredMovies = action.payload
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
            state.isLoading = false
        }
    }

})
export const {setFilters, filterByGenreAndDate} = movieSlice.actions
export default movieSlice.reducer