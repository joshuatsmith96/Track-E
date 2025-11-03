import {
  Paper,
  Stack,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import type { ListItemType } from "../../../types/ListItem";
import ListItem from "./ListItem";
import { useState } from "react";
import useDeleteList from "../../../utilities/hooks/useDeleteList";

type BoardListProps = {
  boardId: string;
  listId: string;
  name: string;
  listItems: ListItemType[];
  onDelete?: () => void;
};

const BoardList = ({
  boardId,
  listId,
  name,
  listItems,
  onDelete,
}: BoardListProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { deleteList, loading } = useDeleteList();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    if (!window.confirm(`Delete list "${name}"?`)) return;

    const updatedBoard = await deleteList(boardId, listId);
    handleMenuClose();

    if (updatedBoard && onDelete) {
      onDelete();
    }
  };

  return (
    <Paper sx={{ borderRadius: 2, width: "305px", padding: 2 }}>
      <Stack direction={"row"} sx={{ justifyContent: "space-between", mb: 3 }}>
        <Typography>{name}</Typography>
        <div>
          <IconButton size="small" onClick={handleMenuOpen}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem onClick={handleDelete} disabled={loading}>
              Delete
            </MenuItem>
          </Menu>
        </div>
      </Stack>

      <Stack>
        {listItems?.map((item) => (
          <ListItem key={item.list_id} listItemText={item.list_text} />
        ))}
      </Stack>
    </Paper>
  );
};

export default BoardList;
