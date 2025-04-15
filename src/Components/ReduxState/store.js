import { configureStore  } from '@reduxjs/toolkit';
import MovieReducer from './MovieSlice'
import CommonSlicer from './CommonSlicer'
export const store = configureStore({
    reducer:{
        movies:MovieReducer,
        dashboard:CommonSlicer
    }
})