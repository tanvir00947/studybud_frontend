import React, { useEffect, useState,useContext } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const ActivityPage = () => {
  const [activities, setActivities] = useState([]);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/messages/');
        if (response.ok) {
          const data = await response.json();
          setActivities(data);
        } else {
          console.error('Error fetching activities:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching activities:', error.message);
      }
    };

    fetchActivities();
  }, []); // Empty dependency array means this effect runs once after the initial render

  return (
    <main className="layout">
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
              <h3>Recent Activities</h3>
            </div>
          </div>

          <div className="activities-page layout__body">
            {activities.map((activity) => (
              <div className="activities__box" key={activity.id}>
                <div className="activities__boxHeader roomListRoom__header">
                  <Link to={`/user-profile/${activity.user}`} className="roomListRoom__author">
                    <div className={`avatar avatar--small ${activity.user_username === 'admin' ? 'active' : ''}`}>
                      <img src={activity.user_avatar} alt="user-avatar" />
                    </div>
                    <p>
                      @{activity.user_username}
                      <span>{formatDistanceToNow(activity.created)} ago</span>
                    </p>
                  </Link>
                  <div className="roomListRoom__actions">

                    {user && activity.user==user.user_id && 
                      <Link to={`/delete-message/${activity.id}`}>
                      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                        <title>remove</title>
                        <path
                          d="M27.314 6.019l-1.333-1.333-9.98 9.981-9.981-9.981-1.333 1.333 9.981 9.981-9.981 9.98 1.333 1.333 9.981-9.98 9.98 9.98 1.333-1.333-9.98-9.98 9.98-9.981z"
                        ></path>
                      </svg>
                      </Link>
                    }
                  </div>
                </div>
                <div className="activities__boxContent">
                  <p>replied to post “<Link to={`/rooms/${activity.room}`}>{activity.room_name}</Link>”</p>
                  <div className="activities__boxRoomContent">{activity.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ActivityPage;
