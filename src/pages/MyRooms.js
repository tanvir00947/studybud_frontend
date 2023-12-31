import React,{useState,useEffect,useContext} from 'react';
import AuthContext from '../context/AuthContext'

const MyRooms = () => {
    let [rooms,setRooms] = useState([])
    let {authTokens, logoutUser} = useContext(AuthContext)

    useEffect(()=> {
        getRooms()
    }, [])

    let getRooms = async() =>{
        let response = await fetch('http://127.0.0.1:8000/api/rooms/', {
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + String(authTokens.access)
            }
        })
        let data = await response.json()

        if(response.status === 200){
            setRooms(data)
        }else if(response.statusText === 'Unauthorized'){
            logoutUser()
        }
        
    }

    return(
        <div>
            <ul>
                {rooms.map(room => (
                    <li key={room.id}>{room.name}</li>
                ))}
            </ul>

        </div>
    )
}

export default MyRooms