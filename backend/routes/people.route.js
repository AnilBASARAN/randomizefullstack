import express from "express"
import { getAllPeople, getPersonById} from "../controllers/people.controller.js";
import {protectRoute} from "../middleware/auth.middleware.js"
import { checkAuth } from "../controllers/auth.controller.js";
const router = express.Router();

router.get("/",getAllPeople)
router.get('/:personId', getPersonById); // Fetch a specific plant by its 'id'
export default router;