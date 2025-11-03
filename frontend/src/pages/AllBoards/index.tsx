import { Stack, Typography } from "@mui/material";
import useBoards from "../../utilities/hooks/useBoards";
import CreateBoardDialog from "../../components/CreateBoardDialog";
import useCreateBoard from "../../utilities/hooks/useCreateBoard";
import { useState, useEffect } from "react";
import BoardContainer from "./Parts/BoardContainer";
import type { Board } from "../../types/Board";
import { useUser } from "@clerk/clerk-react";

const AllBoards = () => {
  const { boards: fetchedBoards, loading, error } = useBoards();
  const { user } = useUser();
  const fullName = user?.firstName + " " + user?.lastName;

  console.log("BOARDS", fetchedBoards);
  const [boards, setBoards] = useState<Board[] | undefined>(fetchedBoards);
  const [open, setOpen] = useState(false);
  const { createBoard } = useCreateBoard();

  useEffect(() => {
    setBoards(fetchedBoards);
  }, [fetchedBoards]);

  const handleCreate = async (name: string) => {
    const newBoard = await createBoard(name, fullName);
    if (newBoard) {
      setBoards((prev) => (prev ? [newBoard, ...prev] : [newBoard]));
      setOpen(false);
    }
  };

  const handleDelete = (boardID: string) => {
    setBoards((prev) => prev?.filter((b) => b.board_id !== boardID));
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

      <BoardContainer
        boards={boards}
        onCreateClick={() => setOpen(true)}
        onDelete={handleDelete}
      />

      {loading && <Typography>Loading boards...</Typography>}
      {error && <Typography color="error">{error}</Typography>}
    </Stack>
  );
};

export default AllBoards;
