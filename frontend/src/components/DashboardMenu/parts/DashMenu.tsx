import { Stack, Typography } from "@mui/material";
import MenuOption from "./MenuOption";
import { dashConfig } from "../dashConfig";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { useRef, useState } from "react";
import SlotContainer from "./SlotContainer";

const DashMenu = () => {
  const Icon = dashConfig.dashboardIcon;
  const Links = dashConfig.links;
  const Slot1Component = dashConfig.slot1 || null;
  const Slot2Component = dashConfig.slot2 || null;

  const menuRef = useRef(null);
  const sizes = {
    open: "400px",
    closed: "50px",
  };

  const [open, setOpen] = useState(false);
  const [menuSize, setMenuSize] = useState(sizes.open);

  const toggleMenuSize = () => {
    if (menuSize === sizes.open) {
      setMenuSize(sizes.closed);
      setOpen(true);
    } else if (menuSize === sizes.closed) {
      setMenuSize(sizes.open);
      setOpen(false);
    }
  };

  return (
    <Stack
      ref={menuRef}
      sx={{
        backgroundColor: dashConfig.styles.menuBg,
        width: menuSize,
        padding: 2,
        gap: 3,
        transition: "200ms",
        position: "relative",
        alignItems: open ? "center" : "start",
      }}
    >
      <Stack
        onClick={toggleMenuSize}
        justifyContent={"center"}
        alignItems={"center"}
        sx={{
          position: "absolute",
          right: -20,
          bgcolor: dashConfig.styles.menuItemColorPrimary,
          color: dashConfig.styles.menuItemColorSecondary,
          px: 1,
          py: 1,
          transform: open ? "rotate(180deg)" : "",
          borderRadius: 100,
          transition: "500ms",
          "&:hover": {
            cursor: "pointer",
            bgcolor: dashConfig.styles.menuItemColorPrimaryHover,
          },
        }}
      >
        <ArrowLeftIcon />
      </Stack>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={open ? "center" : "left"}
        gap={1}
        color={dashConfig.styles.titleColor}
      >
        <Icon />
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            display: open ? "none" : "inherit",
            gap: 1,
          }}
        >
          {dashConfig.dashboardName}
        </Typography>
      </Stack>
      <SlotContainer slot={1}>
        {Slot1Component ? <Slot1Component showWords={open} /> : ""}
      </SlotContainer>
      <Stack
        direction={"column"}
        sx={{ justifyContent: "center", alignItems: "center" }}
      >
        {Links.map((link) => (
          <MenuOption to={link.to} icon={link.icon} showWords={open}>
            {link.name}
          </MenuOption>
        ))}
      </Stack>
      <SlotContainer slot={2}>
        {Slot2Component ? <Slot2Component /> : ""}
      </SlotContainer>
    </Stack>
  );
};

export default DashMenu;
