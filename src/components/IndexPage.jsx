import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addAllPlaces, removeAllPlaces, selectAllPlaces } from '../features/places/placesSlice'
import useLink from '../hooks/useLink'
import PlaceItem from './PlaceItem'

const {baseURL, placeURL} = useLink()

const IndexPage = () => {
  // const options = {
  //   method: 'GET',
  //   url: 'https://airbnb19.p.rapidapi.com/api/v1/getLanguages',
  //   headers: {
  //     'X-RapidAPI-Key': '3de8159158msh96fa3756fb4eb38p10545fjsncee928ec8b48',
  //     'X-RapidAPI-Host': 'airbnb19.p.rapidapi.com'
  //   }
  // };
  
  // axios.request(options).then(function (response) {
  //   console.log(response.data);
  // }).catch(function (error) {
  //   console.error(error);
  // });
  
  const allPlaces = useSelector(selectAllPlaces)

  const dispatch = useDispatch()

  const getAllPlaces = async() =>{
    const res = await axios.get(placeURL)
    const data = await res.data
    dispatch(removeAllPlaces())
    dispatch(addAllPlaces(data))
    return data
  }
  
  useEffect(() =>{
    
    getAllPlaces()
    // .then(data => console.log(allPlaces))
  },[])

  return (
    <div className='grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8'>
      {allPlaces.length > 0 &&
      allPlaces.map((item, index) =>(
        <PlaceItem {...item} key={index}/>
      ))}
    </div>
  )
}

export default IndexPage