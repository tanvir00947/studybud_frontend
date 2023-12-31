import { Route,Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const PrivateRoute = ({component}) => {
    let {user}=useContext(AuthContext)
    
    return(
        <>
            {!user ? <Navigate to ="/login" /> : component }
            
        </>
    )
}

export default PrivateRoute