import React from 'react';
import { Link } from 'react-router-dom';
import { useSearch } from '../context/SearchContext';


const Topics = ({ topics }) => {

  const { searchQuery, updateSearchQuery } = useSearch();

  // Check if topics is defined before accessing its properties
  if (!topics) {
    // You can choose to render a loading indicator or a message here
    return <div>Loading...</div>;
  }

  return (
    <div className="topics">
      <div className="topics__header">
        <h2>Browse Topics</h2>
      </div>
      <ul className="topics__list">
        <li onClick={() => updateSearchQuery('')}>
          <a  className="active">
            All <span>{topics.length}</span>
          </a>
        </li>
        {topics.map((topic) => (
          <li key={topic.id} onClick={() => updateSearchQuery(topic.name)}>
            <a >{topic.name} <span>{topic.num_rooms}</span></a>
          </li>
        ))}
      </ul>
      <Link className="btn btn--link" to="/topics-page">
        More
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
          <title>chevron-down</title>
          <path d="M16 21l-13-13h-3l16 16 16-16h-3l-13 13z"></path>
        </svg>
      </Link>
    </div>
  );
};

export default Topics;
