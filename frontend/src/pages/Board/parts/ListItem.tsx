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
        bgcolor: "#dbdbfbff",
        borderRadius: 1,
        padding: 0.5,
      }}
    >
      <Checkbox />
      <Typography>{listItemText}</Typography>
    </Stack>
  );
};

export default ListItem;
