import { Router } from "express";
import { addMood,getMoods } from "../controllers/mood.controllers.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const moodRouter=Router();

moodRouter.route("/addMood").post(verifyJWT,addMood)
moodRouter.route("/getAllMoods").get(verifyJWT,getMoods)

export default moodRouter