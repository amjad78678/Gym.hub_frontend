import {configureStore} from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import appSlice from './slices/appSlice'
import dateRangeSlice from './slices/dateRangeSlice'


const store=configureStore({
    reducer:{

        auth:authSlice,
        app:appSlice,
        dateRange: dateRangeSlice
    }
})

export default store