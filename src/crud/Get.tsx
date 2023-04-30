import React from "react";
import useFetch from "react-fetch-hook";
import { useState } from "react";
import { useEffect } from "react";
import { profileEnd } from "console";



 
export default function GetAll() {
 
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  useEffect(() => {
    fetch(`http://localhost:7000/cleaner`)
      .then(response => response.json())
      .then((usefulData) => {
        console.log(usefulData);

     
        const returned = usefulData;
      

        setLoading(false);
        setData(usefulData);
    
      })
      .catch((e) => {
        console.error(`An error occurred: ${e}`)
      });
  }, []);


 
  return (
    <>
      <div className="">
        {loading && <p>Loading...</p>}
        {/*!loading && <><h1>hyes</h1></>*/}
      </div>
    </>
  )
}


function GetAll2 (){

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
}



function BookingList() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:7000/cleaner`)
      .then(response => response.json())
      .then(data => setBookings(data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div>
      <h1>Booking List</h1>
      <ul>
        
        
      </ul>
    </div>
  );
}
