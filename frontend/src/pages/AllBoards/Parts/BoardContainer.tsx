import { Stack } from "@mui/material";
import BoardTile from "./BoardTile";
import type { Board } from "../../../types/Board";
import { MainCreateBoardButton } from "../../../components/CreateBoardButton";

interface BoardContainerProps {
  boards?: Board[];
  onCreateClick: () => void;
  onDelete?: (boardID: string) => void;
}

const BoardContainer = ({
  boards,
  onCreateClick,
  onDelete,
}: BoardContainerProps) => {
  return (
    <Stack
      direction="row"
      gap={2}
      flexWrap="wrap"
      sx={{
        justifyContent: {
          xs: "center",
          sm: "unset",
        },
      }}
    >
      <MainCreateBoardButton onClick={onCreateClick} />
      {boards?.map((board) => (
        <BoardTile
          key={board.board_id}
          boardID={board.board_id}
          title={board.board_name}
          createdBy={board.created_by}
          lastEdited={board.board_updated_date}
          onDelete={onDelete}
        />
      ))}
    </Stack>
  );
};

export default BoardContainer;
