import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    places : [],
    userPlaces : []
}

const placesSlice = createSlice({
    name: 'places',
    initialState,
    reducers: {
        addAllPlaces : (state, action) =>{
            const places = action.payload
            state.places.push(...places)
        },
        addUserPlaces : (state, action) =>{
            const place = action.payload
            state.userPlaces.push(...place)
        },
        updateUserPlace : (state, action) =>{
            const id = action.payload._id
            const place = action.payload
            state.userPlaces = state.userPlaces.filter(place => place._id != id)
            state.userPlaces.push(place)
        }
    }
})


export const {addAllPlaces, addUserPlaces, updateUserPlace} = placesSlice.actions

export default placesSlice.reducer

export const selectPlaces = (store) => store.places.userPlaces
export const selectAllPlaces = (store) => store.places.places
export const selectSinglePlace = (store, id) => store.places.places.filter(place => place._id === id)