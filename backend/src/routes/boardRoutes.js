// import express from "express";
// import {
//   getBoardsForCurrentUser,
//   getBoardById,
//   createBoard,
//   updateBoard,
//   deleteBoard,
// } from "../controllers/boardController.js";
// import { requireAuth } from "../middleware/auth.js";

// const router = express.Router();
// router.get("/me", requireAuth, getBoardsForCurrentUser);

// router
//   .route("/:board_id")
//   .get(requireAuth, getBoardById)
//   .put(requireAuth, updateBoard)
//   .delete(requireAuth, deleteBoard);

// router.post("/", requireAuth, createBoard);

// export default router;

import express from "express";
import {
  getBoardsForCurrentUser,
  getBoardById,
  createBoard,
  updateBoard,
  deleteBoard,
  addListToBoard,
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

export default router;
