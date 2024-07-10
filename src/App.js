import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PageList from './PageList';
import PageInsights from './PageInsights';
import './App.css';

axios.defaults.withCredentials = 'include';

const App = () => {
  const [user, setUser] = useState(false);
  const [selectedPageId, setSelectedPageId] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get('https://task1-backend-chw7.onrender.com/api/current_user');
      setUser(response.data || false);
      console.log(response.data)
    };

    fetchUser();
  }, []);

  const renderContent = () => {
    if (user === null) {
      return <div>Loading...</div>;
    } else if (user === false) {
      return <a className="login-button" href="https://task1-backend-chw7.onrender.com/auth/facebook">Login with Facebook</a>;
    } else {
      return (
        <div>
          <h1>Welcome, {user.name}</h1>
          <img src={user.picture} alt="Profile" />
          <a href="https://task1-backend-chw7.onrender.com/api/logout">Logout</a>
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
