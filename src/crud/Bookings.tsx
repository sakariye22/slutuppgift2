import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import UserList from './GetUser';
import DeleteAllDoneBookings from './DeleteAll';
import NewBookingForm from './Newbook'


interface Booking {
    uuid: string;
    date2:string;
    tid: string;
    Städare: string;
    services: 'Basic' | 'Topp' | 'Diamant' | 'Fonster';
    Isdone: boolean;
    user: string;
    _id: string;
    tidString : string;
    isSelected: boolean; 

  }
  


  
const BookingList2 = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [doneBookings, setDoneBookings] = useState<Booking[]>([]);
  const [checkedBookings, setCheckedBookings] = useState([]);
  

 

  

  
  const handleBookingDone = async (booking: Booking) => {
  const updatedBooking = {
    ...booking,
    Isdone: true
  };

  await axios.patch(`http://localhost:7000/cleaner/${booking._id}`, updatedBooking);
  setDoneBookings([...doneBookings, updatedBooking]);
  setBookings(bookings.filter((b) => b._id !== booking._id));
};

const handleDeleteBooking = async (id: string) => {
  try {
    await axios.delete(`http://localhost:7000/cleaner/${id}`);
    setBookings((bookings) => bookings.filter((b) => b._id !== id));
  } catch (error) {
    console.error('Failed to delete booking:', error);
  }
};
const handleDeleteBooking2 = (id:string) => {
  const updatedBookings = doneBookings.filter((booking) => booking._id !== id);
  setDoneBookings(updatedBookings);
};
function handleDeleteButtonClick(id: string) {
  handleDeleteBooking(id);
  handleDeleteBooking2(id);
};
function handleDeleteAllClick() {
  DeleteAllDoneBookings();

}; 

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


const idsToDelete = ['641d666fe32505073ea1cbdc'];
deleteBookings(idsToDelete)
  .then((data) => {
    console.log("yes");
  })
  .catch((error) => {
    console.error(error);
  });


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
  const idsToDelete = doneBookings
  .filter((booking) => booking.isSelected)
  .map((booking) => booking._id);

if (idsToDelete.length === 0) {
  return;
}

try {
  await deleteBookings(idsToDelete);
  const remainingBookings = doneBookings.filter(
    (booking) => !idsToDelete.includes(booking._id)
  );
  setDoneBookings(remainingBookings);
} catch (error) {
  console.error('Error deleting bookings:', error);
}
};














 
useEffect(() => {
  const fetchBookings = async () => {
    const response = await axios.get<Booking[]>('http://localhost:7000/cleaner/');
    const sortedBookings = response.data.sort((a, b) => {
      return new Date(a.date2).getTime() - new Date(b.date2).getTime();
    });
    console.log(sortedBookings);
    const doneBookings = sortedBookings.filter((booking) => booking.Isdone);
    setDoneBookings(doneBookings);
    setBookings(sortedBookings.filter((booking) => !booking.Isdone));
  };

  fetchBookings();
}, []);


const handleFormSubmit = (newBooking: Booking) => {
 
  setBookings([...bookings, newBooking]);
};
function handleUpdateBooking (updatedBooking: Booking) {
  const updatedBookings = bookings.map(booking => {
    if (booking._id === updatedBooking._id) {
      return updatedBooking;
    } else {
      return booking;
    }
  });
  setBookings(updatedBookings);
}






  const styles = {
    heading: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '20px',
    },
    list: {
      listStyle: 'none',
      padding: '0',
      margin: '0',
    },
    listItem: {
      marginBottom: '20px',
      border: '1px solid #ccc',
      padding: '10px',
    },
    bookingInfo: {
      margin: '0',
    },
    bookingLabel: {
      fontWeight: 'bold',
      marginRight: '10px',
    }
  };

  
  
 const Tiden = new Date();

  return ( 
     
    <div> 
      <h1 style={styles.heading}><UserList></UserList></h1>
      <NewBookingForm></NewBookingForm>
      <div className="App">
      <h1>Booking Form</h1>
      
      
    </div>
      <h2 style={styles.heading}> Uppkommande bokningar  </h2>
      <ul>
        {bookings.map((booking) => (
          <li key={booking.uuid} style = {styles.listItem}>
            <h2> </h2> 
            <p>Date: { (new Date(booking.date2)).toLocaleDateString() }</p>
            <p>Tid : {(new Date (booking.tid).getHours()+ ':' + new Date(booking.tid).getMinutes())}</p>
            <p>Städare: {booking.Städare}</p>
            <p>Service: {booking.services}</p>
            <button onClick={() => handleBookingDone(booking)}>
            <p>Slutfört {booking.Isdone ? 'Yes' : 'No'}</p>
          </button>
          <button onClick={() => handleDeleteBooking(booking._id)}> <FontAwesomeIcon icon={faTrash} /></button>
          </li>
        ))}
       
   </ul> 
<h2>Utförda</h2>

<div>
      <button onClick={handleDeleteSelected}>
        <FontAwesomeIcon icon={faTrash} /> Delete Selected
      </button>
      {doneBookings.map((booking) => (
        <div key={booking.uuid} style={styles.listItem}>
          <label style={styles.bookingInfo}>
            <input
              type="checkbox"
              checked={booking.isSelected}
              onChange={() => handleCheckboxChange(booking._id)}
            /> 
            <p style={styles.bookingLabel}>Date:</p>
            <p>{booking.date2}</p>
            <p>{booking.date2}</p>
            <p style={styles.bookingLabel}>Time:</p>
            <p>{booking.tidString}</p>
            <p style={styles.bookingLabel}>Städare:</p>
            <p>{booking.Städare}</p>
            <p style={styles.bookingLabel}>Service:</p>
            <p>{booking.services}</p>
          </label>
        </div>
      ))}
    </div>








    </div>
  );
};

export default BookingList2;
