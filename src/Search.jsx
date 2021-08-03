import { useState, useMemo } from 'react';
import debounce from 'lodash.debounce';

const Search = () => {
  const [user, setUser] = useState([]);

  const handleSearch = async (e) => {
    const query = e.target.value;
    const page = 10;

    if (e.target.value.length > 1) {
      const API = `https://api.github.com/search/users?q=${query}&per_page=${page}`;
      try {
        const response = await fetch(API);

        const data = await response.json();

        setUser(data.items);
      } catch (error) {
        console.log(error, 'ERROR');
      }
    } else {
      setUser([]);
    }
  };

  console.log(user, 'USER');

  const debouncedChangeHandler = useMemo(() => {
    return debounce(handleSearch, 1000);
  }, []);

  return (
    <div>
      <input
        onChange={debouncedChangeHandler}
        type='text'
        placeholder='search github user'
      />

      {user.length > 0 ? (
        user.map(({ avatar_url, login, id }) => (
          <div key={id}>
            <img src={avatar_url} alt={login} />
          </div>
        ))
      ) : (
        <p>Search for a user</p>
      )}
    </div>
  );
};

export default Search;
