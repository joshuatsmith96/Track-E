import type { ListItemType } from "./ListItem";

export interface List {
  list_id: string;
  list_name: string;
  list_status: string;
  list_items: ListItemType[];
  order_in_board: number;
}
