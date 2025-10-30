import { Box, Stack } from "@mui/material";
import type { ReactNode } from "react";
import DashMenu from "./parts/DashMenu";
import DashBar from "./parts/DashBar";

type DashboardMenuProps = {
  children: ReactNode;
};

const Dashboard = ({ children }: DashboardMenuProps) => {
  return (
    <Stack direction="row" sx={{ width: "100%", height: "100vh" }} flex={1}>
      <DashMenu />
      <Stack sx={{ width: "100%" }}>
        <DashBar />
        <Box>{children}</Box>
      </Stack>
    </Stack>
  );
};

export default Dashboard;
