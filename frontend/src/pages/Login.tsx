import { useUser, useSignIn, useClerk } from "@clerk/clerk-react";
import {
  Container,
  Box,
  Typography,
  Alert,
  Stack,
  TextField,
  Button,
  Divider,
  Paper,
} from "@mui/material";
import { Navigate } from "react-router-dom";
import { useTheme } from "@mui/material";
import React from "react";

const Login = () => {
  const { isSignedIn } = useUser();
  const { isLoaded, signIn } = useSignIn();
  const theme = useTheme();
  const clerk = useClerk();
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  console.log(theme.palette.primary.main);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isLoaded) return;

    const data = new FormData(event.currentTarget);
    const email = data.get("email") as string;
    const password = data.get("password") as string;

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === "complete") {
        await clerk.setActive({ session: result.createdSessionId });
        window.location.assign("/");
      } else {
        console.log("Additional steps required:", result);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("Sign-in error", err);
      setErrorMessage(
        err.errors?.[0]?.message || err.message || "Sign-in failed"
      );
    }
  };

  const handleGoogleSignIn = async () => {
    if (!isLoaded) return;

    try {
      await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/",
        redirectUrlComplete: "/",
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("Google sign-in error", err);
      setErrorMessage(
        err.errors?.[0]?.message || err.message || "Google sign-in failed"
      );
    }
  };

  if (isSignedIn) {
    return <Navigate to="/" />;
  }

  return (
    <Container
      sx={{
        height: "90vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack sx={{ alignItems: "center" }}>
        <Typography variant="h4" fontWeight={"bold"} color="#6161ffff">
          Track-E
        </Typography>
        <Typography>Your task management system made easy.</Typography>
      </Stack>
      <Paper
        elevation={4}
        sx={{
          marginTop: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 3,
          width: {
            md: "60%",
            xs: "90%",
          },
        }}
      >
        {errorMessage && (
          <Alert severity="error" sx={{ mt: 2, width: "100%" }}>
            {errorMessage}
          </Alert>
        )}

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: 3, width: "100%" }}
        >
          <Stack spacing={2}>
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ bgcolor: "#6161ffff" }}
            >
              Sign In
            </Button>
          </Stack>
        </Box>

        <Divider sx={{ my: 3 }}>
          <Typography>OR</Typography>
        </Divider>

        <Button
          fullWidth
          variant="outlined"
          onClick={handleGoogleSignIn}
          sx={{
            textTransform: "none",
            color: "#6161ffff",
            borderColor: "#6161ffff",
          }}
        >
          Sign in with Google
        </Button>

        <Box sx={{ mt: 2, textAlign: "center" }}>
          <Button href="/register" sx={{ color: "#6161ffff" }}>
            Create account
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
