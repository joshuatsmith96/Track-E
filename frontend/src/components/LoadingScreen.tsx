import React from "react";
import { Box, Typography, CircularProgress, keyframes } from "@mui/material";

const pulse = keyframes`
  0% {
    transform: scale(0.8);
    opacity: 0.6;
  }
  50% {
    transform: scale(1.2);
    opacity: 1;
  }
  100% {
    transform: scale(0.8);
    opacity: 0.6;
  }
`;

const LoadingScreen: React.FC = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        bgcolor: "primary.dark",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1300, // MUI's modal zIndex
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: 80,
          height: 80,
        }}
      >
        {[0, 1, 2].map((i) => (
          <CircularProgress
            key={i}
            variant="determinate"
            value={100}
            thickness={4}
            sx={{
              color: `rgba(255,255,255,${0.3 + i * 0.2})`,
              position: "absolute",
              animation: `${pulse} 1.5s ${i * 0.3}s infinite`,
            }}
          />
        ))}
      </Box>

      <Typography
        variant="h6"
        sx={{ mt: 4, color: "white", fontWeight: 500, letterSpacing: 1 }}
      >
        Loading...
      </Typography>
    </Box>
  );
};

export default LoadingScreen;
