import { useUser } from "@clerk/clerk-react";
import type { JSX } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isSignedIn } = useUser();

  if (!isSignedIn) {
    return <Navigate to="/login" />;
  }

  if (isSignedIn) {
    return children;
  }
};

export default ProtectedRoute;
