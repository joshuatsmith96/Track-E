import { Stack, Typography } from "@mui/material";
import useBoards from "../../utilities/hooks/useBoards";
import BoardTile from "./Parts/BoardTile";
import type { Board } from "../../types/Board";
import { MainCreateBoardButton } from "../../components/CreateBoardButton";

const Boards = () => {
  const { boards } = useBoards();

  return (
    <Stack>
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
        My Boards
      </Typography>
      <Stack direction="row" gap={2}>
        <MainCreateBoardButton />
        {boards
          ? boards.map((board: Board) => (
              <BoardTile
                title={board.board_name}
                createdBy={board.created_by}
                lastEdited={board.board_updated_date}
              />
            ))
          : ""}
      </Stack>
    </Stack>
  );
};

export default Boards;
