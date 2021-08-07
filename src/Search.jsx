import { useState, useMemo } from 'react';
import debounce from 'lodash.debounce';

const Search = () => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    const query = e.target.value;
    const page = 12;

    if (e.target.value.length > 1) {
      setLoading(true);
      const API = `https://api.github.com/search/users?q=${query}&per_page=${page}`;
      try {
        const response = await fetch(API);

        const data = await response.json();

        setUser(data.items);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error, 'ERROR');
      }
    } else {
      setLoading(false);
      setUser([]);
    }
  };

  console.log(user, 'USER');

  const debouncedChangeHandler = useMemo(() => {
    return debounce(handleSearch, 1000);
  }, []);

  return (
    <div className='search'>
      <h1>Search for a github user</h1>
      <div>
        <input
          onChange={debouncedChangeHandler}
          type='text'
          placeholder='search github user'
        />
        {loading && <span>Loading...</span>}
      </div>
      <div className='search-result'>
        {user.length > 0
          ? user.map(({ avatar_url, login, id, html_url }) => (
              <div key={id}>
                <a href={html_url} target='_blank' rel='noopener noreferrer'>
                  <img src={avatar_url} alt={login} />
                </a>
                <p>{login}</p>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default Search;
