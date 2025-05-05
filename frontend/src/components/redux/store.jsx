import { configureStore } from "@reduxjs/toolkit";
import allJobsReducer from './slice/allJobsSlice'

export default configureStore ({
    reducer: {
        allJobsReducer:allJobsReducer,
    }

})