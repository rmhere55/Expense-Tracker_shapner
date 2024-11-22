import { Navigate } from "react-router-dom";
import { auth } from "../firebase/firebaseConfig";

const PrivateRoute = ({ children }) => {
  return auth.currentUser ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
