import { Stack, Typography, Button } from "@mui/material";
import MenuOption from "./MenuOption";
import PlaylistAddCircleIcon from "@mui/icons-material/PlaylistAddCircle";

const DashMenu = () => {
  return (
    <Stack
      sx={{
        backgroundColor: "white",
        width: "360px",
        padding: 3,
        gap: 3,
      }}
    >
      <Stack direction={"row"} alignItems={"center"} gap={1}>
        <PlaylistAddCircleIcon />
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            gap: 1,
          }}
        >
          Track-E
        </Typography>
      </Stack>
      <Button variant="contained">Create Board +</Button>
      <Stack>
        <MenuOption to="/">Dashboard</MenuOption>
        <MenuOption to="/test">Test</MenuOption>
      </Stack>
    </Stack>
  );
};

export default DashMenu;
