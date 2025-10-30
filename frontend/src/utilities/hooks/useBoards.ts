import { useEffect, useState } from "react";
import type { Board } from "../../types/Board";
import { getBoards } from "../api/boards";

const useBoards = () => {
  const [boards, setBoards] = useState<Board[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const data = await getBoards();
        setBoards(data);
      } catch (err) {
        if (err instanceof Error) setError(err.message);
        else setError("An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchBoards();
  }, []);

  return { boards, loading, error };
};

export default useBoards;
