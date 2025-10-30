import { SignedIn, UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <nav>
        <SignedIn>
          <p>Signed-In</p>
          <Link to="/">Boards</Link>
          <UserButton />
        </SignedIn>
      </nav>
    </header>
  );
};

export default Header;
