import { useState } from "react";
import { useApi } from "../api";

const useDeleteBoard = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { request } = useApi();

  const deleteBoard = async (boardId: string | number): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      await request({
        url: `/boards/${boardId}`,
        method: "DELETE",
      });
      return true;
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else setError("An unknown error occurred");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { deleteBoard, loading, error };
};

export default useDeleteBoard;
