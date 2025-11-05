import {
  Stack,
  Typography,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { useParams, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import useBoards from "../../utilities/hooks/useBoards";
import BoardList from "./parts/BoardList";
import useCreateList from "../../utilities/hooks/useCreateList";
import CreateListDialog from "./parts/CreateListDialog";
import { dashConfig } from "../../components/DashboardMenu/dashConfig";
import useUpdateBoard from "../../utilities/hooks/useUpdateBoard";

const Board = () => {
  const { id } = useParams();
  const boardId: string | undefined = id ?? "";
  const { boards } = useBoards();
  const { createList } = useCreateList();
  const { updateBoard } = useUpdateBoard();

  const [openListDialog, setOpenListDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [newBoardName, setNewBoardName] = useState("");
  const [currentBoard, setCurrentBoard] = useState(
    boards?.find((board) => board.board_id === id)
  );

  useEffect(() => {
    setCurrentBoard(boards?.find((board) => board.board_id === id));
  }, [boards, id]);

  const handleCreateList = async (name: string) => {
    if (!currentBoard) return;

    const newList = await createList(currentBoard.board_id, {
      list_name: name,
      list_status: "NotStarted",
      list_items: [],
      order_in_board: currentBoard.lists?.length ?? 0,
    });

    if (newList) {
      setCurrentBoard((prev) =>
        prev
          ? {
              ...prev,
              lists: prev.lists ? [...prev.lists, newList] : [newList],
            }
          : prev
      );
      setOpenListDialog(false);
    }
  };

  const handleDeleteList = (listId: string) => {
    setCurrentBoard((prev) =>
      prev
        ? { ...prev, lists: prev.lists?.filter((l) => l.list_id !== listId) }
        : prev
    );
  };

  const handleEditClick = () => {
    if (currentBoard) {
      setNewBoardName(currentBoard.board_name);
      setOpenEditDialog(true);
    }
  };

  const handleSaveBoardName = async () => {
    if (!currentBoard || !newBoardName.trim()) return;

    const updated = await updateBoard(currentBoard.board_id, {
      board_name: newBoardName.trim(),
    });

    if (updated) {
      setCurrentBoard((prev) =>
        prev ? { ...prev, board_name: newBoardName.trim() } : prev
      );
      setOpenEditDialog(false);
    }
  };

  return (
    <Stack sx={{ width: "100%" }}>
      {/* Back button */}
      <Button
        variant="outlined"
        sx={{
          width: "fit-content",
          mb: 4,
          color: dashConfig.styles.menuItemColorPrimary,
          borderColor: dashConfig.styles.menuItemColorPrimary,
        }}
        component={NavLink}
        to="/"
      >
        Back to Boards
      </Button>

      {/* Create list dialog */}
      <CreateListDialog
        open={openListDialog}
        onClose={() => setOpenListDialog(false)}
        onCreate={handleCreateList}
      />

      {/* Edit board name dialog */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Edit Board Name</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            label="Board Name"
            value={newBoardName}
            onChange={(e) => setNewBoardName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveBoardName}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Board Header */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 5 }}
      >
        <Stack direction="row" alignItems="center" gap={1}>
          <Typography variant="h5">
            <strong>{currentBoard?.board_name}</strong>
          </Typography>
          <IconButton
            onClick={handleEditClick}
            size="small"
            sx={{ color: dashConfig.styles.menuItemColorPrimary }}
          >
            <EditIcon />
          </IconButton>
        </Stack>

        <Button
          variant="contained"
          onClick={() => setOpenListDialog(true)}
          sx={{
            width: {
              xs: "100%",
              sm: "300px",
            },
            bgcolor: dashConfig.styles.menuItemColorPrimary,
            color: "white",
          }}
        >
          Add New List
        </Button>
      </Stack>

      {/* Board Content */}
      {currentBoard ? (
        currentBoard?.lists.length > 0 ? (
          <Stack
            direction="row"
            gap={2}
            justifyContent="start"
            alignItems="start"
            flexWrap="wrap"
          >
            {currentBoard?.lists?.map((list) => (
              <BoardList
                boardId={boardId}
                listId={list.list_id}
                key={list.list_id}
                name={list.list_name}
                listItems={list.list_items}
                onDelete={() => handleDeleteList(list.list_id)}
              />
            ))}
          </Stack>
        ) : (
          <Typography>There are currently no lists in your board.</Typography>
        )
      ) : null}
    </Stack>
  );
};

export default Board;
