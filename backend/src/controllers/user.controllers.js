import { asyncHandler } from "../utillities/asyncHandler.js";
import { ApiResponse } from "../utillities/ApiResponse.js";
import { ApiError } from "../utillities/ApiError.js";
import { User } from "../models/user.model.js";
import mongoose from "mongoose";


const generateAccessandRefreshToken=asyncHandler(async(userId)=>{

    try {
        const user=await User.findById(userId)
     if(!user){
        throw new ApiError(400,"No user found with matching id")
     }
     const accessToken=user.generateAccessToken();//we used it with user instead of User cause this keyword in the fucntion needs to refer to a document
     const refreshToken=user.generateRefreshToken();

     user.refreshToken=refreshToken;

     await user.save({validateBeforeSave:false})
     return{accessToken,refreshToken}

    } catch (error) {
        throw new ApiError(400,"Error while generating tokens")
    }

})


const createUser=asyncHandler(async(req,res)=>{

   try {
     const{username,password}=req.body;
     
 if([username,password].some((field)=>field?.trim()==="")){
     throw new ApiError(400,"Username or password not obtained,please fill all the fields")
 }
 
 const existedUser=await User.findOne({username})
 
 if(existedUser){
     throw new ApiError(400,"Another User with same username already exists")
 }

 
 const user=await User.create({username,password})


 
 if(!user){
     throw new ApiError(500,"Error while creating user account,Please Try Again")
 } 
 
 
 const {accessToken,refreshToken}=generateAccessandRefreshToken(user._id);
 
 user.refreshToken=refreshToken

 await user.save({validateBeforeSave:false})

 const options={
    httpOnly:true,
    secure:true
 }

 
 const createdUser=await User.findById(user._id).select("-password -refreshToken -moodEnteries -mentalResult")
 





 return res.status(201).json(new ApiResponse(201,{user:createdUser,
                                                    accessToken},"User created Successfully"))
            .cookie("accessToken",accessToken,options)
 .cookie("refreshToken",refreshToken,options)

   } catch (error) {
    throw new ApiError(400,"Something went wrong while creating the user")
   }


})

const loginUser=asyncHandler(async(req,res)=>{

const{username,password}=req.body;

if([username,password].some(field=>field?.trim()===""))
throw new ApiError(400,"Please fill all the fields")



const user=await User.findOne({username})
if(!user){
    throw new ApiError(400,"No user found with matching username")
}

const passwordValid=await user.isPasswordCorrect(password);

if(!passwordValid){
    throw new ApiError(400,"Please enter correct password")
}

const{accessToken,refreshToken}=generateAccessandRefreshToken(user._id);

user.refreshToken=refreshToken;
await user.save({validateBeforeSave:false})

const loggedInUser=await User.findById(user._id).select("-password -refreshToken -moodEnteries -mentalResult")

const options={
    httpOnly:true,
    secure:true
}

return res.status(200).cookie("accessToken",accessToken,options)
.cookie("refreshToken",refreshToken,options)
.json(new ApiResponse(200,{user:loggedInUser,accessToken},"User Logged in successfully"))

})

//use the verifyJWT middleware for this
const logoutUser=asyncHandler(async(req,res)=>{

   try {

    await User.findByIdAndUpdate(req?.user?._id,{
        $unset:{refreshToken:1}
    },
    {
        new :true
    }  )

    const options={
        httpOnly:true,
        secure:true
    }


return res.status(200).clearCookie("accessToken",options)
          .clearCookie("refreshToken",options)
        .json(new ApiResponse(200,{},"User logged out successfully"))

   } catch (error) {
    throw new ApiError(500,"Some issue while logging you out")
   }


})



export {generateAccessandRefreshToken,createUser,loginUser,logoutUser}



