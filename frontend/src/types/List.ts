import type { ListItem } from "./ListItem";

export interface List {
  list_name: string;
  list_status: string;
  list_items: ListItem[];
  order_in_board: number;
}
