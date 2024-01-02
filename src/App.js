import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from "./component/navbar";

import Home from "./pages/Home";
import Room from "./pages/Room";
import LoginPage from './pages/LoginPage';
import PrivateRoute from './utils/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import ProfilePage from './pages/ProfilePage';
import MyRooms from './pages/MyRooms'
import RoomForm from './pages/RoomForm';
import Register from './pages/Register';
import DeleteRoom from './pages/DeleteRoom';
import DeleteMessage from './pages/DeleteMessage';
import UpdateRoomForm from './pages/UpdateRoomForm';
import UpdateUserProfile from './pages/UpdateUserProfile';
import TopicsPage from './pages/TopicsPage';
import ActivityPage from './pages/ActivitiesPage';
import { SearchProvider } from './context/SearchContext';


function App() {
  // // const [topics, setTopics] = useState([]);
  // const [rooms, setRooms] = useState([]);
  // const [users, setUsers] = useState([]);
  // const [messages, setMessages] = useState([]);

  // // const [topicRoomsCount, setTopicRoomsCount] = useState({});

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const [ roomsResponse, usersResponse, messagesResponse] = await Promise.all([
  //         // fetch('http://127.0.0.1:8000/api/topics/'),
  //         fetch('http://127.0.0.1:8000/api/rooms/'),
  //         fetch('http://127.0.0.1:8000/api/users/'),
  //         fetch('http://127.0.0.1:8000/api/messages/'),
  //       ]);
  
  //       // const topicsData = await topicsResponse.json();
  //       const roomsData = await roomsResponse.json();
  //       const usersData = await usersResponse.json();
  //       const messagesData = await messagesResponse.json();
  
  //       // setTopics(topicsData);
  //       setRooms(roomsData);
  //       setUsers(usersData);
  //       setMessages(messagesData);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };
  
  //   fetchData();
  // }, []); 


  return (
    <Router>
    <div className="App">
      <AuthProvider>
        <SearchProvider>
          <Navbar/>
          <Routes>

            <Route  element={<Home/>} path='/'/>

            <Route  element={<Room/>} path='/rooms/:roomId'/>

            <Route  element={<LoginPage/>} path='/login'/>
            <Route  element={<Register/>} path='/register'/>

            <Route  element={<ProfilePage/>} path='/user-profile/:userId'/>

            {/* <Route  element={<MyRooms/>} path='/my_rooms'/> */}

            <Route  element={<PrivateRoute component={<RoomForm/>} />} path='/create-room'/>

            <Route  element={<PrivateRoute component={<DeleteRoom/>} />}path='/delete-room/:roomId'/>

            <Route  element={<PrivateRoute component={<DeleteMessage/>} />} path='/delete-message/:messageId'/>

            <Route  element={<PrivateRoute component={<UpdateRoomForm/>} />} path='/update-room/:roomId'/>
            
            <Route  element={<PrivateRoute component={<UpdateUserProfile />} />} path='/update-user-profile'/>

            <Route element={<TopicsPage />} path='/topics-page' />

            <Route element={<ActivityPage />} path='/activities-page' />
          </Routes>
        </SearchProvider>
      
      </AuthProvider>
    </div>
    </Router>
  );
}

export default App;
