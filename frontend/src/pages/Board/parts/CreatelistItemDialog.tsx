import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import { useState } from "react";

type CreateListItemDialogProps = {
  open: boolean;
  onClose: () => void;
  onCreate: (text: string) => void;
};

const CreateListItemDialog = ({
  open,
  onClose,
  onCreate,
}: CreateListItemDialogProps) => {
  const [text, setText] = useState("");

  const handleCreate = () => {
    if (text.trim() === "") return;
    onCreate(text.trim());
    setText("");
  };

  const handleClose = () => {
    setText("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Task</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Task here"
          fullWidth
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleCreate} variant="contained">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateListItemDialog;
