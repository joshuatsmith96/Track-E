import { NavLink } from "react-router-dom";
import type { ReactNode } from "react";
import Button from "@mui/material/Button";
import type { SvgIconComponent } from "@mui/icons-material";

type MenuOptionType = {
  children: ReactNode;
  to: string;
  icon: SvgIconComponent;
};

const MenuOption = ({ children, to, icon }: MenuOptionType) => {
  const Icon = icon;
  return (
    <NavLink to={to} end style={{ textDecoration: "none", width: "100%" }}>
      {({ isActive }) => (
        <Button
          sx={{
            width: "100%",
            fontSize: 18,
            color: isActive ? "primary" : "black",
            borderRadius: 2,
            px: 2,
            py: 1,
            fontWeight: isActive ? 600 : 400,
            textTransform: "none",
            transition: "background-color 0.3s",
            "&:hover": {
              backgroundColor: "action.hover",
            },
            justifyContent: "start",
            gap: 2,
          }}
        >
          <Icon />
          {children}
        </Button>
      )}
    </NavLink>
  );
};

export default MenuOption;
