import React from 'react'
import { Link } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { GetPlaceDetails } from './GlobalApi';
import { PHOTO_REF_URL } from './GlobalApi';
function HotelCardItem({trip,i}) {

     const [PhotoUrl,setPhotoUrl]=useState();
      useEffect(()=>{
        trip&&GetPlacePhoto();
      },[trip])
      const GetPlacePhoto=async()=>{
        const apiKey = 'AIzaSyAnlZmZbZXQKCP2sqEvrU40Vm4IesrQMuQ'; 
        const cseId = 'd1c83c96ff1f344e7'; 
        const searchTerm = trip?.tripData?.[0]?.hotelOptions?.[i]?.hotelName+","+trip?.tripData?.[0]?.hotelOptions?.[i]?.hotelAddress;
        
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
    <Link to={'https://www.google.com/maps/search/?api=1&query='+trip?.tripData?.[0]?.hotelOptions?.[i]?.hotelName+","+trip?.tripData?.[0]?.hotelOptions?.[i]?.hotelAddress} target='_blank'>
                <div className='hover:scale-105 transition-all cursor-pointer'>
            <img src= {PhotoUrl?PhotoUrl:'https://placehold.co/600x400'} className="rounded-lg h-[200px] w-full object-cover"alt="" />
            <div className='my-2 flex flex-col gap-2'>
               <h2 className='font-medium text-black'> {trip?.tripData?.[0]?.hotelOptions?.[i]?.hotelName}</h2>
               <h2 className='text-xs text-gray-500'>📍{trip?.tripData?.[0]?.hotelOptions?.[i]?.hotelAddress}</h2>
               <h2 className='text-sm text-black'>💵{trip?.tripData?.[0]?.hotelOptions?.[i]?.price}</h2>
               <h2 className='text-sm text-black'>⭐{trip?.tripData?.[0]?.hotelOptions?.[i]?.rating}</h2>
            </div>
           </div></Link>
  )
}

export default HotelCardItem;
