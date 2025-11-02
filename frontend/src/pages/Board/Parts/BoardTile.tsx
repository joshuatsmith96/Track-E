import {
  Stack,
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { dashConfig } from "../../../components/DashboardMenu/dashConfig";
import { formatToMDY } from "../../../utilities/dateTranslate";
import { useState } from "react";
import useDeleteBoard from "../../../utilities/hooks/useDeleteBoard";

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
  const open = Boolean(anchorEl);

  const { deleteBoard, loading } = useDeleteBoard();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(`Delete "${title}"?`);
    if (!confirmed) return;

    const success = await deleteBoard(boardID);
    if (success && onDelete) {
      onDelete(boardID); // Notify parent to remove tile
    }

    handleMenuClose();
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
      <IconButton
        size="small"
        sx={{ position: "absolute", top: 4, right: 4, color: "white" }}
        onClick={handleMenuOpen}
      >
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

      <Box>
        <Typography variant="h6">{title}</Typography>
        <Typography fontSize="14px">
          Created by <strong>{createdBy}</strong>
        </Typography>
        <Typography fontSize="14px">
          Last Edited: {formatToMDY(lastEdited)}
        </Typography>
      </Box>

      <Typography>View Board</Typography>
    </Stack>
  );
};

export default BoardTile;
