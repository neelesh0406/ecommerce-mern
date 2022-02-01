import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


export default function PrivateRoute({ children }) {
    const auth = useSelector(state => state.user.isLoggedIn)
    console.log("In Private route ", auth);

    return auth ? children : <Navigate to="/" />;
}

