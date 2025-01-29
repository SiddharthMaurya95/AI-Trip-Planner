import React from 'react'
import GooglePlacesAutoComplete from 'react-google-places-autocomplete'
function Footer() {
  return (
    <div className='my-7'>
      <h2 className='text-center text-gray-600'>
        Created By 23/CS/411
      </h2>
      <GooglePlacesAutoComplete apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}></GooglePlacesAutoComplete>
    </div>
  )
}

export default Footer
