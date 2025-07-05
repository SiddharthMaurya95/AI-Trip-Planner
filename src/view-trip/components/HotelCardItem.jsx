import React from 'react'
import { Link } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { GetPlaceDetails } from './GlobalApi';
import { PHOTO_REF_URL } from './GlobalApi';
import { db,modifyDocument } from '../../service/firebaseConfig';
import {ref,set,update} from "firebase/database";
function HotelCardItem({trip,i}) {
  const[j,setJ]=useState(0);
     const [PhotoUrl,setPhotoUrl]=useState();
      useEffect(()=>{
        trip&&GetPlacePhoto(0);
      },[trip])
      useEffect(()=>{
        GetPlacePhoto(j);
      },[j])
       const GetPlacePhoto=async(j)=>{
        if(j==0){
          try{
            if(!trip?.tripData?.[0]?.hotelOptions?.[i]?.hotelImageUrl.startsWith("https://example.com")){
              throw new Error("");
            }
          const searchTerm = trip?.tripData?.[0]?.hotelOptions?.[i]?.hotelName+","+trip?.userSelection?.location+" -map -logo -icon -drawing -cartoon";
      const apiUrl = 'https://customsearch.googleapis.com/customsearch/v1?q='+searchTerm+'&cx='+import.meta.env.VITE_CSE_ID+'&key='+import.meta.env.VITE_GOOGLE_PLACE_API_KEY+'&searchType=image&imgSize=medium';
      
      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          if (data.items && data.items.length > 0) {
            const firstImage = data.items[0];
            const PhotoUrl=firstImage.link;
            setPhotoUrl(PhotoUrl);
            trip.tripData[0].hotelOptions[i].hotelImageUrl=data;
            
            modifyDocument('AItrips',trip?.id,{tripData:trip.tripData});
            console.log(trip);
          } else {
            console.log('No images found.');
          }
        })
        .catch(error => console.error('Error:', error));}catch(e){
           const data=trip?.tripData?.[0]?.hotelOptions?.[i]?.hotelImageUrl
         try{ const firstImage = data.items[0];
            const PhotoUrl=firstImage.link;
            setPhotoUrl(PhotoUrl);}
            catch(e){
              setPhotoUrl(data)
            }
        }}
        else if(j>0){
          console.log(j);
          const data=trip?.tripData?.[0]?.hotelOptions?.[i]?.hotelImageUrl
          const firstImage = data.items[j];
            const PhotoUrl=firstImage.link;
            setPhotoUrl(PhotoUrl);
        }
        else{
          const data=trip?.tripData?.[0]?.hotelOptions?.[i]?.hotelImageUrl
         try{ const firstImage = data.items[0];
            const PhotoUrl=firstImage.link;
            setPhotoUrl(PhotoUrl);}
            catch(e){
              setPhotoUrl(data)
            }
        }
        }

  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query='+trip?.tripData?.[0]?.hotelOptions?.[i]?.hotelName+","+trip?.tripData?.[0]?.hotelOptions?.[i]?.hotelAddress} target='_blank'>
                <div className='hover:scale-105 transition-all cursor-pointer'>
            <img src= {PhotoUrl?PhotoUrl:'https://placehold.co/600x400'} className="rounded-lg h-[200px] w-full object-cover"alt="" onError={e => {
    e.target.onerror = null; // Prevents infinite loop
     setJ(prevJ => prevJ + 1);
  }} />
            <div className='my-2 flex flex-col gap-2'>
               <h2 className='font-medium text-black'> {trip?.tripData?.[0]?.hotelOptions?.[i]?.hotelName}</h2>
               <h2 className='text-xs text-gray-500'>📍 {trip?.tripData?.[0]?.hotelOptions?.[i]?.hotelAddress}</h2>
               <h2 className='text-sm text-black'>💵 {trip?.tripData?.[0]?.hotelOptions?.[i]?.price}</h2>
               <h2 className='text-sm text-black'>⭐ {trip?.tripData?.[0]?.hotelOptions?.[i]?.rating} Stars</h2>
            </div>
           </div></Link>
  )
}

export default HotelCardItem;
