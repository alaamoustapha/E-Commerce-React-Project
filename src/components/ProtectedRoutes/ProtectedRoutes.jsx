import { Navigate } from "react-router-dom";
import styles from "./ProtectedRoutes.module.css";
const ProtectedRoutes = (props) => {
  if (localStorage.getItem("userToken")) {
    return props.children;
  } else {   
  return <Navigate to={"/login"}></Navigate>
  }
 
};

export default ProtectedRoutes;
