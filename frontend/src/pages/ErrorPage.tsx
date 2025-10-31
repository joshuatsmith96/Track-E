import Dashboard from "../components/DashboardMenu";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

const ErrorPage = () => (
  <>
    <SignedIn>
      <Dashboard>
        <h1>Error - Page not found</h1>
      </Dashboard>
    </SignedIn>
    <SignedOut>
      <Navigate to="/login" />
    </SignedOut>
  </>
);

export default ErrorPage;
