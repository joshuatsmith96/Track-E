import { useState } from "react";
import { useApi } from "../api";

interface ListItem {
  list_id?: string;
  list_text?: string;
  status?: string;
  order_in_list?: number;
}

interface CreateListData {
  list_name: string;
  list_status: string;
  list_items: ListItem[];
  order_in_board: number;
}

const useCreateList = () => {
  const { request } = useApi();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createList = async (board_id: string, listData: CreateListData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await request({
        url: `/boards/${board_id}/lists`,
        method: "PATCH",
        data: listData,
      });

      // Backend returns the updated board, so extract the newest list
      const updatedBoard = response.data;
      const newList = updatedBoard?.lists?.[updatedBoard.lists.length - 1];

      return newList || null;
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else setError("An unknown error occurred");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { createList, loading, error };
};

export default useCreateList;
