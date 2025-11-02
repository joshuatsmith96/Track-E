import { useState } from "react";
import type { ChangeEvent } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";

interface CreateBoardDialogProps {
  open: boolean;
  onClose: () => void;
  onCreate: (name: string) => void;
}

export default function CreateBoardDialog({
  open,
  onClose,
  onCreate,
}: CreateBoardDialogProps) {
  const [boardName, setBoardName] = useState<string>("");
  const CHARACTER_LIMIT = 30;

  const handleCreate = () => {
    if (boardName.trim()) {
      onCreate(boardName.trim());
      setBoardName("");
      onClose();
    }
  };

  const handleCancel = () => {
    setBoardName("");
    onClose();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= CHARACTER_LIMIT) {
      setBoardName(value);
    }
  };

  return (
    <Dialog open={open} onClose={handleCancel} fullWidth maxWidth="xs">
      <DialogTitle>Create New Board</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={1}>
          <TextField
            autoFocus
            margin="dense"
            label="Board Name"
            type="text"
            fullWidth
            variant="outlined"
            value={boardName}
            onChange={handleChange}
            inputProps={{ maxLength: CHARACTER_LIMIT }}
          />
          <Typography
            variant="body2"
            textAlign="right"
            color={
              boardName.length >= CHARACTER_LIMIT
                ? "error"
                : boardName.length >= CHARACTER_LIMIT * 0.8
                  ? "warning.main"
                  : "text.secondary"
            }
          >
            {boardName.length}/{CHARACTER_LIMIT}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button
          onClick={handleCreate}
          variant="contained"
          disabled={!boardName.trim()}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}
