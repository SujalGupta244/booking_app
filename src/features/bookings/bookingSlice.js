import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    bookings:[]
}

const bookingSlice = createSlice({
    name:'bookings',
    initialState,
    reducers:{
        addBookings: (state, action) =>{
            const bookings = action.payload
            state.bookings.push(...bookings)
        },
        removeAllBookings: (state, action) =>{
            state.bookings = []
        },
        removeBooking: (state, action) =>{
            state.bookings = state.bookings.filter(booking => booking._id !== action.payload)
        },
    }
})

export default bookingSlice.reducer

export const {addBookings, removeAllBookings, removeBooking} = bookingSlice.actions

export const selectCurrentBookings = (store) => store.booking.bookings


