import React, { useState, useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const UpdateRoom = () => {
  const { user, authTokens } = useContext(AuthContext);
  const { roomId } = useParams();
  const [roomData, setRoomData] = useState({
    name: '',
    description: '',
  });

  useEffect(() => {
    // Fetch room details when the component mounts
    fetchRoomDetails();
  }, []); // Empty dependency array means this effect runs once after the initial render

  const fetchRoomDetails = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/update-roomAPI/${roomId}/`, {
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
        },
      });

      if (response.ok) {
        const roomDetails = await response.json();
        // Update the state with room details
        setRoomData({
          name: roomDetails.name,
          description: roomDetails.description,
        });
      } else {
        console.error('Error fetching room details:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching room details:', error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRoomData((prevRoomData) => ({
      ...prevRoomData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/update-roomAPI/${roomId}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authTokens.access}`,
        },
        body: JSON.stringify({
          name: roomData.name,
          description: roomData.description,
        }),
      });

      if (response.ok) {
        // Room updated successfully
        alert('Room updated successfully');
        // Redirect to the room details page or any other appropriate page
      } else {
        // Handle the case where the request was not successful
        console.error('Error updating room:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating room:', error.message);
    }
  };

  const isHost = user && roomData.host === user.user_id;

  return (
    <main className="update-room layout">

        {isHost ? (
            <>
            <div className="container">
                <div className="layout__box">
                <div className="layout__boxHeader">
                    <div className="layout__boxTitle">
                    <Link to="/">
                        <svg
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        >
                        <title>arrow-left</title>
                        <path
                            d="M13.723 2.286l-13.723 13.714 13.719 13.714 1.616-1.611-10.96-10.96h27.625v-2.286h-27.625l10.965-10.965-1.616-1.607z"
                        ></path>
                        </svg>
                    </Link>
                    <h3>Update Study Room</h3>
                    </div>
                </div>
                <div className="layout__body">
                    <form className="form" onSubmit={handleSubmit}>
                    <div className="form__group">
                        <label htmlFor="room_name">Room Name</label>
                        <input
                        type="text"
                        name="name"
                        value={roomData.name}
                        onChange={handleInputChange}
                        />
                    </div>

                    <div className="form__group">
                        <label htmlFor="room_description">Room Description</label>
                        <input
                        type="text"
                        name="description"
                        value={roomData.description}
                        onChange={handleInputChange}
                        />
                    </div>

                    <div className="form__action">
                        <Link className="btn btn--dark" to={`/room/${roomId}`}>
                        Cancel
                        </Link>
                        <button className="btn btn--main" type="submit">
                        Submit
                        </button>
                    </div>
                    </form>
                </div>
                </div>
            </div>
            </>
        ):(
            
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                
                <h1>You are not Allowed Here!!!</h1>
            </div>
        ) }
      
    </main>
  );
};

export default UpdateRoom;
