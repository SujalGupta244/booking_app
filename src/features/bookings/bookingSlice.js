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
        }
    }
})

export default bookingSlice.reducer

export const {addBookings} = bookingSlice.actions

export const selectCurrentBookings = (store) => store.booking.bookings


