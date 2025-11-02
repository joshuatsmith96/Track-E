import { Button, Box, Stack, Typography } from "@mui/material";
import { dashConfig } from "./DashboardMenu/dashConfig";
import AddIcon from "@mui/icons-material/Add";

export type CreateBoardButtonType = {
  showWords?: boolean;
};

export const NavCreateBoardButton = ({ showWords }: CreateBoardButtonType) => {
  return (
    <Button
      variant="contained"
      sx={{
        bgcolor: dashConfig.styles.menuItemColorPrimary,
        width: "100%",
      }}
    >
      <Box sx={{ display: !showWords ? "inherit" : "none" }}>Create Board</Box>
      &nbsp;+
    </Button>
  );
};

export const MainCreateBoardButton = () => {
  return (
    <Stack
      sx={{
        position: "relative",
        border: `solid 3px ${dashConfig.styles.menuItemColorPrimary}`,
        width: "200px",
        height: "150px",
        padding: 2,
        color: "white",
        borderRadius: 2,
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        cursor: "pointer",
        transition: "color 0.3s ease",

        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "0%",
          height: "100%",
          bgcolor: dashConfig.styles.menuItemColorPrimary,
          transition: "width 0.5s ease",
          zIndex: 0,
        },
        "&:hover::before": {
          width: "100%",
        },
        "&:hover svg": {
          color: "#fff",
        },
        "&:hover .hoverText": {
          opacity: 1,
          transform: "translateY(0)",
        },
      }}
    >
      <AddIcon
        sx={{
          fontSize: "100px",
          color: dashConfig.styles.menuItemColorPrimary,
          transition: "color 0.3s ease",
          zIndex: 1,
        }}
      />

      <Typography
        className="hoverText"
        sx={{
          position: "absolute",
          bottom: 20,
          fontSize: "18px",
          fontWeight: 500,
          opacity: 0,
          transform: "translateY(10px)",
          transition: "all 0.4s ease",
          color: "white",
          zIndex: 1,
          pointerEvents: "none",
        }}
      >
        Add New Board
      </Typography>
    </Stack>
  );
};
