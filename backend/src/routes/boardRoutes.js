import express from "express";
import {
  getBoardsForCurrentUser,
  getBoardById,
  createBoard,
  updateBoard,
  deleteBoard,
  addListToBoard,
  removeListFromBoard,
  updateListInBoard,
  updateListItemInBoard,
  addListItemToBoard,
  removeListItemFromBoard,
} from "../controllers/boardController.js";

import { mockAuth } from "../middleware/mockAuth.js";
import { requireAuth } from "../middleware/auth.js";

const auth = requireAuth;

const router = express.Router();
router.get("/me", auth, getBoardsForCurrentUser);

router
  .route("/:board_id")
  .get(auth, getBoardById)
  .put(auth, updateBoard)
  .delete(auth, deleteBoard);

router.post("/", auth, createBoard);
router.patch("/:board_id/lists", auth, addListToBoard);
router.delete("/:board_id/lists/:list_id", auth, removeListFromBoard);
router.put("/:board_id/lists/:list_id", auth, updateListInBoard);
router.put(
  "/:board_id/lists/:list_id/items/:list_item_id",
  auth,
  updateListItemInBoard
);
router.post("/:board_id/lists/:list_id/items", auth, addListItemToBoard);
router.delete(
  "/:board_id/lists/:list_id/items/:list_item_id",
  auth,
  removeListItemFromBoard
);

export default router;
