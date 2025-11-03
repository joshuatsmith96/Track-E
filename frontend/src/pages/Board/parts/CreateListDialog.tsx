import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

type CreateListDialogProps = {
  open: boolean;
  onClose: () => void;
  onCreate: (name: string) => void;
};

const CreateListDialog = ({
  open,
  onClose,
  onCreate,
}: CreateListDialogProps) => {
  const [listName, setListName] = useState("");

  const handleCreate = () => {
    if (listName.trim() === "") return;
    onCreate(listName);
    setListName(""); // reset field
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create New List</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="List Name"
          fullWidth
          value={listName}
          onChange={(e) => setListName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleCreate}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateListDialog;
