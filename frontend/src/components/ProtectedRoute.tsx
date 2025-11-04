import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { Navigate, Outlet } from "react-router-dom";
import LoadingScreen from "./LoadingScreen";

const ProtectedRoute: React.FC = () => {
  const { isSignedIn, isLoaded } = useUser();
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    let timer: number;

    if (isLoaded) {
      timer = window.setTimeout(() => {
        setShowLoading(false);
      }, 3000);
    }

    return () => clearTimeout(timer);
  }, [isLoaded]);

  if (!isLoaded || showLoading) {
    const message = !isSignedIn && isLoaded ? "Signing Out" : "Signing In";
    return <LoadingScreen message={message} />;
  }

  if (!isSignedIn) return <Navigate to="/login" replace />;
  return <Outlet />;
};

export default ProtectedRoute;
