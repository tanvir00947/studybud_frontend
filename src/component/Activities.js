import React, { useEffect, useState,useContext } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import avatarImage from '../images/avatar.svg'

const Activities = ({messagesData}) => {

  const { user } = useContext(AuthContext);

  if (!messagesData) {
    // You can choose to render a loading indicator or a message here
    return <div>Loading...</div>;
  }

  // const [messagesData, setMessagesData] = useState([]);

  // useEffect(() => {

  //   const fetchMessages = async () => {
  //     try {
  //       // const response = await fetch('http://127.0.0.1:8000/api/messages/');
  //       // const messagesData = await response.json();

  //       // Fetch additional data for each message
  //       const messagesWithDetails = await Promise.all(
  //         props.messages.map(async (message) => {
  //           const userResponse = await fetch(`http://127.0.0.1:8000/api/users/${message.user}`);
  //           const user = await userResponse.json();

  //           const roomResponse = await fetch(`http://127.0.0.1:8000/api/rooms/${message.room}`);
  //           const room = await roomResponse.json();


  //           return {
  //             ...message,
  //             user,
  //             room,
  //           };
  //         })
  //       );

  //       setMessagesData(messagesWithDetails);
  //     } catch (error) {
  //       console.error('Error fetching messages:', error);
  //     }
  //   };

  //   fetchMessages();
  // }, [props.messages]);


  return (
    <div className="activities">
      <div className="activities__header">
        <h2>Recent Activities</h2>
      </div>

      {messagesData.map((message) => {
        const { user_username, body, room_name , created,room} = message;
        
        return (
          <div key={message.id} className="activities__box">
            <div className="activities__boxHeader roomListRoom__header">
              <Link to={`/user-profile/${message.user}`} className="roomListRoom__author">
                <div className="avatar avatar--small">
                  <img src={avatarImage} alt="User Avatar" />
                </div>
                <p>
                  @{user_username}
                  <span>{formatDistanceToNow(created)} ago</span>
                </p>
              </Link>
              <div className="roomListRoom__actions">


              {user && message.user==user.user_id && 
                <Link to={`/delete-message/${message.id}`}>
                  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                    <title>remove</title>
                    <path d="M27.314 6.019l-1.333-1.333-9.98 9.981-9.981-9.981-1.333 1.333 9.981 9.981-9.981 9.98 1.333 1.333 9.981-9.98 9.98 9.98 1.333-1.333-9.98-9.98 9.98-9.981z"></path>
                  </svg>
                </Link>
              }
              
              </div>
            </div>
            <div className="activities__boxContent">
              <p>replied to post “<Link to={`/rooms/${room}`}>{room_name}</Link>”</p>
              <div className="activities__boxRoomContent">
                {body}
              </div>
            </div>
          </div>
        );
      })}

      <div style={{ textAlign: 'center', margin: 'auto' }}>
      <Link className="btn btn--link" to="/activities-page">
        More
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
          <title>chevron-down</title>
          <path d="M16 21l-13-13h-3l16 16 16-16h-3l-13 13z"></path>
        </svg>
      </Link>
      </div>

    </div>
  );
};

export default Activities;
