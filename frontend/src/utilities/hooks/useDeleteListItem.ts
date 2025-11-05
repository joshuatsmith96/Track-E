import { useState } from "react";
import { useApi } from "../api";

const useDeleteListItem = () => {
  const { request } = useApi();
  const [loading, setLoading] = useState(false);

  const deleteListItem = async (
    boardId: string,
    listId: string,
    itemId: string
  ) => {
    setLoading(true);
    try {
      const response = await request({
        url: `/boards/${boardId}/lists/${listId}/items/${itemId}`,
        method: "DELETE",
      });
      return response.data;
    } catch (err) {
      console.error("Failed to delete list item:", err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { deleteListItem, loading };
};

export default useDeleteListItem;
