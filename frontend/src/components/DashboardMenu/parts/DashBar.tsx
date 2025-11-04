import { useState } from "react";
import { Stack, Box } from "@mui/material";
import UserCircle from "./UserCircle";
import { dashConfig } from "../dashConfig";
import MenuIcon from "@mui/icons-material/Menu";
import MobileMenu from "./MobileMenu";

const DashBar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = (open: boolean) => () => {
    setMenuOpen(open);
  };

  return (
    <Stack
      direction="row"
      sx={{
        backgroundColor: dashConfig.styles.menuBarBg || "white",
        width: "100%",
        height: "70px",
        justifyContent: {
          xs: "space-between",
          sm: "flex-end",
        },
        alignItems: "center",
        boxSizing: "border-box",
        px: 2,
      }}
    >
      {/* Mobile Drawer */}
      <MobileMenu open={menuOpen} onClose={toggleMenu(false)} />

      {/* Mobile Menu Icon */}
      <Box
        sx={{
          display: {
            sm: "none",
          },
          "&:hover": {
            cursor: "pointer",
          },
        }}
        onClick={toggleMenu(true)}
      >
        <MenuIcon />
      </Box>

      <UserCircle />
    </Stack>
  );
};

export default DashBar;
