import type { ReactNode } from "react";
import { Stack } from "@mui/material";

type PageContainerType = {
  children: ReactNode;
};

const PageContainer = ({ children }: PageContainerType) => {
  return <Stack sx={{ px: 5, py: 3, overflowX: "scroll" }}>{children}</Stack>;
};
export default PageContainer;
