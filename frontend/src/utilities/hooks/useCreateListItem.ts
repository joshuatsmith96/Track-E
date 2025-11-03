import { useState } from "react";
import { useApi } from "../api";

type CreateListItemProps = {
  list_text: string;
  status?: "NotComplete" | "Complete" | "InProgress";
  order_in_list?: number;
};

const useCreateListItem = () => {
  const { request } = useApi();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createListItem = async (
    boardId: string,
    listId: string,
    data: CreateListItemProps
  ) => {
    setLoading(true);
    setError(null);

    try {
      const response = await request({
        url: `/boards/${boardId}/lists/${listId}/items`,
        method: "POST",
        data,
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

  return { createListItem, loading, error };
};

export default useCreateListItem;
