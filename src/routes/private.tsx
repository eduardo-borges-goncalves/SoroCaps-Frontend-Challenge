import { useAuthentication } from "../contexts/Authentication";
import { Layout } from "../components/Layout";
import { Navigate } from "react-router-dom";

export const PrivateRoute = () => {
    const { isAuthenticated } = useAuthentication()

    return (
        !isAuthenticated ?
            <Navigate to="/login" replace /> :
            <Layout />
    )
}