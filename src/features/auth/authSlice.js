import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token : null,
    ready: false
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        addUser : (state,action)=>{
            const {accessToken} = action.payload
            state.token = accessToken
            state.ready = true
        }
    }
})

export const {addUser} = authSlice.actions

export default authSlice.reducer

export const selectCurrentToken = (store) => store.auth.token
export const selectReady = (store) => store.auth.ready