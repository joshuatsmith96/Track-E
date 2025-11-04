import { Stack, Box } from "@mui/material";
import UserCircle from "./UserCircle";
import { dashConfig } from "../dashConfig";
import MenuIcon from "@mui/icons-material/Menu";
import DashMenu from "./DashMenu";

const DashBar = () => {
  return (
    <Stack
      direction="row"
      sx={{
        backgroundColor: dashConfig.styles.menuBarBg || "white",
        width: "100%",
        height: "70px",
        justifyContent: {
          xs: "space-between",
          sm: "flex-end",
        },
        alignItems: "center",
        boxSizing: "border-box",
        px: 2,
      }}
    >
      <DashMenu visible={false} />
      <Box
        sx={{
          display: {
            sm: "none",
          },
          "&:hover": {
            cursor: "pointer",
          },
        }}
      >
        <MenuIcon />
      </Box>
      <UserCircle />
    </Stack>
  );
};

export default DashBar;
