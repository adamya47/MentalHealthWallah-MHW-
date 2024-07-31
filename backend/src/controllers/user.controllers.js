import { asyncHandler } from "../utillities/asyncHandler.js";
import { ApiResponse } from "../utillities/ApiResponse.js";
import { ApiError } from "../utillities/ApiError.js";
import { User } from "../models/user.model.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken"


const generateAccessandRefreshToken = async (userId) => { //asyncHandler not used here it was affecting the normal flow
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new ApiError(400, "No user found with matching id");
        }

        const accessToken =  await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

         return { accessToken, refreshToken };
        

    } catch (error) {
        console.error('Error in generateAccessandRefreshToken:', error); // Debugging line
        throw new ApiError(500, "Token generation failed");
    }
};



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
console.log(".yeh rahi id",user._id)

 
 if(!user){
     throw new ApiError(500,"Error while creating user account,Please Try Again")
 } 
 

 let tokens;
 try {
     tokens = await generateAccessandRefreshToken(user._id);
 } catch (error) {
     console.error('Error in token generation:', error); // Debugging line
     throw new ApiError(500, "Error generating tokens");
 }

 if (!tokens || !tokens.accessToken || !tokens.refreshToken) {
     console.error('Tokens are undefined:', tokens); // Debugging line
     throw new ApiError(500, "Tokens are undefined");
 }

 const { accessToken, refreshToken } = tokens;
 console.log('Access and Refresh tokens:', { accessToken, refreshToken }); // Debugging line

 
 user.refreshToken=tokens.refreshToken

 await user.save({validateBeforeSave:false})

 const options={
    httpOnly:true,
    secure:true
 }

 
 const createdUser=await User.findById(user._id).select("-password -refreshToken -moodEnteries -mentalResult")
 





 return res.status(201) .cookie("accessToken",accessToken,options)
 .cookie("refreshToken",refreshToken,options)
 .json(new ApiResponse(201,{user:createdUser,},"User created Successfully"))

   }

 catch (error) {
    throw new ApiError(400,error || "Something went wrong while creating the user")
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
        
        const{accessToken,refreshToken}=await generateAccessandRefreshToken(user._id);
        
        user.refreshToken=refreshToken;
        await user.save({validateBeforeSave:false})
        
        const loggedInUser=await User.findById(user._id).select("-password -refreshToken -moodEnteries -mentalResult")
        
        const options={
            httpOnly:true,
            secure:true
        }
        return res.status(200).cookie("accessToken",accessToken,options)
                              .cookie("refreshToken",refreshToken,options)
                              .json(new ApiResponse(200,loggedInUser,"User Logged in successfully"))
        
    // catch(error){
    //   throw new ApiError(400,error.message || "something went wrong")
    //  // next(error)
    // }
}) 

//use the verifyJWT middleware for this
const logoutUser=asyncHandler(async(req,res)=>{

   

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

   


})

const refreshAccessToken=asyncHandler(async(req,res)=>{

    const incomingRefreshToken=req.cookies.refreshToken || req.body.refreshToken

    if(!incomingRefreshToken){
        throw new ApiError(400,"Unauthorized Request")
    }
 
    
        
        const decodedToken=await jwt.verify(incomingRefreshToken,process.env.REFRESH_TOKEN_SECRET)
        if(!decodedToken){
            throw new ApiError(400,"INVALID TOKEN")
        }
        const user=await User.findById(decodedToken._id);
        
       if(!user){
        throw new ApiError(400,"INVALID REFRESH TOKEN")
       }

   //CHECKING INCOMING REFRESH TOKEN AND TOKEN IN DB

  if(incomingRefreshToken !== user?.refreshToken){
    throw new ApiError(400,"Refresh token is expired")
  }


        const {accessToken,refreshToken}=await generateAccessandRefreshToken(user._id);

        user.refreshToken=refreshToken;

        await user.save({validateBeforeSave:false})

        const options={
            httpOnly:true,
            secure:true,
        }

        res.status(200).cookie("refreshToken",refreshToken,options)
                        .cookie("accessToken",accessToken,options)
                        .json(new ApiResponse(200,{refreshToken,accessToken},"Access token refreshed"))
    

})

const getCurrentUser=asyncHandler(async(req,res)=>{


return res.status(200).json(new ApiResponse(200,req.user,"Current user fetched!"))

})



export {generateAccessandRefreshToken,createUser,loginUser,logoutUser,refreshAccessToken,getCurrentUser}



