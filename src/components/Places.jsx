import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeUserPlaces, selectPlaces } from '../features/places/placesSlice';
import useLink from '../hooks/useLink';
import AccountNav from './AccountNav';
import PlacesForm from './PlacesForm';
import { addUserPlaces } from "../features/places/placesSlice";
import axios from 'axios';


const {baseURL, imagesURL ,userPlaceURL} = useLink()

const Places = () => {

  const places = useSelector(selectPlaces) 

  const dispatch = useDispatch()

  const loadPlaces = async() =>{
    const response = await axios.get(userPlaceURL)
    const data = await response.data
    dispatch(removeUserPlaces())
    dispatch(addUserPlaces(data))
  }


  useEffect(()=>{
    loadPlaces()
  },[])

  return (
    <div>
      <AccountNav/>
        <div className="text-center">
          <Link
            className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
            to="/account/places/new"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add new Place
          </Link>
        </div>
        <div className="mt-4">
          {!!places.length &&
          places.map((place, index) => (
            <Link key={index} to={`/account/places/${place._id}`} className='cursor-pointer flex gap-4 bg-gray-100 p-4 rounded-2xl'>
              <div className="flex w-32 h-32 bg-gray-300 shrink-0">
                {!!place.images && (
                  <img className='object-cover' src={`${place.images[0]}`} alt={place.title} />
                )} 
              </div>
              <div className="grow-0 shrink">
                <h2 className='text-xl '>{place.title}</h2>
                <p className='text-sm mt-2'>{place.description}</p>
              </div>

            </Link>
          )) 
          }
        </div>
    </div>
  )
}

export default Places