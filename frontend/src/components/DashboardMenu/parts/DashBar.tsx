import { Stack } from "@mui/material";
import UserCircle from "./UserCircle";

const DashBar = () => {
  return (
    <Stack
      sx={{
        backgroundColor: "white",
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
