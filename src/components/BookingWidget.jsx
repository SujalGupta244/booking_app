import {FaRupeeSign} from 'react-icons/fa'
import React, { useEffect, useState } from 'react'
import { differenceInCalendarDays } from 'date-fns'
import axios from 'axios'
import useLink from '../hooks/useLink'
import {useNavigate} from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const {bookingURL} = useLink()

const BookingWidget = (props) => {
    const {price, place} = props

    const {username} = useAuth()

    
    const navigate = useNavigate()
    
    const [bookingDetails, setBookingDetails] = useState({name: '' , mobileNo: '',checkIn: '', checkOut: '' , guests: 1})

    let numberOfNights = 0;

    if(bookingDetails){
        numberOfNights = differenceInCalendarDays(new Date(bookingDetails.checkOut), new Date(bookingDetails.checkIn))
    }

    const handleChange = (e) =>{
        const {name, value} = e.target        
        setBookingDetails(prev =>(
            {...prev, [name]: value}
        ))
    }

    const bookingPlaceRequest = async() =>{
        const response = await axios.post(bookingURL, {
            ...bookingDetails, place: place._id, price: (numberOfNights * price)
        })
        const data = await response.data 
        return data
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        bookingPlaceRequest()
        .then(booking => navigate(`/account/bookings`))
        
        // console.log(bookingDetails);
    }


    
    useEffect(()=>{
        setBookingDetails({...bookingDetails, name: username})
    },[username])

  return (
    <div className="bg-white shadow p-4 rounded-2xl">
        <div className='md:text-2xl text-center flex items-center justify-center'>
            Price: <FaRupeeSign/>{price} / per night
        </div>
        <div className="border rounded-2xl mt-4">
            <div className="md:flex">
                <div className="py-3 px-4 border-r flex-1">
                    <label >Check In: </label>
                    <input onChange={(e) => handleChange(e)} type="date" name="checkIn" value={bookingDetails.checkIn} />
                </div>
                <div className="py-3 px-4 flex-1">
                    <label >Check Out: </label>
                    <input onChange={(e) => handleChange(e)} type="date" name="checkOut" value={bookingDetails.checkOut} />
                </div>
            </div>
            <div className="py-3 px-4 border-t">
                <label >Number of Guests: </label>
                <input onChange={(e) => handleChange(e)} type="number" name="guests" value={bookingDetails.guests} />
            </div>

        </div>
        {numberOfNights > 0 &&(
            <div className="py-3 px-4 border-t">
                <label >Your Full Name: </label>
                <input onChange={(e) => handleChange(e)} type="text" name="name" value={bookingDetails.name} />
                <label >Mobile Number: </label>
                <input onChange={(e) => handleChange(e)}  type="tel" name="mobileNo" value={bookingDetails.mobileNo} />
            </div>
        )}
        <button onClick={handleSubmit} className='primary mt-4 flex justify-center gap-4'>
            Book this place
            {numberOfNights > 0 && (
                <span className='flex items-center'>
                    <FaRupeeSign/>{numberOfNights *price}
                </span>
            )}
        </button>
    </div>
  )
}

export default BookingWidget