import { useEffect, useState } from "react";
import { useApi } from "../api";

const useBoards = () => {
  const [boards, setBoards] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { request } = useApi();

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const data = await request({
          url: "/boards/me",
          method: "GET",
        });
        console.log("BOARD DATA:", data);
        setBoards(data.data);
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
