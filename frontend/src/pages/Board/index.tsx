import { Stack, Typography, Button } from "@mui/material";
import { useParams, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import useBoards from "../../utilities/hooks/useBoards";
import BoardList from "./parts/BoardList";
import useCreateList from "../../utilities/hooks/useCreateList";
import CreateListDialog from "./parts/CreateListDialog";

const Board = () => {
  const { id } = useParams();
  const boardId: string | undefined = id != undefined ? id : "";
  const { boards } = useBoards();
  const { createList } = useCreateList();

  const [open, setOpen] = useState(false);
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
      setOpen(false);
    }
  };

  const handleDeleteList = (listId: string) => {
    setCurrentBoard((prev) =>
      prev
        ? { ...prev, lists: prev.lists?.filter((l) => l.list_id !== listId) }
        : prev
    );
  };

  return (
    <Stack>
      <Button
        variant="outlined"
        sx={{ width: "fit-content", mb: 4 }}
        component={NavLink}
        to="/"
      >
        Back to Boards
      </Button>

      <Button variant="contained" onClick={() => setOpen(true)} sx={{ mb: 2 }}>
        Add New List
      </Button>

      <CreateListDialog
        open={open}
        onClose={() => setOpen(false)}
        onCreate={handleCreateList}
      />

      <Typography variant="h5" sx={{ mb: 2 }}>
        <strong>{currentBoard?.board_name}</strong>
      </Typography>

      <Stack direction="row" gap={2} flexWrap="wrap">
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
    </Stack>
  );
};

export default Board;
