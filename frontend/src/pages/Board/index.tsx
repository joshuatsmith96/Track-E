import { Stack, Typography, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import useBoards from "../../utilities/hooks/useBoards";
import BoardList from "./parts/BoardList";
import useCreateList from "../../utilities/hooks/useCreateList";

const Board = () => {
  const { id } = useParams();
  const { boards } = useBoards();

  const { createList, loading, error } = useCreateList();

  const currentBoard = boards?.filter((board) => board.board_id === id)[0];
  const lists = currentBoard?.lists;

  const handleCreateList = async () => {
    const newList = await createList(id, {
      list_name: "My New List",
      list_status: "NotStarted",
      list_items: [],
      order_in_board: 3,
    });

    if (newList) {
      console.log("List created:", newList);
    }
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
      <Button
        variant="contained"
        sx={{ width: "fit-content" }}
        onClick={handleCreateList}
      >
        Add List
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
