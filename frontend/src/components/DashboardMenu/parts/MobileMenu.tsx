import React from "react";
import {
  Drawer,
  Stack,
  Box,
  IconButton,
  List,
  ListItemButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { dashConfig } from "../dashConfig";
import { NavLink } from "react-router-dom";

export interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ open, onClose }) => {
  const menuItems = dashConfig.links;
  const Icon = dashConfig.dashboardIcon;
  console.log(menuItems);

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: "70%",
          maxWidth: 300,
          backgroundColor: dashConfig.styles.menuBg,
        },
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
        <IconButton onClick={onClose}>
          <CloseIcon sx={{ color: dashConfig.styles.normalLinkColor }} />
        </IconButton>
      </Box>

      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={open ? "center" : "left"}
        gap={1}
        color={dashConfig.styles.titleColor || "black"}
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

      <List>
        {menuItems.map((item) => (
          <ListItemButton
            component={NavLink}
            to={item.to}
            key={item.name}
            onClick={onClose}
            sx={{
              color: dashConfig.styles.normalLinkColor,
              "&.active": {
                color: dashConfig.styles.activeLinkColor,
              },
            }}
          >
            <Typography>{item.name}</Typography>
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};

export default MobileMenu;
