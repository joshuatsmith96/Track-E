import { Stack, Checkbox, Typography } from "@mui/material";

type ListItemComponentType = {
  listItemText: string;
};

const ListItem = ({ listItemText }: ListItemComponentType) => {
  return (
    <Stack
      direction={"row"}
      sx={{
        alignItems: "center",
        bgcolor: "rgba(221, 249, 255, 0.93)",
        borderRadius: 1,
        padding: 1,
      }}
    >
      <Checkbox />
      <Typography>{listItemText}</Typography>
    </Stack>
  );
};

export default ListItem;
