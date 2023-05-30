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
        removeAllPlaces : (state, action) =>{
            state.places = []
        },
        removeUserPlaces : (state, action) =>{
            state.userPlaces = []
        },
        addUserPlaces : (state, action) =>{
            const place = action.payload
            state.userPlaces.push(...place)
        },
        updateUserPlace : (state, action) =>{
            const id = action.payload._id
            const place = action.payload
            const placeIndex = state.userPlaces.findIndex(place => place._id == id)
            state.userPlaces.splice(placeIndex,1, place)
        }
    }
})


export const {addAllPlaces, removeAllPlaces, addUserPlaces, removeUserPlaces, updateUserPlace} = placesSlice.actions

export default placesSlice.reducer

export const selectPlaces = (store) => store.places.userPlaces
export const selectAllPlaces = (store) => store.places.places
export const selectSinglePlace = (store, id) => store.places.places.find(place => place._id === id)