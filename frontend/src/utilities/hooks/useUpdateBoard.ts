import { useState } from "react";
import { useApi } from "../api";

const useUpdateBoard = () => {
  const { request } = useApi();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateBoard = async (
    boardId: string,
    data: { board_name?: string }
  ) => {
    setLoading(true);
    setError(null);

    try {
      const response = await request({
        method: "PUT",
        url: `/boards/${boardId}`,
        data,
      });

      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || "Failed to update board");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { updateBoard, loading, error };
};

export default useUpdateBoard;
