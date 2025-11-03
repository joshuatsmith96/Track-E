import { useState } from "react";
import { useApi } from "../api/index.ts";
import type { Board } from "../../types/Board";

interface CreateBoardBody {
  board_name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  lists: any[];
  created_by: string;
}

const useCreateBoard = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { request } = useApi();

  const createBoard = async (
    boardName: string,
    createdBy: string
  ): Promise<Board | null> => {
    setLoading(true);
    setError(null);

    console.log("CREATED BY", createdBy);

    try {
      const body: CreateBoardBody = {
        board_name: boardName,
        created_by: createdBy,
        lists: [],
      };

      const response = await request({
        url: "/boards",
        method: "POST",
        data: body,
      });

      return response.data as Board;
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else setError("An unknown error occurred");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { createBoard, loading, error };
};

export default useCreateBoard;
