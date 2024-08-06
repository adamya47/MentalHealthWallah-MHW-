import { Router } from "express";
import { analyzeInput } from "../controllers/mentalTest.controllers.js";



export const analysisRouter=Router();


analysisRouter.route("/test").post(analyzeInput)

