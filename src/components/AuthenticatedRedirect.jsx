import { useAuth } from "../hooks/use-auth";
import { Navigate, useLocation } from 'react-router-dom';
import { SignIn } from "../screens/sign-in/SignIn";

export const AuthenticatedRedirect = ({ children }) => {
    const { user } = useAuth();
    const location = useLocation();
    if (!user?.authenticated) {
        return <Navigate to="/sign-in" replace state={{ from: location }}><SignIn/></Navigate>
    }

    return children;
}