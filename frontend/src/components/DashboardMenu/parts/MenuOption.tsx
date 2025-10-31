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
    <NavLink to={to} end style={{ textDecoration: "none", width: "100%" }}>
      {({ isActive }) => (
        <Button
          sx={{
            fontSize: 18,
            color: isActive
              ? dashConfig.styles.activeLinkColor
              : dashConfig.styles.normalLinkColor,
            borderRadius: 2,
            px: 2,
            py: 1,
            fontWeight: isActive ? 600 : 400,
            textTransform: "none",
            transition: "background-color 0.3s",
            "&:hover": {
              backgroundColor: dashConfig.styles.linkHover,
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
