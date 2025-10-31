import { Stack } from "@mui/material";
import type { ReactNode } from "react";

type SlotType = {
  children: ReactNode;
  slot: 1 | 2;
};

const Slot1SX = {
  width: "100%",
  bottom: 10,
  alignItems: "center",
  justifyContent: "center",
};

const Slot2SX = {
  width: "89%",
  position: "absolute",
  bottom: 10,
  alignItems: "center",
  justifyContent: "center",
};

const SlotContainer = ({ children, slot }: SlotType) => {
  const SlotSX = slot === 1 ? Slot1SX : Slot2SX;
  return <Stack sx={SlotSX}>{children}</Stack>;
};

export default SlotContainer;
