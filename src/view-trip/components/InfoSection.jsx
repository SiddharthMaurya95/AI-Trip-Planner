import React, { useEffect, useState } from 'react'
import { IoSend } from "react-icons/io5";
import { Button } from '../../components/ui/button';
import { GetPlaceDetails } from './GlobalApi';
import axios from "axios";
import { db,modifyDocument } from '../../service/firebaseConfig';
import {ref,set,update} from "firebase/database";
function InfoSection({trip}) {
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
    if (!trip?.locationImageUrl.startsWith("url")){
      throw new Error("");
    }
const searchTerm = trip?.userSelection?.location+" landscape photo"+" -map -logo -icon -drawing -cartoon";

const apiUrl = 'https://customsearch.googleapis.com/customsearch/v1?q='+searchTerm+'&cx='+import.meta.env.VITE_CSE_ID+'&key='+import.meta.env.VITE_GOOGLE_PLACE_API_KEY+'&searchType=image&imgSize=large';

fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    if (data.items && data.items.length > 0) {
      console.log(j)
      const firstImage = data.items[0];
      const PhotoUrl=firstImage.link;
      setPhotoUrl(PhotoUrl);
      modifyDocument('AItrips',trip?.id,{locationImageUrl:data});
    } else {
      console.log('No images found.');
    }
  })
  .catch(error => console.error('Error:', error));}catch(e){
    const data=trip?.locationImageUrl
         try{ const firstImage = data.items[0];
            const PhotoUrl=firstImage.link;
            setPhotoUrl(PhotoUrl);}
            catch(e){
              setPhotoUrl(data)
            }
  }}
   else if(j>0){
    console.log(j);
          const data=trip?.locationImageUrl
          const firstImage = data.items[j];
            const PhotoUrl=firstImage.link;
            setPhotoUrl(PhotoUrl);
        }
  else{
    const data=trip?.locationImageUrl
         try{ const firstImage = data.items[0];
            const PhotoUrl=firstImage.link;
            setPhotoUrl(PhotoUrl);}
            catch(e){
              setPhotoUrl(data)
            }
  }
  }
  return (
    <div>
      <img src={PhotoUrl?PhotoUrl:'https://placehold.co/600x400'} className="w-full h-[340px] object-cover rounded" alt="" 
      onError={e => {
    e.target.onerror = null; // Prevents infinite loop
     setJ(prevJ => prevJ + 1);
  }}/>
      <div className='flex justify-between items-center gap-2'>
      <div className='my-5 flex flex-col gap-2'>
        <h2 className='font-bold text-2xl'>
          {trip?.userSelection?.location}
        </h2>
        <div className='flex gap-3'>
          <h2 className='p-1 px-3 bg-gray-200 text-center rounded-full text-gray-500 text-xs md:text-md'>📅 {trip?.userSelection?.noOfDays} Days</h2>
          <h2 className='p-1 px-3 bg-gray-200 text-center rounded-full text-gray-500 text-xs md:text-md'>💲 Budget: {trip?.userSelection?.budget}</h2>
          <h2 className='p-1 px-3 bg-gray-200 text-center rounded-full text-gray-500 text-xs md:text-md'>✈ No. of Traveler: {trip?.userSelection?.traveler}</h2>
        </div>
      </div>
      <Button><IoSend /></Button>
      </div>
    </div>
  )
}

export default InfoSection;
