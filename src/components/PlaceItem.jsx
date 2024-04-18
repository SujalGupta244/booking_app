import React from 'react'
import useLink from '../hooks/useLink'
import {FaRupeeSign} from 'react-icons/fa'
import { Link } from 'react-router-dom'

const {baseURL} = useLink()


const Place = (props) => {
    const {_id,title ,images ,address ,description ,perks ,extraInfo ,checkIn ,checkOut ,maxGuests ,price} = props
  return (
    <Link  to={`/place/${_id}`} >
        <div className="bg-gray-500 mb-2 rounded-2xl flex">
        {images.length > 0 &&(
            <img className='rounded-2xl object-cover aspect-square' src={`${images[0]?.url}`} alt="" />
        )}
        </div>
        <h2 className="font-bold">{address}</h2>
        <h3 className="text-sm leading-4 text-gray-500">{title}</h3>
        <div className="flex gap-1 items-center mt-1">
            <FaRupeeSign/><span className='font-bold'>{price}</span> per Night
        </div>
    </Link>
  )
}

export default Place