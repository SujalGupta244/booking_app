import React,{ useState } from 'react'
import {Routes , Route} from 'react-router-dom'
import './App.css'
import IndexPage from './components/IndexPage'
import Layout from './components/Layout'
import Login from './components/Login'
import Register from './components/Register'
import axios from 'axios'
import Account from './components/Account'
import useLink from './hooks/useLink'
import Places from './components/Places'
import PlacesForm from './components/PlacesForm'
import SinglePlace from './components/SinglePlace'
import Bookings from './components/Bookings'
import SingleBooking from './components/SingleBooking'


const {baseURL} = useLink()

axios.defaults.baseURL = baseURL

// Sends the cookie back to backend server
axios.defaults.withCredentials = true

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<IndexPage/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/account" element={<Account/>}/>
        <Route path="/account/bookings" element={<Bookings/>}/>
        <Route path="/account/bookings/:id" element={<SingleBooking/>}/>
        <Route path="/account/places" element={<Places/>}/>
        <Route path="/account/places/new" element={<PlacesForm/>}/>
        <Route path="/account/places/:id" element={<PlacesForm/>}/>
        <Route path="/place/:id" element={<SinglePlace/>}/>
      </Route>
    </Routes>
    
  )
}

export default App
