import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { selectSinglePlace } from '../features/places/placesSlice'
import useLink from '../hooks/useLink'
import BookingWidget from './BookingWidget'
import PlaceGallary from './PlaceGallary'
import { addBookings } from '../features/bookings/bookingSlice'
import axios from 'axios'
import { differenceInCalendarDays, format } from 'date-fns'
import { FaRegCreditCard, FaRegMoon, FaRupeeSign } from 'react-icons/fa'


const {bookingURL} = useLink()

const SinglePlace = () => {

    const {id} = useParams()
    
    const dispatch = useDispatch()
    
    const singlePlace = useSelector(store => selectSinglePlace(store, id))
    
    const [bookingDetails,setBookingDetails] = useState({});

    const {_id,title ,images ,address ,description ,perks ,extraInfo ,checkIn ,checkOut ,maxGuests ,price} = singlePlace ? singlePlace : JSON.parse(localStorage.getItem("place"))

    const fetchBookings = async() =>{
        const response = await axios.get(bookingURL)
        const data = await response.data
        // dispatch(addBookings(data))
        data.forEach(booking => {
            if(booking.place._id === _id){
                setBookingDetails(booking)
            }
            // console.log(booking.place,singlePlace);
        });
        return data;
    }
    

    useEffect(()=>{
        if(singlePlace && Object.keys(singlePlace).length){
            localStorage.setItem("place",JSON.stringify(singlePlace))
            console.log("change in place");
        }
        fetchBookings()
    },[])

    
    return (
        <div className='mt-8 bg-gray-100 px-8 pt-4 w-3/4 m-auto'>
            <h1 className='text-3xl'>{title}</h1>
            <a className='flex gap-1 my-3 block capitalize font-semibold underline' href={`https://maps.google.com/?q=${address}`} target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                {address}
            </a>
            <PlaceGallary {...(singlePlace || JSON.parse(localStorage.getItem('place')))} />
            {Object.keys(bookingDetails).length > 0 && (
                <div className="bg-white p-4 mt-4 rounded-2xl flex justify-between">
                    <div className="gap-2 py-2">
                        <h2 className="text-xl">Your Booking Information:</h2>
                        <div className="flex my-2">
                            <div className="flex gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                            </svg>

                            {format(new Date(bookingDetails.checkIn), 'yyyy-mm-dd')} 
                            </div>
                            &rarr; 
                            <div className="flex gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                            </svg>

                            {format(new Date(bookingDetails.checkOut), 'yyyy-mm-dd')}
                            </div>
                        </div>

                        <div className="flex items-center gap-1">
                        <FaRegMoon/>
                        {differenceInCalendarDays(new Date(bookingDetails.checkOut) , new Date(bookingDetails.checkIn))} nights
                        </div>
                    </div>
                    <div className="text-center bg-primary rounded-2xl p-4 text-white">
                        Total Price 
                        <div className="text-3xl flex items-center mt-2">
                            <FaRupeeSign />{bookingDetails.price}
                        </div>
                    </div>
                </div>
            )}
            <div className=" mb-8 grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8 mt-8">
                <div >
                    <div className="my-4">
                        <h2 className='font-semibold text-2xl'>Description</h2>
                        {description}
                    </div>
                    Check-in: {checkIn} <br />
                    Check-out: {checkOut} <br />
                    Max number of guests: {maxGuests} 
                </div>
                <div >
                    <BookingWidget place={singlePlace} price={price}/>
                </div>
            </div>
            <div className='bg-white -mx-8 px-8 py-8 border-t'>
                <h2 className='font-semibold text-2xl'>Extra Info</h2>
                <div className="text-sm text-gray-700 leading-5 myb-4 mt-2">{extraInfo}</div>
            </div>
        </div>
    )
}

export default SinglePlace