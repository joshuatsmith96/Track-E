import api from "./index";
import type { Board } from "../../types/Board";

export const getBoards = async (): Promise<Board[]> => {
  const res = await api.get("/boards/me");
  return res.data;
};
