import { Stack, Typography } from "@mui/material";
import { UserButton } from "@clerk/clerk-react";
import { useUser } from "@clerk/clerk-react";
import { dashConfig } from "../dashConfig";

const UserCircle = () => {
  const { user } = useUser();
  return (
    <Stack
      sx={{
        height: "50px",
        alignItems: "center",
        justifyContent: "right",
        gap: 2,
        mr: 3,
      }}
      direction="row"
    >
      <Typography color={dashConfig.styles.menuBarColor}>
        Welcome <strong>{`${user?.firstName} ${user?.lastName}!`}</strong>
      </Typography>
      <UserButton
        appearance={{
          elements: {
            userButtonAvatarBox: "w-20 h-20",
            userButtonBox: "white-border-user-button",
          },
        }}
      />
    </Stack>
  );
};

export default UserCircle;
