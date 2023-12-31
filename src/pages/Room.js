import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RoomConversation from '../component/RoomConversation';
import RoomParticipants from '../component/RoomParticipants';

const Room = () => {
  const { roomId } = useParams();
  const [roomData, setRoomData] = useState(null);

  console.log('room loaded')

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        let response = await fetch(`http://127.0.0.1:8000/api/roomAPI/${roomId}`);
        let room = await response.json();
        console.log(room)
        setRoomData(room);
      } catch (error) {
        console.error('Error fetching room:', error);
      }
    };

    fetchRoom();
  }, [roomId]);

  return (
    <>
      <main className="profile-page layout layout--2">
        <div className="container">
          {roomData ? (
            <>
              <RoomConversation roomData={roomData} />
              <RoomParticipants participantsData={roomData.room_participants} />
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </main>
    </>
  );
};

export default Room;
