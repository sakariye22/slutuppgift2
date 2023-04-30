import React, { useState, useEffect } from 'react';
import axios from 'axios';

type BookingData = {
    uuid: string;
    date: Date;
    tid: string;
    städare: string;
    services: 'Basic' | 'Topp' | 'Diamant' | 'Fonster';
    isdone: boolean;
    user: string;
  };
  
  const BookingList = () => {
    const [bookings, setBookings] = useState<BookingData[]>([]);
  
    useEffect(() => {
      const fetchBookings = async () => {
        const response = await axios.get('http://localhost:7000/cleaner');
        console.log(response.data);
        setBookings(response.data);
      };
      fetchBookings();
    }, []);
    

    return (
        <div>
          <h1>Bookings</h1>
          <ul>
            {bookings.map((booking) => ( 
              <li key={booking.uuid}>
                <p></p>
                <p>{booking.tid}</p>
                <p>{booking.städare}</p>
                <p>{booking.services}</p>
                <p>{booking.isdone}</p>
                <p>{booking.user}</p>
              </li>
            ))}
          </ul>
        </div>
      );
    };

/*
interface BookingData {
  _id: string;
  uuid: string;
  date: string;
  time: string;
  custom: string;
  Städare: string;
  services: string;
  Isdone: boolean;
  
}

const BookingList = () => {
  const [bookings, setBookings] = useState<BookingData[]>([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const response = await axios.get('http://localhost:7000/cleaner');
      setBookings(response.data);
    };
    fetchBookings();
  }, []);

  return (
    <div>
      <h1>Bookings</h1>
      <ul>
        {bookings.map((booking) => (
          <li key={booking._id}>
            <p>Date: {booking.date}</p>
            <p>Time: {booking.time}</p>
          <p>User :</p>
            <p>Städare: {booking.Städare}</p>
            <p>Services: {booking.services}</p>
            <p>Isdone: {booking.Isdone ? 'Yes' : 'No'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};*/

export default BookingList;
