// UserDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, Link ,useLocation } from 'react-router-dom';
import './UserDetails.css';
const fetchData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};
const UserDetail = () => {
  const { userId } = useParams();
  const [data,setData]=useState([])
  const [user, setUser] = useState(null);
  const [clock, setClock] = useState(new Date());
  const [clockPaused, setClockPaused] = useState(false);
useEffect(() => {
    // Fetch user details and posts from the API
    const fetchUserDetails = async () => {
      const userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
      const userJson = await userResponse.json();
      
      const postsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
      const postsJson = await postsResponse.json();
     

      
      setUser({
        ...userJson,
        posts: postsJson,
      });
    };

    fetchUserDetails();
  }, [userId]);
  useEffect(() => {
    // Fetch users from the API
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => setData(data));
  }, []);

  // Fetch current time based on the user's selected country
  const fetchCurrentTime = async () => {
    const currentTimeUrl = `http://worldtimeapi.org/api/timezone/${user.timezone}`;
    const currentTime = await fetchData(currentTimeUrl);
    setClock(new Date(currentTime.utc_datetime));
  };

  // Handle clock start/pause button click
  const handleClockToggle = () => {
    setClockPaused(!clockPaused);
  };

  // Update clock every second
  useEffect(() => {
    const interval = setInterval(() => {
      if (!clockPaused) {
        setClock(new Date(clock.getTime() + 1000));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [clock, clockPaused]);
  return (
    <div className="user-detail">
      {user && (
        <>
          <div className="page-section">
            <Link to="/" >
              <button className="back-button">Back</button>
            </Link>
            <select className="country-dropdown" onChange={fetchCurrentTime}>
              <option value="" disabled selected>Select Country</option>
              {data?.map((country) => (
                <option key={country?.address?.city} value={country?.address?.city}>
                  {country?.address?.city}
                </option>
              ))}
            </select>
            <div className="clock-section">
              <p>{` ${clock.toLocaleTimeString()}`}</p>
              <button className="clock-toggle" onClick={handleClockToggle}>
                {clockPaused ? 'Start Clock' : 'Pause Clock'}
              </button>
            </div>
          </div>
          {/* Add clock section here */}
          <h3 style={{ textAlign: "center" }}>Profile Page</h3>

          <div className="user-info-section">

            <div className="user-info">
              <div>
                <h3>Name</h3>
                <p>{user.name}</p>
              </div>
              <div>
                <h3>Username</h3>
                <p>{user.username}</p>
              </div>
              <div>
                <h3>Catch Phrase</h3>
                <p>{user.company.catchPhrase}</p>
              </div>
            </div>
            <div className="user-address">
              <div>
                <h3>Address</h3>
                <p>{`${user.address.street}, ${user.address.city}, ${user.address.zipcode}`}</p>
              </div>
              <div>
                <h3>Email</h3>
                <p>{user.email}</p>
              </div>
              <div>
                <h3>Phone</h3>
                <p>{user.phone}</p>
              </div>
            </div>
          </div>
          {/* Add posts section here */}
          <div className="user-posts-section">
            {user.posts.map(post => (
              <div key={post.id} className="post-card">
                <h3>{post.title}</h3>
                <p>{post.body}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default UserDetail;
