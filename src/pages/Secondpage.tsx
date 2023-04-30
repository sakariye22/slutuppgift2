import React from 'react';
import GetAll from '../crud/Get';
import BookingList from '../crud/GetAll2';
import UserList from '../crud/GetUser';
import BookingList2 from '../crud/Bookings';
import './Second.css'
import Header from './Header';
import Footer from './Footer';




function SecondPage() {
  return (
    <div className="LandingPage">
       <Header/>
      <BookingList2></BookingList2>
     
  

   
     
    </div>
  );
}

export default SecondPage;