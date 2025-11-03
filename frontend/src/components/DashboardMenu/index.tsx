import { Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import DashMenu from "./parts/DashMenu";
import DashBar from "./parts/DashBar";
import PageContainer from "../PageContainer";
import type { ReactNode } from "react";

type DashboardType = {
  children?: ReactNode;
};

const Dashboard = ({ children }: DashboardType) => {
  console.log(children);
  return (
    <Stack direction="row" sx={{ width: "100%", height: "100vh" }}>
      <DashMenu />
      <Stack sx={{ width: "100%" }}>
        <DashBar />
        <PageContainer>
          <Outlet />
        </PageContainer>
      </Stack>
    </Stack>
  );
};

export default Dashboard;
