import React from 'react';
import { BrowserRouter as Router ,Routes, Route  } from 'react-router-dom';
import UserDetail from './components/UserDetails';
import UserDirectory from './components/UserDirectory';


function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route exact path="/" Component={<UserDirectory/>}/>
          <Route path="/user/:userId" Component={<UserDetail/>}/>
            
          
        </Routes>
      </div>
    </Router>
  );
}
export default App;