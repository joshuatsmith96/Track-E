import { Box, Typography } from "@mui/material";
import { keyframes } from "@mui/system";

// Spinner rotation
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Bouncing dots
const bounce = keyframes`
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1); }
`;

const LoadingScreen = () => {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F0F2F5",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          width: 80,
          height: 80,
          borderRadius: "50%",
          border: "8px solid #E0E0E0",
          borderTop: "8px solid #1976d2",
          borderRight: "8px solid #FF4081",
          borderBottom: "8px solid #FFC107",
          animation: `${spin} 1.5s linear infinite`,
          mb: 3,
        }}
      />

      <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
        {[...Array(3)].map((_, i) => (
          <Box
            key={i}
            sx={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: "#1976d2",
              animation: `${bounce} 1.4s infinite ease-in-out`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </Box>
      <Typography
        variant="h6"
        sx={{
          color: "#333",
          fontWeight: 600,
          letterSpacing: 0.5,
        }}
      >
        Loading...
      </Typography>
    </Box>
  );
};

export default LoadingScreen;
