import { Stack, Typography } from "@mui/material";
import useBoards from "../../utilities/hooks/useBoards";
import CreateBoardDialog from "../../components/CreateBoardDialog";
import useCreateBoard from "../../utilities/hooks/useCreateBoard";
import { useState, useEffect } from "react";
import BoardContainer from "./Parts/BoardContainer";
import type { Board } from "../../types/Board";

const Boards = () => {
  const { boards: fetchedBoards, loading, error } = useBoards();
  const [boards, setBoards] = useState<Board[] | undefined>(fetchedBoards);
  const [open, setOpen] = useState(false);
  const { createBoard } = useCreateBoard();

  // Initialize local boards state when fetch completes
  useEffect(() => {
    setBoards(fetchedBoards);
  }, [fetchedBoards]);

  const handleCreate = async (name: string) => {
    const newBoard = await createBoard(name);
    if (newBoard) {
      setBoards((prev) => (prev ? [newBoard, ...prev] : [newBoard]));
      setOpen(false);
    }
  };

  return (
    <Stack spacing={3}>
      <CreateBoardDialog
        open={open}
        onClose={() => setOpen(false)}
        onCreate={handleCreate}
      />

      <Typography variant="h5" fontWeight="bold">
        My Boards
      </Typography>

      <BoardContainer boards={boards} onCreateClick={() => setOpen(true)} />

      {loading && <Typography>Loading boards...</Typography>}
      {error && <Typography color="error">{error}</Typography>}
    </Stack>
  );
};

export default Boards;
