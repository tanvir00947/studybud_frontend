import React from 'react';
import { Link } from 'react-router-dom';
import avatarImage from '../images/avatar.svg'

const RoomParticipants = ({participantsData}) => {
  
  if (!participantsData) {
    // You can choose to render a loading indicator or a message here
    return <div>Loading...</div>;
  }

  return (
    <div className="participants">
      <h3 className="participants__top">Participants <span>({participantsData.length} Joined)</span></h3>
      <div className="participants__list scroll">
      {participantsData.map((participant) => (
        <Link key={participant.id}  to={`/user-profile/${participant.id}`} className="participant">
          <div className="avatar avatar--medium">
            <img src={avatarImage} alt="Participant 1" />
          </div>
          <p>
            {participant.name}
            <span>@{participant.username}</span>
          </p>
        </Link>
      ))}
      </div>
    </div>
  );
};

export default RoomParticipants;
