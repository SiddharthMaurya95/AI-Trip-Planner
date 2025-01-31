import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
function UserTripCardItem({trip}) {
      const [PhotoUrl,setPhotoUrl]=useState();
      useEffect(()=>{
        trip&&GetPlacePhoto();
      },[trip])
      const GetPlacePhoto=async()=>{
    const apiKey = 'AIzaSyC6djmjWYtnw1MVMNP3FWNMQyWMflouDkU'; 
    const cseId = 'd1c83c96ff1f344e7'; 
    const searchTerm = trip?.userSelection?.location;
    
    const apiUrl = `https://customsearch.googleapis.com/customsearch/v1?q=${searchTerm}&cx=${cseId}&key=${apiKey}&searchType=image`;
    
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        if (data.items && data.items.length > 0) {
          const firstImage = data.items[0];
          const PhotoUrl=firstImage.link;
          setPhotoUrl(PhotoUrl);
        } else {
          console.log('No images found.');
        }
      })
      .catch(error => console.error('Error:', error));
      }
    return (
        <Link to={'/view-trip/'+trip?.id}>
        <div className='hover:scale-105 transition-all h-[220px]'>
      <img src={PhotoUrl?PhotoUrl:'https://placehold.co/600x400'} alt=""  className='object-cover rounded-xl mt-10' />
      <div>
        <h2 className='font-bold text-lg'>{trip?.userSelection?.location}</h2>
        <h2>{trip?.userSelection?.noOfDays} Days of Trip with {trip?.userSelection?.budget} budget</h2>
      </div>
    </div></Link>
  )
}

export default UserTripCardItem
