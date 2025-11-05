import {
  Stack,
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { dashConfig } from "../../../components/DashboardMenu/dashConfig";
import { formatToMDY } from "../../../utilities/dateTranslate";
import { useState } from "react";
import useDeleteBoard from "../../../utilities/hooks/useDeleteBoard";
import useUpdateBoard from "../../../utilities/hooks/useUpdateBoard";
import { NavLink } from "react-router-dom";

export type BoardTileType = {
  title: string;
  createdBy: string;
  lastEdited: string;
  boardID: string;
  onDelete?: (boardID: string) => void;
};

const BoardTile = ({
  title,
  createdBy,
  lastEdited,
  boardID,
  onDelete,
}: BoardTileType) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openRenameDialog, setOpenRenameDialog] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [localTitle, setLocalTitle] = useState(title);

  const open = Boolean(anchorEl);
  const { deleteBoard, loading: deleting } = useDeleteBoard();
  const { updateBoard, loading: updating } = useUpdateBoard();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(`Delete "${localTitle}"?`);
    if (!confirmed) return;

    const success = await deleteBoard(boardID);
    if (success && onDelete) {
      onDelete(boardID); // Notify parent to remove tile
    }

    handleMenuClose();
  };

  const handleRename = () => {
    setNewTitle(localTitle);
    setOpenRenameDialog(true);
    handleMenuClose();
  };

  const handleSaveRename = async () => {
    if (!newTitle.trim()) return;
    const updated = await updateBoard(boardID, { board_name: newTitle.trim() });
    if (updated) {
      setLocalTitle(newTitle.trim());
      setOpenRenameDialog(false);
    }
  };

  return (
    <Stack
      sx={{
        position: "relative",
        bgcolor: dashConfig.styles.menuItemColorPrimary,
        width: "200px",
        height: "150px",
        padding: 2,
        color: "white",
        borderRadius: 2,
        justifyContent: "space-between",
        border: `solid 3px ${dashConfig.styles.menuItemColorPrimary}`,
        transition: "opacity 0.3s, transform 0.3s",
      }}
    >
      {/* Menu Icon */}
      <IconButton
        size="small"
        sx={{ position: "absolute", top: 4, right: 4, color: "white" }}
        onClick={handleMenuOpen}
      >
        <MoreVertIcon />
      </IconButton>

      {/* Context Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem onClick={handleRename} disabled={updating}>
          Rename
        </MenuItem>
        <MenuItem onClick={handleDelete} disabled={deleting}>
          Delete
        </MenuItem>
      </Menu>

      {/* Rename Dialog */}
      <Dialog
        open={openRenameDialog}
        onClose={() => setOpenRenameDialog(false)}
      >
        <DialogTitle>Rename Board</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            label="Board Name"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenRenameDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleSaveRename}
            disabled={updating}
          >
            {updating ? "Saving..." : "Save"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Tile Content */}
      <Box>
        <Typography variant="h6">{localTitle}</Typography>
        <Typography fontSize="14px">
          Created by <strong>{createdBy}</strong>
        </Typography>
        <Typography fontSize="14px">
          Last Edited: {formatToMDY(lastEdited)}
        </Typography>
      </Box>

      <Typography
        component={NavLink}
        to={`/board/${boardID}`}
        sx={{ textDecoration: "none", color: "white", fontWeight: "bold" }}
      >
        View Board
      </Typography>
    </Stack>
  );
};

export default BoardTile;
