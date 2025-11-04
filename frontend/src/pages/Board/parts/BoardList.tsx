import {
  Paper,
  Stack,
  Typography,
  IconButton,
  Menu,
  Button,
  MenuItem,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import type { ListItemType } from "../../../types/ListItem";
import ListItem from "./ListItem";
import { useState, useEffect } from "react";
import useDeleteList from "../../../utilities/hooks/useDeleteList";
import useCreateListItem from "../../../utilities/hooks/useCreateListItem";
import CreateListItemDialog from "./CreatelistItemDialog";

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
  listItems: initialListItems,
  onDelete,
}: BoardListProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [listItems, setListItems] = useState<ListItemType[]>(initialListItems);

  const open = Boolean(anchorEl);
  const { deleteList, loading: deleting } = useDeleteList();
  const { createListItem, loading: creating } = useCreateListItem();

  useEffect(() => {
    setListItems(initialListItems);
  }, [initialListItems]);

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

  const handleAddItem = async (text: string) => {
    const updatedBoard = await createListItem(boardId, listId, {
      list_text: text,
      status: "NotComplete",
      order_in_list: listItems.length,
    });

    if (updatedBoard) {
      const updatedList = updatedBoard.lists.find(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (l: any) => l.list_id === listId
      );
      if (updatedList) {
        setListItems(updatedList.list_items);
      }
    }

    setOpenDialog(false);
  };

  return (
    <>
      <Paper
        sx={{
          borderRadius: 2,
          width: {
            xs: "100%",
            sm: "300px",
          },
          flexShrink: 0,
          height: "content-fit",
          padding: 2,
          boxSizing: "border-box",
        }}
      >
        <Stack
          direction={"row"}
          sx={{ justifyContent: "space-between", mb: 3 }}
        >
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
              <MenuItem onClick={handleDelete} disabled={deleting}>
                Delete
              </MenuItem>
            </Menu>
          </div>
        </Stack>

        <Stack gap={1}>
          {listItems?.map((item) => (
            <ListItem key={item.list_id} listItemText={item.list_text} />
          ))}
        </Stack>

        <Button
          sx={{
            mt: listItems.length > 0 ? 2 : 0,
            width: "100%",
            textAlign: "left",
          }}
          onClick={() => setOpenDialog(true)}
          disabled={creating}
        >
          + Add List Item
        </Button>
      </Paper>

      <CreateListItemDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onCreate={handleAddItem}
      />
    </>
  );
};

export default BoardList;
