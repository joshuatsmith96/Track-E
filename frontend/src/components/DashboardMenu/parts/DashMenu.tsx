import { Stack, Typography, Button } from "@mui/material";
import MenuOption from "./MenuOption";
import { dashConfig } from "../dashConfig";

const DashMenu = () => {
  const Icon = dashConfig.dashboardIcon;
  const Links = dashConfig.links;
  return (
    <Stack
      sx={{
        backgroundColor: "white",
        width: "360px",
        padding: 3,
        gap: 3,
      }}
    >
      <Stack direction={"row"} alignItems={"center"} gap={1}>
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
      <Button variant="contained">Create Board +</Button>
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
