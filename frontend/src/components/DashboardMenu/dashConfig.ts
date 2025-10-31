import PlaylistAddCircleIcon from "@mui/icons-material/PlaylistAddCircle";
import DashboardIcon from "@mui/icons-material/Dashboard";

export const dashConfig = {
  dashboardName: "Track-E",
  dashboardIcon: PlaylistAddCircleIcon,
  styles: {
    titleColor: "white",
    menuBg: "rgba(32, 32, 32, 0.93)",
    menuItemColorPrimary: "#7777ffff",
    menuItemColorPrimaryHover: "#4c4cc9ff",
    menuItemColorSecondary: "white",
    menuBarBg: "white",
    menuBarColor: "black",
    activeLinkColor: "#a4a4ffff",
    normalLinkColor: "#b4b4ffff",
  },
  links: [{ name: "Dashboard", to: "/", icon: DashboardIcon }],
};
