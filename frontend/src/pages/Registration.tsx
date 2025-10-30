import React from "react";
import { useUser, useSignUp, useClerk } from "@clerk/clerk-react";
import {
  Container,
  Box,
  Typography,
  Alert,
  Stack,
  TextField,
  Button,
  Divider,
  CircularProgress,
} from "@mui/material";
import { Navigate } from "react-router-dom";

const Signup = () => {
  const { isSignedIn } = useUser();
  const { isLoaded, signUp } = useSignUp();
  const clerk = useClerk();
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isLoaded) return;

    const data = new FormData(event.currentTarget);
    const firstName = data.get("firstName") as string;
    const lastName = data.get("lastName") as string;
    const email = data.get("email") as string;
    const password = data.get("password") as string;

    try {
      const result = await signUp.create({
        emailAddress: email,
        password,
        firstName,
        lastName,
      });

      if (result.status === "complete") {
        await clerk.setActive({ session: result.createdSessionId });
        window.location.assign("/");
      } else {
        console.log("Additional steps required:", result);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("Sign-up error", err);
      setErrorMessage(
        err.errors?.[0]?.message || err.message || "Sign-up failed"
      );
    }
  };

  const handleGoogleSignUp = async () => {
    if (!isLoaded) return;

    try {
      await signUp.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/", // start of OAuth flow
        redirectUrlComplete: "/dashboard",
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("Google sign-up error", err);
      setErrorMessage(
        err.errors?.[0]?.message || err.message || "Google sign-up failed"
      );
    }
  };

  if (isSignedIn) {
    return <Navigate to="/" />;
  }

  if (!isLoaded) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "background.default",
        }}
      >
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Loading...</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>

        {errorMessage && (
          <Alert severity="error" sx={{ mt: 2, width: "100%" }}>
            {errorMessage}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Stack spacing={2}>
            <TextField name="firstName" label="First Name" required fullWidth />
            <TextField name="lastName" label="Last Name" required fullWidth />
            <TextField
              name="email"
              label="Email Address"
              type="email"
              required
              fullWidth
            />
            <TextField
              name="password"
              label="Password"
              type="password"
              required
              fullWidth
            />
            <Button type="submit" fullWidth variant="contained">
              Sign Up
            </Button>
          </Stack>

          <Box sx={{ mt: 3 }}>
            <div id="clerk-captcha"></div>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }}>OR</Divider>

        <Button
          fullWidth
          variant="outlined"
          onClick={handleGoogleSignUp}
          sx={{ textTransform: "none" }}
        >
          Sign up with Google
        </Button>

        <Box sx={{ mt: 2, textAlign: "center" }}>
          <Button href="/login">Already have an account? Sign In</Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Signup;
