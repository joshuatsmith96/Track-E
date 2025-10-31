import { NavLink } from "react-router-dom";
import type { ReactNode } from "react";
import { Box, Button } from "@mui/material";
import type { SvgIconComponent } from "@mui/icons-material";
import { dashConfig } from "../dashConfig";

type MenuOptionType = {
  children: ReactNode;
  to: string;
  icon: SvgIconComponent;
  showWords: boolean;
};

const MenuOption = ({ children, to, icon, showWords }: MenuOptionType) => {
  const Icon = icon;
  return (
    <NavLink
      to={to}
      end
      style={{
        textDecoration: "none",
        width: "100%",
      }}
    >
      {({ isActive }) => (
        <Button
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: showWords ? "center" : "start",
            fontSize: 18,
            color: isActive
              ? dashConfig.styles.activeLinkColor
              : dashConfig.styles.normalLinkColor,
            ml: !showWords ? (isActive ? 2 : "") : "",
            borderRadius: 0,
            px: 2,
            py: 1,
            fontWeight: !showWords ? (isActive ? 600 : 200) : "",
            textTransform: "none",
            transition: "0.3s",
            "&:hover": {
              borderRadius: 2,
              backgroundColor: dashConfig.styles.linkHover,
              ml: !showWords ? (isActive ? 3 : 1) : "",
            },
            gap: 2,
          }}
        >
          <Icon />
          <Box sx={{ display: !showWords ? "inherit" : "none" }}>
            {children}
          </Box>
        </Button>
      )}
    </NavLink>
  );
};

export default MenuOption;
