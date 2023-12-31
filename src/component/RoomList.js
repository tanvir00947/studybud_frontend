import React, { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';
import { useSearch } from '../context/SearchContext';
import avatarImage from '../images/avatar.svg'



//jsljf dfslf sldfj kkldjf  lkdkfj
const RoomList = ({roomsData}) => {

  const { searchQuery,updateSearchQuery } = useSearch();

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
    }
  };

  const handleSearchChange = (e) => {
    e.preventDefault()
    updateSearchQuery(e.target.value);
  };

  if (!roomsData) {
    // You can choose to render a loading indicator or a message here
    return <div>Loading...</div>;
  }
    // const [roomsData, setRoomsData] = useState([]);

    // useEffect(() => {
    //   const fetchRooms = async () => {
    //     try {
          
          
  
    //       // Fetch additional data for each room
    //       const roomsWithDetails = await Promise.all(
    //         props.rooms.map(async (room) => {
    //           const hostResponse = await fetch(`http://127.0.0.1:8000/api/users/${room.host}`);
    //           const host = await hostResponse.json();
  
    //           const topicResponse = await fetch(`http://127.0.0.1:8000/api/topics/${room.topic}`);
    //           const topic = await topicResponse.json();
  
    //           return {
    //             ...room,
    //             host,
    //             topic,
    //           };
    //         })
    //       );
  
    //       setRoomsData(roomsWithDetails);
    //     } catch (error) {
    //       console.error('Error fetching rooms:', error);
    //     }
    //   };
  
    //   fetchRooms();
    // }, [props.rooms]);

  const filteredRooms = roomsData.filter((room) =>
    room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    room.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    room.topic_name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  

  return (
    <div className="roomList">
      <div className="mobile-menu">
        <form className="header__search">
          <label>
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
              <title>search</title>
              <path
                d="M32 30.586l-10.845-10.845c1.771-2.092 2.845-4.791 2.845-7.741 0-6.617-5.383-12-12-12s-12 5.383-12 12c0 6.617 5.383 12 12 12 2.949 0 5.649-1.074 7.741-2.845l10.845 10.845 1.414-1.414zM12 22c-5.514 0-10-4.486-10-10s4.486-10 10-10c5.514 0 10 4.486 10 10s-4.486 10-10 10z"
              ></path>
            </svg>
            <input 
              placeholder="Search for rooms..." 
              value={searchQuery}
              onKeyPress={handleKeyPress}
              onChange={handleSearchChange}
            />
          </label>
        </form>
        <div className="mobile-menuItems">
          <Link className="btn btn--main btn--pill" to="/topics-page">
            Browse Topics
          </Link>
          <Link className="btn btn--main btn--pill" to="/activities-page">
            Recent Activities
          </Link>
            {/* <button className="btn btn--main btn--pill">Browse Topics</button>
            <button className="btn btn--main btn--pill">Recent Activities</button> */}
        </div>
      </div>
      <div className="roomList__header">
        <div>
          <h2>Study Room</h2>
          <p>{filteredRooms.length} Rooms available</p>
        </div>
        <Link className="btn btn--main" to="/create-room">
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
            <title>add</title>
            <path d="M16.943 0.943h-1.885v14.115h-14.115v1.885h14.115v14.115h1.885v-14.115h14.115v-1.885h-14.115v-14.115z"></path>
          </svg>
          Create Room
        </Link>
      </div> 
      
      
      {filteredRooms.map((room) => {
        const { host_username, topic_name, name, private: isPrivate,created } = room;
        
        return (
            <div key={room.id} className="roomListRoom">
                <div className="roomListRoom__header">
                <Link to={`/user-profile/${room.host}`} className="roomListRoom__author">
                    <div className="avatar avatar--small">
                    <img src={avatarImage} alt="User" />
                    </div>
                    <span>@{host_username} </span>
                </Link>
                <div className="roomListRoom__actions">
                    <span>{formatDistanceToNow(created)} ago</span>
                </div>
                </div>
                <div className="roomListRoom__content">
                <Link to={`/rooms/${room.id}`}>{name} {isPrivate && <small>(private)</small>}</Link>
                {/* <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur ducimus harum dolorem, obcaecati
                    mollitia omnis quasi aut consequuntur enim itaque labore.
                </p> */}
                </div>
                <div className="roomListRoom__meta">
                <Link to={`/rooms/${room.id}`} className="roomListRoom__joined">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                    <title>user-group</title>
                    <path
                        d="M30.539 20.766c-2.69-1.547-5.75-2.427-8.92-2.662 0.649 0.291 1.303 0.575 1.918 0.928 0.715 0.412 1.288 1.005 1.71 1.694 1.507 0.419 2.956 1.003 4.298 1.774 0.281 0.162 0.456 0.487 0.456 0.85v4.65h-4v2h5c0.553 0 1-0.447 1-1v-5.65c0-1.077-0.56-2.067-1.461-2.584z"
                    ></path>
                    <path
                        d="M22.539 20.766c-6.295-3.619-14.783-3.619-21.078 0-0.901 0.519-1.461 1.508-1.461 2.584v5.65c0 0.553 0.447 1 1 1h22c0.553 0 1-0.447 1-1v-5.651c0-1.075-0.56-2.064-1.461-2.583zM22 28h-20v-4.65c0-0.362 0.175-0.688 0.457-0.85 5.691-3.271 13.394-3.271 19.086 0 0.282 0.162 0.457 0.487 0.457 0.849v4.651z"
                    ></path>
                    <path
                        d="M19.502 4.047c0.166-0.017 0.33-0.047 0.498-0.047 2.757 0 5 2.243 5 5s-2.243 5-5 5c-0.168 0-0.332-0.030-0.498-0.047-0.424 0.641-0.944 1.204-1.513 1.716 0.651 0.201 1.323 0.331 2.011 0.331 3.859 0 7-3.141 7-7s-3.141-7-7-7c-0.688 0-1.36 0.131-2.011 0.331 0.57 0.512 1.089 1.075 1.513 1.716z"
                    ></path>
                    <path
                        d="M12 16c3.859 0 7-3.141 7-7s-3.141-7-7-7c-3.859 0-7 3.141-7 7s3.141 7 7 7zM12 4c2.757 0 5 2.243 5 5s-2.243 5-5 5-5-2.243-5-5c0-2.757 2.243-5 5-5z"
                    ></path>
                    </svg>
                    {room.participants.length} Joined
                </Link>
                <p className="roomListRoom__topic">{topic_name}</p>
                </div>
            </div>
        );
      })}
    </div>
  );
};

export default RoomList;
