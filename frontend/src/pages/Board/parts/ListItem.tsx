import {
  Stack,
  Checkbox,
  Typography,
  IconButton,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import useUpdateListItem from "../../../utilities/hooks/useUpdateListItem";
import useDeleteListItem from "../../../utilities/hooks/useDeleteListItem";

type ListItemComponentType = {
  listItemText: string;
  boardId: string;
  listId: string;
  listItemId: string;
  status: "Complete" | "NotComplete";
  onDelete?: () => void;
  onStatusChange?: (newStatus: "Complete" | "NotComplete") => void;
};

const ListItem = ({
  listItemText,
  boardId,
  listId,
  listItemId,
  status,
  onDelete,
  onStatusChange,
}: ListItemComponentType) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(listItemText);
  const [checked, setChecked] = useState(status === "Complete");

  const { updateListItem, loading: updating } = useUpdateListItem();
  const { deleteListItem, loading: deleting } = useDeleteListItem();

  const handleClick = () => setIsEditing(true);

  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) =>
    setText(e.target.value);

  const handleBlur = async () => {
    setIsEditing(false);
    if (text.trim() !== listItemText) {
      const updated = await updateListItem(boardId, listId, listItemId, {
        list_text: text.trim(),
      });
      if (!updated) setText(listItemText); // revert on fail
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") (e.target as HTMLInputElement).blur();
    else if (e.key === "Escape") {
      setText(listItemText);
      setIsEditing(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this item?")) return;
    const success = await deleteListItem(boardId, listId, listItemId);
    if (success && onDelete) onDelete();
  };

  const handleCheckboxChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newStatus = e.target.checked ? "Complete" : "NotComplete";
    setChecked(e.target.checked); // optimistically update UI

    const updated = await updateListItem(boardId, listId, listItemId, {
      status: newStatus,
    });
    if (!updated) {
      setChecked(!e.target.checked); // revert if failed
    } else if (onStatusChange) {
      onStatusChange(newStatus);
    }
  };

  return (
    <Stack
      direction={"row"}
      alignItems="center"
      spacing={1}
      sx={{ bgcolor: "#dbdbfbff", borderRadius: 1, padding: 0.5 }}
    >
      <Checkbox
        checked={checked}
        onChange={handleCheckboxChange}
        disabled={updating}
      />

      {isEditing ? (
        <TextField
          value={text}
          onChange={handleChangeText}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          size="small"
          autoFocus
          fullWidth
          disabled={updating}
        />
      ) : (
        <Typography onClick={handleClick} sx={{ cursor: "pointer", flex: 1 }}>
          {text}
        </Typography>
      )}

      <IconButton size="small" onClick={handleDelete} disabled={deleting}>
        <DeleteIcon fontSize="small" />
      </IconButton>
    </Stack>
  );
};

export default ListItem;
