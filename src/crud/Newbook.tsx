import React, { useState ,useEffect} from 'react';
import axios from 'axios';

interface Booking {
  Städare: string;
  date2: Date;
  tid: string;
}


const NewBookingForm = () => {
  const [newBooking, setNewBooking] = useState({
    uuid: '',
    date2: '',
    tid: '',
    Städare: '',
    services: 'Basic',
    Isdone: false,
    user: '',
    _id: '',
    tidString: '',
    isSelected: false,
  });

  const [users, setUsers] = useState([]);
  const [cleaners, setCleaners] = useState([]);


  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get('http://localhost:7000/cleaner/users');
      setUsers(response.data);
      console.log(response.data[0].name);

      
      if (response.data.length > 0) {
        setNewBooking({
          ...newBooking,
          user: response.data[0].name, 
        });
      }
    };
    fetchUsers();
  }, []);
  
  useEffect(() => {
    const fetchCleaners = async () => {
      const response = await axios.get('http://localhost:7000/cleaner/stadare');
      setCleaners(response.data);
      console.log(response.data);
      if (response.data.length > 0) {
        setNewBooking({
          ...newBooking,
          Städare: response.data[0].name, 
        });
      }
    };
    fetchCleaners();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:7000/cleaner/',
        newBooking
      );
      console.log(response.data);
      setNewBooking({
        uuid: '',
        date2: '',
        tid: '',
        Städare: '',
        services: 'Basic',
        Isdone: false,
        user: '',
        _id: '',
        tidString: '',
        isSelected: false,
      });
    } catch (error) {
      console.error('Failed to create new booking:', error);
     
      
    }
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setNewBooking({
      ...newBooking,
      [name]: value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
    
      <div>
        <label htmlFor="date2">Date:</label>
        <input
          type="date"
          id="date2"
          name="date2"
          value={newBooking.date2}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="tid">Time:</label>
        <input
          type="text"
          id="tid"
          name="tid"
          value={newBooking.tid}
          onChange={handleChange}
        />
      </div>
      <div>
  <label htmlFor="Städare">Cleaner:</label>
  <select
    id="Städare"
    name="Städare"
    value={newBooking.Städare}
    onChange={handleChange}
  >
    {cleaners.map((cleaner) => (
      <option key={cleaner} value={cleaner}>
        {cleaner}
      </option>
    ))}
  </select>
</div>

      <div>
  <label>Services:</label>
  <div>
    <label>
      <input
        type="radio"
        name="services"
        value="Basic"
        checked={newBooking.services === 'Basic'}
        onChange={handleChange}
      />
      Basic
    </label>
  </div>
  <div>
    <label>
      <input
        type="radio"
        name="services"
        value="Topp"
        checked={newBooking.services === 'Topp'}
        onChange={handleChange}
      />
      Topp
    </label>
  </div>
  <div>
    <label>
      <input
        type="radio"
        name="services"
        value="Diamant"
        checked={newBooking.services === 'Diamant'}
        onChange={handleChange}
      />
      Diamant
    </label>
  </div>
  <div>
    <label>
      <input
        type="radio"
        name="services"
        value="Fonster"
        checked={newBooking.services === 'Fonster'}
        onChange={handleChange}
      />
      Fönster
    </label>
  </div>
</div>

      <div>
        <label htmlFor="user">User:</label>
        <input
          type="text"
          id="user"
          name="user"
          value={newBooking.user}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default NewBookingForm;
