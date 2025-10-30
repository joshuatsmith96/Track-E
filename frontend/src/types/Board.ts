import type { List } from "./List";

export interface Board {
  _id: string;
  board_id: string;
  board_name: string;
  board_creation_date: string;
  board_updated_date: string;
  lists: List[];
  users: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
