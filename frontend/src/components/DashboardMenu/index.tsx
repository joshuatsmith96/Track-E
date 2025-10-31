import { Box, Stack } from "@mui/material";
import type { ReactNode } from "react";
import DashMenu from "./parts/DashMenu";
import DashBar from "./parts/DashBar";
import PageContainer from "../PageContainer";

type DashboardMenuProps = {
  children: ReactNode;
};

const Dashboard = ({ children }: DashboardMenuProps) => {
  return (
    <Stack direction="row" sx={{ width: "100%", height: "100vh" }}>
      <DashMenu />
      <Stack sx={{ width: "100%" }}>
        <DashBar />
        <PageContainer>{children}</PageContainer>
      </Stack>
    </Stack>
  );
};

export default Dashboard;
