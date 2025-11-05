import { useState } from "react";
import { useApi } from "../api";

const useUpdateList = () => {
  const { request } = useApi();
  const [loading, setLoading] = useState(false);

  const updateList = async (
    boardId: string,
    listId: string,
    data: { list_name: string }
  ) => {
    setLoading(true);
    try {
      const response = await request({
        url: `/boards/${boardId}/lists/${listId}`,
        method: "PUT",
        data,
      });
      return response.data;
    } catch (error) {
      console.error("Error updating list:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { updateList, loading };
};

export default useUpdateList;
