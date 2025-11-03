import { useUser } from "@clerk/clerk-react";
import { Navigate, Outlet } from "react-router-dom";
import LoadingScreen from "./LoadingScreen";

const ProtectedRoute = () => {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) return <LoadingScreen />;
  if (!isSignedIn) return <Navigate to="/login" replace />;

  return <Outlet />;
};

export default ProtectedRoute;
