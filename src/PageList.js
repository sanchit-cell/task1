import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PageList = ({ onPageSelect }) => {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    axios.get('https://task1-backend-chw7.onrender.com/api/pages')
      .then(response => {
        setPages(response.data.data);
      });
  }, []);

  const handleChange = (event) => {
    onPageSelect(event.target.value);
  };

  return (
    <div>
      <select onChange={handleChange}>
        <option value="">Select a page</option>
        {pages.map(page => (
          <option key={page.id} value={page.id}>{page.name}
          console.log({page.id})
          </option>
          
        ))}
      </select>
    </div>
  );
};

export default PageList;
