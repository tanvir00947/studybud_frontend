import React, { useEffect, useState,useContext } from 'react';
import { useParams,Link } from 'react-router-dom';
import Topics from "../component/topics";
// import RoomList from "../component/RoomList";
import Activities from "../component/Activities";
import ProfileRoomList from '../component/ProfileRoomList';
import AuthContext from '../context/AuthContext';

const UserProfile = () => {
  let {user} = useContext(AuthContext)


  const {userId} = useParams();
  const [userData,setUserData] = useState(null);

  console.log('user loaded')

  useEffect(() => {
    const fetchUser = async () => {
      try {
        let response = await fetch(`http://127.0.0.1:8000/api/user-profileAPI/${userId}`)
        let user= await response.json()
        console.log(user)
        setUserData(user)
      }catch(error){
        console.log('Error fetching user: ',error)
      }
    }

    fetchUser();
  },[userId])

  const isEdit=user && user.user_id==userId
  console.log(" isEdit ",isEdit," user.user_id ",user.user_id," userId ",userId)

  if (!userData) {
    // Render a loading state or spinner while waiting for data
    return <div>Loading...</div>;
  }

  return (
    <main className="profile-page layout layout--3">
      <div className="container">

        <Topics topics={userData.topics} />

        {/* Room List Start */}
        <div className="roomList">
          <div className="profile">
            <div className="profile__avatar">
              <div className="avatar avatar--large active">
                <img src="https://randomuser.me/api/portraits/men/11.jpg" alt="User Avatar" />
              </div>
            </div>
            <div className="profile__info">
              <h3>{userData.user.name} </h3>
              <p>@{userData.user.username}</p>

              {isEdit && (
                <>
                <Link to="/update-user-profile" className="btn btn--main btn--pill">
                  Edit Profile
                </Link>
                </>
              )}
              
            </div>
            <div className="profile__about">
              <h3>About</h3>
              <p>
                {userData.user.bio}
              </p>
            </div>
          </div>

          <div className="roomList__header">
            <div>
              <h2>Study Rooms Hosted by {userData.user.name}</h2>
            </div>
          </div>

          <ProfileRoomList userData={userData}  />

          

        </div>
        {/* Room List End */}

        {/* Activities Start */}
        <Activities messagesData={userData.messages} />
        {/* Activities End */}
      </div>
    </main>
  );
};

export default UserProfile;
