import express from "express";

import {
  createUser,
  deleteUser,
  getUsers,
  getUserById,
  updateUser,
} from "../controllers/users.js";

const router = express.Router();

// all routes in here starting with /users
router.get("/", getUsers);

router.post("/", createUser);

router.get("/:id", getUserById);

router.delete("/:id", deleteUser);

router.patch("/:id", updateUser);

export default router;
