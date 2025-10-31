import { Stack } from "@mui/material";
import UserCircle from "./UserCircle";
import { dashConfig } from "../dashConfig";

const DashBar = () => {
  return (
    <Stack
      sx={{
        backgroundColor: dashConfig.styles.menuBarBg || "white",
        width: "100%",
        height: "70px",
        justifyContent: "center",
      }}
    >
      <UserCircle />
    </Stack>
  );
};

export default DashBar;
