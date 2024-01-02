import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSearch } from '../context/SearchContext';

const TopicsPage = () => {
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { searchQuery, updateSearchQuery } = useSearch();

  const [filteredTopics,setFilteredTopics]=useState(topics);

  const [query, setQuery] = useState('');

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
    }
  };

  const handle_search_change = (e) => {
    const query = e.target.value.toLowerCase();

    // Filter names based on the search query
    const filteredTopics = topics.filter((topic) =>
      topic.name.toLowerCase().includes(query)
    );

    // Update the filtered names and search query state
    setFilteredTopics(filteredTopics);
    setQuery(query);
  };

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await fetch('https://tanvirpythonanywhere.pythonanywhere.com/api/topics/');
        if (response.ok) {
          const data = await response.json();
          setTopics(data);

          setFilteredTopics(data);
        } else {
          console.error('Error fetching topics:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching topics:', error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopics();
  }, []);

  console.log(filteredTopics)

  return (
    <main className="create-room layout">
      <div className="container">
        <div className="layout__box">
          <div className="layout__boxHeader">
            <div className="layout__boxTitle">
              <Link to="/">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                  <title>arrow-left</title>
                  <path
                    d="M13.723 2.286l-13.723 13.714 13.719 13.714 1.616-1.611-10.96-10.96h27.625v-2.286h-27.625l10.965-10.965-1.616-1.607z"
                  ></path>
                </svg>
              </Link>
              <h3>Browse Topics</h3>
            </div>
          </div>

          <div className="topics-page layout__body">
            <form className="header__search">
              <label>
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                  <title>search</title>
                  <path
                    d="M32 30.586l-10.845-10.845c1.771-2.092 2.845-4.791 2.845-7.741 0-6.617-5.383-12-12-12s-12 5.383-12 12c0 6.617 5.383 12 12 12 2.949 0 5.649-1.074 7.741-2.845l10.845 10.845 1.414-1.414zM12 22c-5.514 0-10-4.486-10-10s4.486-10 10-10c5.514 0 10 4.486 10 10s-4.486 10-10 10z"
                  ></path>
                </svg>
                <input 
                  type="text"
                  placeholder="Search for topics" 
                  value={query}
                  onKeyPress={handleKeyPress}
                  onChange={handle_search_change}
                />
              </label>
            </form>

            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <ul className="topics__list">
                <li>
                  <Link to="/" className="active" onClick={() => updateSearchQuery('')}>
                    All <span>{topics.length}</span>
                  </Link>
                </li>
                {filteredTopics.map((topic) => (
                  <li key={topic.id}>
                    <Link to="/" onClick={() => updateSearchQuery(topic.name)}>{topic.name} <span>{topic.num_rooms}</span></Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default TopicsPage;
