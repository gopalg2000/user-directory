
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './UserDirectory.css';

const UserDirectory = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users from the API
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => setUsers(data));
  }, []);
console.log(users.email,"users")
  return (


    <div className="user-directory-container">
      <h2 style={{textAlign:"center"}}> Directory</h2>
       {users?.map((user) => (
           <Link key={user?.id} className="user-card" to={{ pathname: `/user/${user.id}`, state: { user } }}>
           <div className="user-info">
              <p className="user-name">{`Name : ${user?.name}`}</p>
             </div>
            <div className="user-details ">
              <p>{`Post: ${users?.length || 0}`}</p>
            </div>
          </Link>
        ))}
       </div> 

    
  );
};

export default UserDirectory;


  