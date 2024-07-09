import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PageList from './PageList';
import PageInsights from './PageInsights';
import './App.css';

axios.defaults.withCredentials = true;

const App = () => {
  const [user, setUser] = useState(false);
  const [selectedPageId, setSelectedPageId] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get('http://backend/api/current_user');
      setUser(response.data || false);
      console.log(response.data)
    };

    fetchUser();
  }, []);

  const renderContent = () => {
    if (user === null) {
      return <div>Loading...</div>;
    } else if (user === false) {
      return <a className="login-button" href="http://backend/auth/facebook">Login with Facebook</a>;
    } else {
      return (
        <div>
          <h1>Welcome, {user.name}</h1>
          <img src={user.picture} alt="Profile" />
          <a href="http://backend/api/logout">Logout</a>
          <PageList onPageSelect={setSelectedPageId} />
          {selectedPageId && <PageInsights pageId={selectedPageId} />}
        </div>
      );
    }
  };

  return (
    <div className="App">
      {renderContent()}
    </div>
  );
};

export default App;
