
const useLink = () => {
    const baseURL = import.meta.env.VITE_API_BASE_URL

    const placeURL = '/places'
    const bookingURL = '/booking'
    const userPlaceURL = '/places/user'
    const imagesURL = `${baseURL}/uploads/`
    const refreshURL = "/auth/refresh"
    const placesPhotoURL = "/upload/by-link"; 
    const uploadPhotoURL = "/upload/direct";
    const removePhotoURL = "/upload/remove";
    
  return {baseURL, refreshURL, imagesURL, placeURL, userPlaceURL, placesPhotoURL, uploadPhotoURL, removePhotoURL, bookingURL}
}

export default useLink