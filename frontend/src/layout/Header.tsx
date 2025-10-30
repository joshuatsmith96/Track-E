import {
  SignedOut,
  SignInButton,
  SignedIn,
  UserButton,
} from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <nav>
        <SignedOut>
          <p>Signed-Out</p>
          <SignInButton mode="modal">
            <button>Sign In</button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <p>Signed-In</p>
          <Link to="/dashboard">Dashboard</Link>
          <UserButton />
        </SignedIn>
      </nav>
    </header>
  );
};

export default Header;
