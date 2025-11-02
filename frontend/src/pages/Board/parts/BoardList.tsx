import { Paper, Stack, Typography } from "@mui/material";
import type { ListItemType } from "../../../types/ListItem";
import ListItem from "./ListItem";

type ListComponentType = {
  name: string;
  listItems: ListItemType[];
};

const BoardList = ({ name, listItems }: ListComponentType) => {
  console.log("LIST ITEMS", listItems);
  return (
    <Paper sx={{ borderRadius: 2, width: "305px", padding: 2 }}>
      <Stack direction={"row"} sx={{ justifyContent: "space-between", mb: 3 }}>
        <Typography fontWeight={600}>{name}</Typography>
        ...
      </Stack>
      <Stack>
        {/* List Items Go Here */}
        {listItems
          ? listItems.map((item) => <ListItem listItemText={item.list_text} />)
          : ""}
      </Stack>
    </Paper>
  );
};

export default BoardList;
