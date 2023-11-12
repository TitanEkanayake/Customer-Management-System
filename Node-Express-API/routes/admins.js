import express from "express";
import { createAdmin, getAdminById, getAdmins } from "../controllers/admins.js";

const router = express.Router();

router.get("/", getAdmins);
router.post("/", createAdmin);
router.get("/:id", getAdminById);

export default router;
