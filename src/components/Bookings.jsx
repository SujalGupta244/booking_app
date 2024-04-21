import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentBookings, addBookings, removeAllBookings , removeBooking} from '../features/bookings/bookingSlice'
import useLink from '../hooks/useLink'
import AccountNav from './AccountNav'
import { Link } from 'react-router-dom'
import format from 'date-fns/format'
import { FaRegCreditCard, FaRegMoon, FaRupeeSign } from 'react-icons/fa'
import { differenceInCalendarDays } from 'date-fns'
const {bookingURL, imagesURL} = useLink()


const Bookings = () => {

    const currentBookings = useSelector(selectCurrentBookings)

    const dispatch = useDispatch();

    const fetchBookings = async() =>{
        const response = await axios.get(bookingURL)
        const data = await response.data
        dispatch(removeAllBookings())
        dispatch(addBookings(data))
        // console.log(data);
      }
      
      const deleteBooking = async(e, booking_id) =>{
        e.stopPropagation();
        e.preventDefault()
        const response = await axios.post(`${bookingURL}/delete`,{
          booking_id
        })

        dispatch(removeBooking(booking_id))
        console.log(response.data)
    }
    
    useEffect(()=>{
      fetchBookings()
    },[])

  return (
    <div>
      <AccountNav/>
      {currentBookings.length > 0 && 
        currentBookings.map(booking =>(
          <Link to={`/place/${booking.place._id}`} className="flex-row md:flex gap-4 bg-gray-200 rounded-2xl overflow-hidden mt-8" key={booking._id}>
            <div className="md:w-48">
            {booking.place.images.length > 0 &&
            booking?.place.images && (
              <img className='object-cover h-full rounded-md' src={`${booking.place.images[0].url}`} alt={booking.place.title} />
            )}
            </div>
            <div className='py-3 pr-3 grow mb-8 md:mb-0'>
              <h2 className='text-xl'>{booking.place.title}</h2>
              <div className=" flex gap-2 border-t border-gray-300 mt-2 py-2">
                <div className="flex gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                  </svg>

                  {format(new Date(booking.checkIn), 'yyyy-mm-dd')} 
                </div>
                &rarr; 
                <div className="flex gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                  </svg>

                  {format(new Date(booking.checkOut), 'yyyy-mm-dd')}
                </div>
              </div>
              <div className="md:text-xl md:flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <FaRegMoon />
                    {differenceInCalendarDays(new Date(booking.checkOut) , new Date(booking.checkIn))} nights
                  </div>
                  |
                  <div className="flex items-center gap-1 md:text-xl">
                    <FaRegCreditCard />
                    Total Price: <FaRupeeSign />{booking.price}
                  </div>
                </div>
                <button className='mt-3 py-1 px-4 rounded-full bg-primary text-white' onClick={(e)=>deleteBooking(e, booking._id)}>delete</button>
              </div>
            </div>
          </Link>
        ))
      }  
    </div>
  )
}

export default Bookings