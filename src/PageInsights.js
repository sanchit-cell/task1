import React, { useState } from 'react';
import axios from 'axios';

const PageInsights = ({ pageId }) => {
  const [insights, setInsights] = useState(null);
  const [since, setSince] = useState('');
  const [until, setUntil] = useState('');

  const fetchInsights = () => {
    axios.get(`http://backend/api/page-insights/${pageId}?since=${since}&until=${until}`)
      .then(response => {
        if (response.data.data.length > 0) {
          // Process and display insights data
          setInsights(response.data.data);
          console.log(response.data.data)
        } else {
          alert('No insights data available for the specified period');
        }
        
      })
      .catch(error => {
        console.error('Error fetching page insights:', error);
        alert('Failed to fetch page insights. Please try again later.');
      });
  };  

  return (
    <div>
      <div>
        <label>
          Since:
          <input type="date" value={since} onChange={(e) => setSince(e.target.value)} />
        </label>
        <label>
          Until:
          <input type="date" value={until} onChange={(e) => setUntil(e.target.value)} />
        </label>
        <button onClick={fetchInsights}>Get Insights</button>
      </div>
      {insights && (
        <div>
          <div>Total Followers: {insights[0].values[0].value}</div>
          <div>Total Engagement: {insights[1].values[0].value}</div>
          <div>Total Impressions: {insights[2].values[0].value}</div>
          <div>Total Reactions: {insights[3].values[0].value}</div>
        </div>
      )}
    </div>
  );
};

export default PageInsights;
