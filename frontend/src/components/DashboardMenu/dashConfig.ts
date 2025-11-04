import PlaylistAddCircleIcon from "@mui/icons-material/PlaylistAddCircle";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { NavCreateBoardButton } from "../CreateBoardButton";
import { type SvgIconComponent } from "@mui/icons-material";
import type { ComponentType } from "react";
import InventoryIcon from "@mui/icons-material/Inventory";

export type DashConfigType = {
  dashboardName: string;
  dashboardIcon: SvgIconComponent;
  styles: {
    titleColor?: string;
    menuBg?: string;
    menuItemColorPrimary?: string;
    menuItemColorPrimaryHover?: string;
    menuItemColorSecondary?: string;
    menuBarBg?: string;
    menuBarColor?: string;
    activeLinkColor?: string;
    normalLinkColor?: string;
    linkHover?: string;
  };
  links: {
    name: string;
    to: string;
    icon: SvgIconComponent;
  }[];
  // eslint-disable-next-line
  slot1?: ComponentType<any>;
  // eslint-disable-next-line
  slot2?: ComponentType<any>;
};

export const dashConfig: DashConfigType = {
  dashboardName: "Track-E",
  dashboardIcon: PlaylistAddCircleIcon,
  styles: {
    titleColor: "white",
    menuBg: "rgba(32, 32, 32, 1)",
    menuItemColorPrimary: "#7777ffff",
    menuItemColorPrimaryHover: "#4c4cc9ff",
    menuItemColorSecondary: "white",
    menuBarBg: "white",
    menuBarColor: "black",
    activeLinkColor: "#7171ffff",
    normalLinkColor: "#e3e3faff",
    linkHover: "#d4d4ff33",
  },
  links: [
    { name: "My Boards", to: "/", icon: DashboardIcon },
    { name: "Board Archive", to: "/board-archive", icon: InventoryIcon },
  ],
  slot1: NavCreateBoardButton,
};
