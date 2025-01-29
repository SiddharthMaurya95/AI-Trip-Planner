import react from "react";
import react_dom from "react-dom";
export const SelectTravelesList=[{
    id:1,
    title:'Just Me',
    desc:'A sole traveles in exploration',
    icon:'🛹',
    people:'1'
},
{
    id:2,
    title:'A Couple',
    desc:'Two traveles in tandem',
    icon:'🎎',
    people:'2'  
},{
    id:3,
    title:'Family',
    desc:'A group of fun loving adv',
    icon:'💒',
    people:'3 to 5'
}]
export const SelectBudgetOptions=[{
    id:1,
    title:'Cheap',
    desc:'Stay conscious of costs',
    icon:'💵'
},{
    id:2,
    title:'Moderate',
    desc:'Keep cost on the average side',
    icon:'💰'
},{
    id:3,
    title:'Luxury',
    desc:'Dont worry about cost',
    icon:'💸'
}]
export const AI_PROMPT='Generate Travel Plan for Location: {location}, for {totalDays} Days for {traveler} with a {budget} budget, give me Hotels options list with HotelName, Hotel address, Price, hotel image url, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Place address, ticket Pricing, Time travel each of the location for {totalDays} days with each day plan with best time to visit each place in JSON format.'