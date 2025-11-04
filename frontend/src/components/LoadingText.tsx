import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

const loadingMessages = [
  "Loading...",
  "Grabbing latest data...",
  "Polishing pixels...",
];

const Loading: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [showColdStart, setShowColdStart] = useState(false);

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 2500);

    const coldStartTimeout = setTimeout(() => {
      setShowColdStart(true);
    }, 10000);

    return () => {
      clearInterval(messageInterval);
      clearTimeout(coldStartTimeout);
    };
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="30vh"
      textAlign="center"
      gap={2}
    >
      <CircularProgress size={60} thickness={5} />
      <AnimatePresence mode="wait">
        <motion.div
          key={showColdStart ? "cold-start" : index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
        >
          <Typography variant="h6" color="text.secondary">
            {showColdStart
              ? "Server cold starting, please wait..."
              : loadingMessages[index]}
          </Typography>
          <Typography color="text.secondary">
            {showColdStart ? "Startup could take 30 seconds or more" : ""}
          </Typography>
        </motion.div>
      </AnimatePresence>
    </Box>
  );
};

export default Loading;
