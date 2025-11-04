import { Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import DashMenu from "./parts/DashMenu";
import DashBar from "./parts/DashBar";
import PageContainer from "../PageContainer";
import type { ReactNode } from "react";
import { useScreenSize } from "../../utilities/useScreenSize";

type DashboardType = {
  children?: ReactNode;
};

const Dashboard = ({ children }: DashboardType) => {
  console.log(children);

  const { sm } = useScreenSize();
  console.log(sm);

  return (
    <Stack direction="row" sx={{ width: "100%", height: "100vh" }}>
      <DashMenu visible={!sm ? true : false} />
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
