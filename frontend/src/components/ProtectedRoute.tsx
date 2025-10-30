import { useUser } from "@clerk/clerk-react";
import type { JSX } from "react";
import { Navigate } from "react-router-dom";
import Dashboard from "./DashboardMenu";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isSignedIn } = useUser();

  if (!isSignedIn) {
    return <Navigate to="/login" />;
  }

  if (isSignedIn) {
    return <Dashboard>{children}</Dashboard>;
  }
};

export default ProtectedRoute;
