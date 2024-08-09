import { User } from "../models/user.model.js";
import { ApiError } from "../utillities/ApiError.js";
import { asyncHandler } from "../utillities/asyncHandler.js";
import jwt from "jsonwebtoken"

export const verifyJWT=asyncHandler(async(req,_,next)=>{

  
      const token=req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")
  
      if(!token){
          throw new ApiError(400,"Unauthorized request")
      }
  
   
   const decodedToken=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
  
  if(!decodedToken){
   throw new ApiError(400,"Token related issue");
  }
  
   const user=await User.findById(decodedToken?._id).select("-password -refreshToken")
   if(!user){
      throw new ApiError(400,"TOKEN NOT AUTHORIZED")
   }
  
  
   req.user=user;
  
   next();
  
  

})