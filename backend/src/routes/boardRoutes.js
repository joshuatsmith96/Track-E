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

const router = express.Router();
router.get("/me", mockAuth, getBoardsForCurrentUser);

router
  .route("/:board_id")
  .get(mockAuth, getBoardById)
  .put(mockAuth, updateBoard)
  .delete(mockAuth, deleteBoard);

router.post("/", mockAuth, createBoard);
router.patch("/:board_id/lists", mockAuth, addListToBoard);
router.delete("/:board_id/lists/:list_id", mockAuth, removeListFromBoard);
router.put("/:board_id/lists/:list_id", mockAuth, updateListInBoard);
router.put(
  "/:board_id/lists/:list_id/items/:list_item_id",
  mockAuth,
  updateListItemInBoard
);
router.post("/:board_id/lists/:list_id/items", mockAuth, addListItemToBoard);
router.delete(
  "/:board_id/lists/:list_id/items/:list_item_id",
  mockAuth,
  removeListItemFromBoard
);

export default router;
