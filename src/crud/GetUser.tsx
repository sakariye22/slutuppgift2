import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

/*
const styles = {
  backgroundColor: 'red',
  color: 'white',
  padding: '10px',
  borderRadius: '5px',
  
};*/
const titleStyle = {
  fontSize: '2rem',
  fontWeight: 'bold',
  marginBottom: '1rem',
};



type User = {
  _id: string;
  name: string;
};

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get<User[]>('http://localhost:7000/cleaner/users/');
      setUsers(response.data);
    };
    fetchUsers();
  }, []);

  return (
    <div>
      
      <ul>
        {users.map((user) => (
          <h1 key={user._id}>  <h1>    {user.name}<span className="text">
            <Link to={`/bookings/${user._id}`}></Link> </span></h1>  
           
          </h1>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
