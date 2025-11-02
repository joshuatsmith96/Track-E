import { Stack } from "@mui/material";
import BoardTile from "./BoardTile";
import type { Board } from "../../../types/Board";
import { MainCreateBoardButton } from "../../../components/CreateBoardButton";
import { memo } from "react";

interface BoardsGridProps {
  boards?: Board[];
  onCreateClick: () => void;
}

const BoardContainer = memo(({ boards, onCreateClick }: BoardsGridProps) => {
  return (
    <Stack direction="row" gap={2} flexWrap="wrap">
      <MainCreateBoardButton onClick={onCreateClick} />
      {boards?.map((board) => (
        <BoardTile
          key={board.board_id}
          title={board.board_name}
          createdBy={board.created_by}
          lastEdited={board.board_updated_date}
        />
      ))}
    </Stack>
  );
});

export default BoardContainer;
