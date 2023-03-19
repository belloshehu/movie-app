import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
import { baseUrl } from '../../utils/baseUrl'
import { getRandomText } from '../../utils/randomText'

const url = 'https://www.omdbapi.com/?s=fury&apikey=a954465c'

export const addToFavorites = createAsyncThunk(
    'movie/addToFavorites', 
    async(values, thunkAPI) => {
        try {
            const res = await axios.post(`${baseUrl()}/favorite`, {
                ...values,
            }, 
            {
                headers: {
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            }
            )
            return res.data
        } catch (error) {
            thunkAPI.rejectWithValue(error.data.msg)
        }
    }
)

export const removeFromFavorites = createAsyncThunk(
    'movie/removeFromFavorites',
    async(movieID, thunkAPI) =>{
        try {
            const res = await axios.delete(`${baseUrl()}/favorite/${movieID}`,{
                headers: {
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            })
            return res.data
        } catch (error) {
            thunkAPI.rejectWithValue('Something went wrong')
        }
    }
)

export const getAllFavorites = createAsyncThunk(
    'movie/getAllFavorites',
    async(args, thunkAPI) =>{
        try {
            const res = await axios.get(`${baseUrl()}/favorite`, {
                headers: {
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            })
            return res.data
        } catch (error) {
            thunkAPI.rejectWithValue(error.data.msg)
        }
    }
)

export const getSingleMovie = createAsyncThunk(
    'movie/getSingleMovie',
    async(movieID, thunkAPI) =>{
        try{
            const movie = await axios(`https://www.omdbapi.com/?i=${movieID}&plot=full&apikey=a954465c`)
            return movie.data
        }catch(error){
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
        filters: {Date: [], Genre: []},
        filter: {Date: '', Genre: ''},
        favourites: [],
        filteredMovies: [], 
        isAdding: false,
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
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMovies.pending,  (state, action) => {
                state.isLoading = true
            })
            .addCase(getMovies.fulfilled, (state, action) => {
                state.isLoading = false
                state.movies = action.payload
                state.filteredMovies = action.payload
            })
            .addCase(getMovies.rejected, (state, action) => {
                state.isLoading = false
                state.errorMessage = action.payload
            })
            .addCase(getSingleMovie.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(getSingleMovie.fulfilled, (state, action) =>{
                state.isLoading = false
                state.selectedMovie = action.payload
            })
            .addCase(getSingleMovie.rejected, (state, action) => {
                state.isLoading = false
            })

            // add to favorite life cycles:
            .addCase(addToFavorites.pending, (state, action) => {
                state.isAdding = true
                state.errorMessage = 'Adding wait ...'
            })
            .addCase(addToFavorites.fulfilled, (state, action) =>{
                if(action.payload.movie){
                    state.isAdding = false
                    state.favourites = [...state.favourites, action.payload.movie]
                    console.log(action.payload.movie)
                    state.errorMessage = 'Added'
                }else{
                    state.errorMessage = action.payload.data
                    console.log(action.payload.data)
                }
            })
            .addCase(addToFavorites.rejected, (state, action) => {
                state.isAdding = false
            })

            // get all favorites movies:
            .addCase(getAllFavorites.pending, (state, action) => {
                state.isLoading = true
                state.errorMessage = 'loading wait ...'
            })
            .addCase(getAllFavorites.fulfilled, (state, action) =>{
                if(action.payload.movies){
                    state.isLoading = false
                    state.favourites = action.payload.movies
                }else{
                    state.errorMessage = action.payload.data
                }
            })
            .addCase(getAllFavorites.rejected, (state, action) => {
                state.isLoading = false
            })

            // remove a favourite movie 
            .addCase(removeFromFavorites.pending, (state, action) => {
                state.isAdding = true
                state.errorMessage = 'Removing movie ...'
            })
            .addCase(removeFromFavorites.fulfilled, (state, action) =>{
                if(!action.payload.msg){
                    state.isAdding = false
                    state.favourites = state.favourites.filter(movie => movie._id !== action.payload.movie._id)
                }else{
                    state.errorMessage = action.payload.data
                }
            })
            .addCase(removeFromFavorites.rejected, (state, action) => {
                state.isAdding = false
            })
    }
})
export const {setFilters, filterByGenreAndDate} = movieSlice.actions
export default movieSlice.reducer