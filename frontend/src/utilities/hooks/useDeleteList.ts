import { useState } from "react";
import { useApi } from "../api";

const useDeleteList = () => {
  const { request } = useApi();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteList = async (board_id: string, list_id: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await request({
        url: `/boards/${board_id}/lists/${list_id}`,
        method: "DELETE",
      });

      return response.data;
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else setError("An unknown error occurred");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { deleteList, loading, error };
};

export default useDeleteList;
