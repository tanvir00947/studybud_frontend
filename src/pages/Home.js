
import Topics from "../component/topics";
import RoomList from "../component/RoomList";
import Activities from "../component/Activities";
import React, { useEffect, useState } from 'react';

const Home = () => {

    const [homeData,setHomeData]=useState([]);

    useEffect(() => {
      const fetchHomeData = async () => {
        try{
          const response=await fetch('https://tanvirpythonanywhere.pythonanywhere.com/api/homeAPI/')
          const responseData=await response.json()
          
          setHomeData(responseData)
        }catch(error) {
          console.error('Error fetching home:', error)
        }
      }

      fetchHomeData()
    },[])

    return(
        <>
          <main className="layout layout--3">
          <div className="container">
            <Topics topics={homeData.topics} />
            <RoomList roomsData={homeData.rooms}  />
            <Activities messagesData={homeData.messages} />
          </div>
          </main>
        </>
    )
}

export default Home;