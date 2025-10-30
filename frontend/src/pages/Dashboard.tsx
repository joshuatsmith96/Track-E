import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";

const Dashboard = () => {
  const { user } = useUser();

  useEffect(() => {
    console.log("User:", user);
  }, [user]);

  return (
    <div>
      <h2 className="text-2xl font-semibold">Dashboard</h2>
      <p>
        Signed in as:{" "}
        {user?.fullName || user?.primaryEmailAddress?.emailAddress}
      </p>
    </div>
  );
};

export default Dashboard;
