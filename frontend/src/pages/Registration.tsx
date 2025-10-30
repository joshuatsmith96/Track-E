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
  Paper,
} from "@mui/material";
import { Navigate } from "react-router-dom";

const Signup = () => {
  const { isSignedIn } = useUser();
  const { isLoaded, signUp } = useSignUp();
  const clerk = useClerk();
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isLoaded) return;

    setLoading(true);

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
        setLoading(false);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("Sign-up error", err);
      setErrorMessage(
        err.errors?.[0]?.message || err.message || "Sign-up failed"
      );
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    if (!isLoaded) return;

    setLoading(true);

    try {
      await signUp.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/",
        redirectUrlComplete: "/dashboard",
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("Google sign-up error", err);
      setErrorMessage(
        err.errors?.[0]?.message || err.message || "Google sign-up failed"
      );
      setLoading(false);
    }
  };

  if (isSignedIn) {
    return <Navigate to="/" />;
  }

  if (!isLoaded || loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "background.default",
          flexDirection: "column",
        }}
      >
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Processing...</Typography>
      </Box>
    );
  }

  return (
    <Container>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={4}
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: 3, width: { xs: "90%", md: "75%" }, padding: 4 }}
        >
          {errorMessage && (
            <Alert severity="error" sx={{ mt: 2, width: "100%" }}>
              {errorMessage}
            </Alert>
          )}
          <Typography component="h1" variant="h5" textAlign="center" mb={3}>
            Sign Up
          </Typography>
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

          <Divider sx={{ my: 3 }}>
            <Typography>OR</Typography>
          </Divider>

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
        </Paper>
        <Box sx={{ mt: 3 }}>
          <div id="clerk-captcha"></div>
        </Box>
      </Box>
    </Container>
  );
};

export default Signup;
