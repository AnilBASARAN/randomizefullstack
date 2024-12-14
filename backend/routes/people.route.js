import express from "express";
import { getAllPeople, getPersonById } from "../controllers/people.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { checkAuth } from "../controllers/auth.controller.js";

const router = express.Router();

// Route for fetching all people with filters
router.get("/", getAllPeople);

// Route for fetching a specific person by ID
router.get("/:personId", getPersonById);

export default router;
