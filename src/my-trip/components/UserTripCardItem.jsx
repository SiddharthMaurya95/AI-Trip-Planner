import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { db,modifyDocument } from '../../service/firebaseConfig';
import { FaEllipsisVertical } from "react-icons/fa6";
import Dropdown from './dropDown';
import { getFirestore, doc, deleteDoc } from "firebase/firestore";
function UserTripCardItem({trip}) {
      const [PhotoUrl,setPhotoUrl]=useState();
      const[j,setJ]=useState(0);
      useEffect(()=>{
        trip&&GetPlacePhoto(0);
      },[trip])
      useEffect(()=>{
                      GetPlacePhoto(j);
                    },[j])
         const GetPlacePhoto=async(j)=>{
         if(j==0){
          try{ if(!trip?.locationImageUrl.startsWith("url")){
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
    const handleOnDelete=async()=>{
       await deleteDoc(doc(db, 'AItrips',trip?.id));
       window.location.reload();
    }
    return (
        <Link to={'/view-trip/'+trip?.id}>
        <div className='hover:scale-105 transition-all h-[220px] '>
      <img src={PhotoUrl?PhotoUrl:'https://placehold.co/600x400'} alt=""  className='object-cover rounded-xl mt-10 w-full h-48' 
      onError={e => {
    e.target.onerror = null; // Prevents infinite loop
     setJ(prevJ => prevJ + 1);
  }}/>
      <div>
        <div className='flex justify-between items-center mt-3'>
        <h2 className='font-bold text-lg'>{trip?.userSelection?.location}</h2>
        <div onClick={e => e.stopPropagation()}>
  <Dropdown handleOnDelete={handleOnDelete}>
    <FaEllipsisVertical />
  </Dropdown>
</div></div>
        <h2>{trip?.userSelection?.noOfDays} Days of Trip with {trip?.userSelection?.budget} budget</h2>
      </div>
    </div></Link>
  )
}

export default UserTripCardItem
