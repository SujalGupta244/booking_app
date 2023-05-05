import {configureStore} from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import bookingReducer from '../features/bookings/bookingSlice'
import placesReducer from '../features/places/placesSlice'

const store = configureStore({
    reducer:{
        auth: authReducer,
        places: placesReducer ,
        booking: bookingReducer     
    }
})


export default store