// utilities/hooks/useUpdateListItem.ts
import { useState } from "react";
import { useApi } from "../api";

const useUpdateListItem = () => {
  const { request } = useApi();
  const [loading, setLoading] = useState(false);

  const updateListItem = async (
    boardId: string,
    listId: string,
    listItemId: string,
    data: { list_text?: string; status?: "Complete" | "NotComplete" }
  ) => {
    setLoading(true);
    try {
      const res = await request({
        method: "PUT",
        url: `/boards/${boardId}/lists/${listId}/items/${listItemId}`,
        data,
      });
      return res.data;
    } catch (err) {
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { updateListItem, loading };
};

export default useUpdateListItem;
