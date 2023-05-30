import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import useLink from "../hooks/useLink";
import AccountNav from "./AccountNav";
import Perks from "./Perks";
import PhotosUploader from "./PhotosUploader";
import { updateUserPlace } from "../features/places/placesSlice";

const {placeURL, userPlaceURL} = useLink()


const PlacesForm = () => {
  const { id } = useParams();

  const [placeDetails, setPlaceDetails] = useState({title: '', address: '', photoLink: '', description: '', extraInfo: '', checkIn: '', checkOut: '', maxGuests: 1, price : 100})

  const [perks, setPerks] = useState([])
  const [addedPhotos, setAddedPhotos] = useState([])

  const navigate = useNavigate()


  const dispatch = useDispatch()


  const preInput =(header, description) =>{
    return (
        <>
            <h2 className="text-2xl mt-4">{header}</h2>
            <p className="text-gray-500 text-sm">
              {description}
            </p>
        </>
    )
  }

  const handleChange = (e) =>{
    const {name, value} = e.target
    setPlaceDetails(
        prevState =>(
            {...prevState, [name]: value}
        )
    )
  }


  const updatePlaceSubmit = async() =>{
    const formData = {...placeDetails, perks, addedPhotos}
    const response = await axios.put(`${placeURL}/${id}`,{
      data: formData
    })
    const data = await response.data
    dispatch(updateUserPlace(data))
    return data
  }



  const handleSubmit = async(e) =>{
    e.preventDefault()

    if(id){
      updatePlaceSubmit()
      navigate("/account/places")
    }else{
      const formData = {...placeDetails, perks, addedPhotos}
      const response = await axios.post(userPlaceURL,{
        data: formData
      })
      const data = await response.data
      navigate("/account/places")
      // return data
    }

  }
  
  const loadPlace = async() =>{
    const response = await axios.get(`${placeURL}/${id}`)
    const data = await response.data
    return data
  }

  useEffect(()=>{
    if(!id){
      return
    }
    loadPlace()
    .then(data =>{
      const resp = {title: data.title, address: data.address, description: data.description, extraInfo: data.extraInfo, checkIn: data.checkIn, checkOut: data.checkOut, maxGuests: data.maxGuests, photoLink: '', price: data.price}
      console.log(data)
      setPlaceDetails(resp)
      setPerks(data.perks)
      setAddedPhotos(data.images)
    })

  },[id])



  
  return (
    <div>
        <AccountNav/>
        <div className="">
          <form onSubmit={handleSubmit}>
            {preInput('Title', 'Title for your place should be short and catchy')}
            <input
              type="text"
              placeholder="title, for example : my lovely apt"
              name="title"
              value={placeDetails.title}
              onChange={handleChange}
              />
            {preInput('Address', 'Address to your place')}
            <input
              type="text"
              placeholder="address, for example : my lovely apt"
              name="address"
              value={placeDetails.address}
              onChange={handleChange}
              
              />
            {preInput('Photos', 'more = better')}
            
            <PhotosUploader 
              placeDetails={placeDetails} 
              handleChange={handleChange} 
              setAddedPhotos={setAddedPhotos} 
              addedPhotos={addedPhotos} 
              setPlaceDetails={setPlaceDetails}
              id={id}
            />

            {preInput('Description', 'description of the place')}
            <textarea className="" rows="5" 
            name="description"
            value={placeDetails.description}
            onChange={handleChange}
              ></textarea>
            {preInput('Perks', 'select all the perks of your place')}
            <div className="grid grid-cols-2 mt-2 gap-2 md:grid-cols-3 lg:grid-cols-5">
              <Perks selected={perks} onChange={setPerks}/>
            </div>
            {preInput('Extra Info', 'house rules, etc')}
            <textarea rows="5" 
            name="extraInfo"
            value={placeDetails.extraInfo}
            onChange={handleChange}
              ></textarea>            
            {preInput('Check In & Out times, max Guests', 'add check in and out times, remember to have some time window for cleaning the room between guests')}
            <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
                <div>
                    <h3 className="mt-2 -mb-1">Check In time</h3>
                    <input type="text" placeholder="14:00" 
                        name="checkIn"
                        value={placeDetails.checkIn}
                        onChange={handleChange}
               />
                </div>
                <div>
                    <h3 className="mt-2 -mb-1">Check Out time</h3>
                    <input type="text" placeholder="11:00" 
                    name="checkOut"
                    value={placeDetails.checkOut}
                    onChange={handleChange}
                    />
                </div>
                <div>
                    <h3 className="mt-2 -mb-1">Max number of guests</h3>
                    <input type="number" 
                    name="maxGuests"
                    value={placeDetails.maxGuests}
                    onChange={handleChange}
                    />
                </div>
                <div>
                    <h3 className="mt-2 -mb-1">Price Per Night</h3>
                    <input type="number" 
                    name="price"
                    value={placeDetails.price}
                    onChange={handleChange}
                      />
                </div>
                
            </div>
            <button className="primary my-4">Save</button>
          </form>
        </div>
    </div>
  );
};

export default PlacesForm;
