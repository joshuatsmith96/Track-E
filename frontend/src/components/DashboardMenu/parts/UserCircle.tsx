import { Stack, Typography } from "@mui/material";
import { UserButton } from "@clerk/clerk-react";
import { useUser } from "@clerk/clerk-react";

const UserCircle = () => {
  const { user } = useUser();
  console.log(user);
  return (
    <Stack
      sx={{
        backgroundColor: "white",
        height: "50px",
        alignItems: "center",
        justifyContent: "right",
        gap: 2,
        mr: 3,
      }}
      direction="row"
    >
      <Typography>
        Welcome <strong>{`${user?.firstName} ${user?.lastName}!`}</strong>
      </Typography>
      <UserButton
        appearance={{ elements: { userButtonAvatarBox: "w-20 h-20" } }}
      />
    </Stack>
  );
};

export default UserCircle;
