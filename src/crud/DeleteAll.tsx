import React from "react";

function DeleteAllDoneBookings() {
    fetch('http://localhost:7000/cleaner/', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        Isdone: true
      })
    })
      .then(response => {
        if (response.ok) {
          console.log('All done bookings deleted successfully.');
        } else {
          console.error('Failed to delete done bookings.');
        }
      })
      .catch(error => {
        console.error('Failed to delete done bookings:', error);
      });
  }
  export default DeleteAllDoneBookings;