import { configureStore } from "@reduxjs/toolkit";
import allJobsReducer from './slice/allJobsSlice'
import tokenReducer from './slice/tokenSlice'

export default configureStore ({
    reducer: {
        allJobsReducer:allJobsReducer,
tokenReducer:tokenReducer
    }

})