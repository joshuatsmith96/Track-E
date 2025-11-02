import { Stack, Typography, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import useBoards from "../../utilities/hooks/useBoards";
import BoardList from "./parts/BoardList";

const Board = () => {
  const { id } = useParams();
  const { boards } = useBoards();

  const currentBoard = boards?.filter((board) => board.board_id === id)[0];
  const lists = currentBoard?.lists;
  console.log(lists);

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
      <Typography variant="h5">
        <strong>{currentBoard?.board_name}</strong>
      </Typography>
      <Stack>
        {lists?.map((list) => (
          <BoardList name={list.list_name} listItems={list.list_items} />
        ))}
      </Stack>
    </Stack>
  );
};

export default Board;
