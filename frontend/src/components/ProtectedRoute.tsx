import { useUser } from "@clerk/clerk-react";
import type { JSX } from "react";
import { Navigate } from "react-router-dom";
import Dashboard from "./DashboardMenu";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    return <Navigate to="/login" replace />;
  }

  return <Dashboard>{children}</Dashboard>;
};

export default ProtectedRoute;
