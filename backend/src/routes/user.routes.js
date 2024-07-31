import {Router} from "express"
import { createUser,loginUser,logoutUser,refreshAccessToken,getCurrentUser } from "../controllers/user.controllers.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

export const userRouter=Router();

userRouter.route("/register").post(createUser)
userRouter.route("/login").post(loginUser)

//secure routes
userRouter.route("/logout").post(verifyJWT,logoutUser)
userRouter.route("/refreshAccessToken").post(refreshAccessToken)
userRouter.route("/currentUser").post(verifyJWT,getCurrentUser)