import React, { useEffect, useState,useContext } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';


const RoomConversation = ({roomData}) => {

  const { user,authTokens } = useContext(AuthContext);

  

  // const [hostData, setHostData] = useState(null);
  // const [topicData, setTopicData] = useState(null);
  //   // useEffect for fetching host data
  // useEffect(() => {
  //   // Fetch host details only if roomData is available
  //   if (roomData && roomData.host) {
  //     const fetchHost = async () => {
  //       try {
  //         let hostResponse = await fetch(`http://127.0.0.1:8000/api/users/${roomData.host}`);
  //         let host = await hostResponse.json();
  //         console.log('host:', host);
  //         setHostData(host);
  //       } catch (error) {
  //         console.error('Error fetching host:', error);
  //       }
  //     };

  //     fetchHost();

  //     // Cleanup function to reset hostData on component unmount or when roomId changes
  //     return () => {
  //       setHostData(null);
  //     };
  //   }
  // }, [roomData]);

  // useEffect for fetching topic data
  // useEffect(() => {
  //   // Fetch topic details only if roomData is available
  //   if (roomData && roomData.topic) {
  //     const fetchTopic = async () => {
  //       try {
  //         let topicResponse = await fetch(`http://127.0.0.1:8000/api/topics/${roomData.topic}`);
  //         let topic = await topicResponse.json();
  //         console.log('topic:', topic);
  //         setTopicData(topic);
  //       } catch (error) {
  //         console.error('Error fetching topic:', error);
  //       }
  //     };

  //     fetchTopic();

  //     // Cleanup function to reset topicData on component unmount or when roomId changes
  //     return () => {
  //       setTopicData(null);
  //     };
  //   }
  // }, [roomData]);
  
  // if (!roomData) {
  //   return <p>Loading...</p>;
  // }

  

  // State to manage message form data
  const [messageFormData, setMessageFormData] = useState({
    body: '',
  });

  // Handle message input changes
  const handleMessageChange = (e) => {
    const { name, value } = e.target;
    setMessageFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Handle message submission
  const handleMessageSubmit = async (e) => {
    e.preventDefault();

    // Call the sendMessage function with the message form data
    sendMessage(messageFormData);

    // Reset the message form
    setMessageFormData({
      body: '',
    });
  };

  // Handle Enter key press to send the message
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleMessageSubmit(e);
    }
  };

  // The sendMessage function
  const sendMessage = async (messageData) => {
    try {

      console.log('Creating message with data:', messageData);
      // Send a POST request to the Django API endpoint for sending messages
      const response = await fetch(`http://127.0.0.1:8000/api/room_create_message/${roomData.id}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authTokens.access}`, // Replace with your actual access token
        },
        body: JSON.stringify(messageData),
      });

      if (!response.ok) {
        // Handle the case where the request was not successful
        console.error('Error sending message:', response.statusText);
        return;
      }

      // Assuming the response contains the sent message data
      const sentMessage = await response.json();
      console.log('Message sent successfully:', sentMessage);
      window.location.reload();

      // Optionally handle additional logic or UI updates after message sending

    } catch (error) {
      console.error('Error sending message:', error.message);
    }
  };

  const isHost = user && roomData.host === user.user_id;

  

  if (!roomData) {
    // You can choose to render a loading indicator or a message here
    return <div>Loading...</div>;
  }

  

  return (
    <div className="room">
      <div className="room__top">
        <div className="room__topLeft">
          <Link to="/">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
              <title>arrow-left</title>
              <path
                d="M13.723 2.286l-13.723 13.714 13.719 13.714 1.616-1.611-10.96-10.96h27.625v-2.286h-27.625l10.965-10.965-1.616-1.607z"
              ></path>
            </svg>
          </Link>
          <h3>Study Room</h3>
        </div>

        {isHost && (
          <>
          <div className="room__topRight">
            <Link to={`/update-room/${roomData.id}`}>
              <svg
                enableBackground="new 0 0 24 24"
                height="32"
                viewBox="0 0 24 24"
                width="32"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>edit</title>
                <g>
                  <path d="m23.5 22h-15c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h15c.276 0 .5.224.5.5s-.224.5-.5.5z" />
                </g>
                <g>
                  <g>
                    <path
                      d="m2.5 22c-.131 0-.259-.052-.354-.146-.123-.123-.173-.3-.133-.468l1.09-4.625c.021-.09.067-.173.133-.239l14.143-14.143c.565-.566 1.554-.566 2.121 0l2.121 2.121c.283.283.439.66.439 1.061s-.156.778-.439 1.061l-14.142 14.141c-.065.066-.148.112-.239.133l-4.625 1.09c-.038.01-.077.014-.115.014zm1.544-4.873-.872 3.7 3.7-.872 14.042-14.041c.095-.095.146-.22.146-.354 0-.133-.052-.259-.146-.354l-2.121-2.121c-.19-.189-.518-.189-.707 0zm3.081 3.283h.01z"
                    />
                  </g>
                  <g>
                    <path
                      d="m17.889 10.146c-.128 0-.256-.049-.354-.146l-3.535-3.536c-.195-.195-.195-.512 0-.707s.512-.195.707 0l3.536 3.536c.195.195.195.512 0 .707-.098.098-.226.146-.354.146z"
                    />
                  </g>
                </g>
              </svg>
            </Link>
            <Link to={`/delete-room/${roomData.id}`}>
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                <title>remove</title>
                <path
                  d="M27.314 6.019l-1.333-1.333-9.98 9.981-9.981-9.981-1.333 1.333 9.981 9.981-9.981 9.98 1.333 1.333 9.981-9.98 9.98 9.98 1.333-1.333-9.98-9.98 9.98-9.981z"
                ></path>
              </svg>
            </Link>
          </div>
          </>
        )}
        
      </div>

      <div className="room__box scroll">
        <div className="room__header scroll">
          <div className="room__info">
            <h3>{roomData.name}</h3>
            <span>{formatDistanceToNow(roomData.created)} ago</span>
          </div>
          <div className="room__hosted">
            <p>Hosted By</p>
            <Link to={`/user-profile/${roomData.host}`} className="room__author">
              <div className="avatar avatar--small">
                <img src="https://randomuser.me/api/portraits/men/37.jpg" alt="Host Avatar" />
              </div>
              <span>{roomData.host_username} </span>
            </Link>
          </div>
          <div className="room__details">
            {roomData.description}
          </div>
          <span className="room__topics">{roomData.topic_name}</span>
        </div>

        <div className="room__conversation">
          <div className="threads scroll">
            {roomData.room_messages.map((message) =>
              <div key={message.id} className="thread">
              <div className="thread__top">
                <div className="thread__author">
                  <Link to={`/user-profile/${message.user}`} className="thread__authorInfo">
                    <div className="avatar avatar--small">
                      <img src="https://randomuser.me/api/portraits/men/37.jpg" alt="User Avatar" />
                    </div>
                    <span>@{message.user_username} </span>
                  </Link>
                  <span className="thread__date">{formatDistanceToNow(message.created)} ago</span>
                </div>

                {user && message.user==user.user_id && 
                  <Link to={`/delete-message/${message.id}`}>
                  <div className="thread__delete">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                      <title>remove</title>
                      <path
                        d="M27.314 6.019l-1.333-1.333-9.98 9.981-9.981-9.981-1.333 1.333 9.981 9.981-9.981 9.98 1.333 1.333 9.981-9.98 9.98 9.98 1.333-1.333-9.98-9.98 9.98-9.981z"
                      ></path>
                    </svg>
                  </div>
                  </Link>
                }

                

              </div>
              <div className="thread__details">
                {message.body}
              </div>
            </div>
            )}
            

            {/* Add more thread components as needed */}
          </div>
        </div>
      </div>
      

      {user && !roomData.private && (
        <div className="room__message">
          <form action="#">
            <input
              name="body"
              value={messageFormData.body}
              onChange={handleMessageChange}
              onKeyPress={handleKeyPress} // Handle Enter key press
              placeholder="Write your message here..."
            />
          </form>
        </div>
      )}

      
    </div>
  );
};

export default RoomConversation;
