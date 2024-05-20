import {FaRupeeSign} from 'react-icons/fa'
import React, { useEffect, useState } from 'react'
import { differenceInCalendarDays } from 'date-fns'
import axios from 'axios'
import useLink from '../hooks/useLink'
import {useNavigate} from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { PayPalButtons } from "@paypal/react-paypal-js";

const {bookingURL, createPayURL, capturePayURL} = useLink()

const BookingWidget = (props) => {
    const {price, place} = props

    const {username} = useAuth()
    const now = new Date();
    const navigate = useNavigate()
    
    const [bookingDetails, setBookingDetails] = useState({name: '' , mobileNo: '',checkIn: '', checkOut: '' , guests: 1})

    let numberOfNights = 0;
    
    if(bookingDetails.checkIn && bookingDetails.checkOut &&
        differenceInCalendarDays(new Date(bookingDetails.checkIn) , new Date()) >= 0 && 
        differenceInCalendarDays(new Date(bookingDetails.checkOut) , new Date(bookingDetails.checkIn)) >= 0){
        numberOfNights = differenceInCalendarDays(new Date(bookingDetails.checkOut), new Date(bookingDetails.checkIn))
        if(!username) alert("Please Login for booking");

        // console.log(bookingDetails.checkIn , now.getDate() , bookingDetails.checkOut , bookingDetails.checkIn)

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
        console.log(username)
        bookingPlaceRequest()
        .then((booking) => navigate(`/account/bookings`))
        
        // console.log(bookingDetails);
    }


    
    useEffect(()=>{
        setBookingDetails({...bookingDetails, name: username})
    },[username])



    const createOrder = async ()=> {
        const resp = await axios.post(createPayURL, {
            product:{
                    id: "YOUR_PRODUCT_ID",
                    quantity: "YOUR_PRODUCT_QUANTITY",
                    cost: numberOfNights * price
                },
            },
            {
            headers: {
                "Content-Type": "application/json",
            }
        })
        const data = await resp.data;
        return data.id;
    }
    
    const onApprove = async(data) => {
        const resp = await axios.post(capturePayURL, {
              orderID: data.orderID
            })
        //   .then((response) => response.json())
        //   .then((orderData) => {
        //         const name = orderData.payer.name.given_name;
        //         alert(`Transaction completed by ${name}`);
        //   })
        const respData = await resp.data;
        console.log(respData)
        // handleSubmit()
        bookingPlaceRequest()
        .then((booking) => navigate(`/account/bookings`))
        return respData;

    }


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
        {numberOfNights <= 0 &&
        <button className='primary mt-4 flex justify-center gap-4 mb-2'>
                Book this place
        </button>}
        {numberOfNights > 0 && username && (
            <div className='bg-primary text-white rounded-md text-center p-2 mb-2 text-2xl flex items-center justify-center'>
                <FaRupeeSign />{numberOfNights *price}
            </div>
        )}
        {numberOfNights > 0 && username && 
        <PayPalButtons
            createOrder={createOrder}
            onApprove={onApprove}
        />}
    </div>
  )
}

export default BookingWidget