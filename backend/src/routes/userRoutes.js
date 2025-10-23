// import express from "express";
// import { getCurrentUser, createUser } from "../controllers/userController.js";
// import { requireAuth } from "../middleware/auth.js";

// const router = express.Router();

// router.get("/me", requireAuth, getCurrentUser);
// router.post("/", createUser);

// export default router;

import express from "express";
import { getCurrentUser, createUser } from "../controllers/userController.js";
import { mockAuth } from "../middleware/mockAuth.js";

const router = express.Router();

router.get("/me", mockAuth, getCurrentUser);
router.post("/", createUser);

export default router;
