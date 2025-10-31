import { Stack, Typography, Button } from "@mui/material";
import MenuOption from "./MenuOption";
import { dashConfig } from "../dashConfig";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { useRef } from "react";

const DashMenu = () => {
  const Icon = dashConfig.dashboardIcon;
  const Links = dashConfig.links;
  const menuRef = useRef(null);

  return (
    <Stack
      ref={menuRef}
      sx={{
        backgroundColor: dashConfig.styles.menuBg,
        width: "400px",
        padding: 2,
        gap: 3,
        position: "relative",
      }}
    >
      <Stack
        justifyContent={"center"}
        alignItems={"center"}
        sx={{
          position: "absolute",
          right: -20,
          bgcolor: dashConfig.styles.menuItemColorPrimary,
          color: dashConfig.styles.menuItemColorSecondary,
          px: 1,
          py: 1,
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
        gap={1}
        color={dashConfig.styles.titleColor}
      >
        <Icon />
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            gap: 1,
          }}
        >
          {dashConfig.dashboardName}
        </Typography>
      </Stack>
      <Button
        variant="contained"
        sx={{ bgcolor: dashConfig.styles.menuItemColorPrimary }}
      >
        Create Board +
      </Button>
      <Stack>
        {Links.map((link) => (
          <MenuOption to={link.to} icon={link.icon}>
            {link.name}
          </MenuOption>
        ))}
      </Stack>
    </Stack>
  );
};

export default DashMenu;
