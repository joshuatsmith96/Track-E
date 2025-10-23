import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import SignInPage from "./components/SignInPage";

export default function App() {
  return (
    <header>
      <SignedOut>
        <SignInPage />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
  );
}
