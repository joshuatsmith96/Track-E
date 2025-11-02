import { useState } from "react";
import { useApi } from "../api/index.ts";
import type { Board } from "../../types/Board";

interface CreateBoardBody {
  board_name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  lists: any[];
}

const useCreateBoard = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { request } = useApi();

  const createBoard = async (boardName: string): Promise<Board | null> => {
    setLoading(true);
    setError(null);

    try {
      const body: CreateBoardBody = {
        board_name: boardName,
        lists: [],
      };

      const response = await request({
        url: "/boards",
        method: "POST",
        data: body, // <-- fixed here
      });

      return response.data as Board; // or response.data.data if your backend wraps it
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
