import { useState } from 'react';
import React from 'react';
import BookingList2 from './Bookings';

const deleteBookings = async (ids: string[]) => {
  const response = await fetch('http://localhost:7000/cleaner/', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ids: ids })
  });
  const data = await response.json();
  return data;
}

interface Booking {
  _id: string;
  date2: string;
  tidString: string;
  Städare: string;
  services: string;
  isSelected: boolean;
}

const Bookings = () => {
  const [doneBookings, setDoneBookings] = useState<Booking[]>([
    {
      _id: '641d666fe32505073ea1cbdc',
      date2: '2022-01-01',
      tidString: '09:00 - 11:00',
      Städare: 'Cleaner 1',
      services: 'Cleaning service',
      isSelected: false
    },
    {
      _id: '641d666fe32505073ea1cbdd',
      date2: '2022-01-02',
      tidString: '09:00 - 11:00',
      Städare: 'Cleaner 2',
      services: 'Cleaning service',
      isSelected: false
    }
  ]);

  const handleCheckboxChange = (id: string) => {
    
    const updatedBookings = doneBookings.map((booking) => {
      if (booking._id === id) {
        return { ...booking, isSelected: !booking.isSelected };
      }
      return booking;
    });
    setDoneBookings(updatedBookings);
  };

  const handleDeleteSelected = async () => {
    // find selected bookings' ids
    const selectedIds = doneBookings.filter((booking) => booking.isSelected).map((booking) => booking._id);
    // delete selected bookings
    try {
      await deleteBookings(selectedIds);
      
      const updatedBookings = doneBookings.filter((booking) => !booking.isSelected);
      setDoneBookings(updatedBookings);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button onClick={handleDeleteSelected}>
        Delete Selected
      </button>
      {doneBookings.map((booking) => (
        <div key={booking._id}>
          <label>
            <input
              type="checkbox"
              checked={booking.isSelected}
              onChange={() => handleCheckboxChange(booking._id)}
            />
            <span>{booking.date2}</span>
          </label>
        </div>
      ))}
    </div>
  );
};

