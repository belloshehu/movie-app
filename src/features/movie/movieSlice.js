import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

const url = 'https://www.omdbapi.com/?s=fury&apikey=a954465c'

export const getMovies = createAsyncThunk(
    'movie/getMovies',
    async(name, thunkAPI) =>{
        try{
            const movies = await axios (url)
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
        }
    }

})
export const {setFilters} = movieSlice.actions
export default movieSlice.reducer