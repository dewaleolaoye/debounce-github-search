// import { useState } from 'react';

const Search = () => {
  // const [user, setUser] = useState([]);

  const handleSearch = async (e) => {
    const query = e.target.value;
    const page = 10;

    const API = `https://api.github.com/search/users?q=${query}&per_page=${page}`;
    try {
      const response = await fetch(API);

      const data = await response.json();
      console.log(data, 'RESULT');
    } catch (error) {
      console.log(error, 'ERROR');
    }
  };

  return (
    <div>
      <input
        onChange={handleSearch}
        type='text'
        placeholder='search github user'
      />
    </div>
  );
};

export default Search;
