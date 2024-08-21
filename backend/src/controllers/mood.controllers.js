import { asyncHandler } from "../utillities/asyncHandler.js";
import { ApiError } from "../utillities/ApiError.js";
import { ApiResponse } from "../utillities/ApiResponse.js";
import { Mood } from "../models/mood.model.js";
import { User } from "../models/user.model.js";


const addMood=asyncHandler(async(req,res)=>{

    try {
    
        const {moodEntry}=req.body;

    if(!moodEntry){
        throw new ApiError(400,"No mood entry obtained")
    }

    const moodEntered=await Mood.create({mood:moodEntry})
   
    if(!moodEntered){
        throw new ApiError(500,"Error during the process of saving the entered mood")
    }
    const user=req.user;

    if(!user){
        throw new ApiError(400,"Error while obtianing user")
    }

    const userWithMoodAddition=await User.findByIdAndUpdate(user._id,
        { $push:{moodData:moodEntered._id} } ,
    {new:true})

    if(!userWithMoodAddition){
        throw new ApiError(500,"Issue while updating user database")
    }

 


    return res.status(200).json(new ApiResponse(200,moodEntered,"Mood Entered Successfully"))

        
    
    
    } catch (error) {
        throw new ApiError(400,error || "Something went wrong while adding the mood")
    }

})

const getMoods=asyncHandler(
    
    async(req,res)=>{
        
        const user= await req.user.populate("moodData");//populate() helps to replace all the ids with actual document ,it doesnt alter the original wala though
    
        const allMoods=user.moodData.map((field)=>field.mood)

    return res.status(200).json(new ApiResponse(200,allMoods,"All the moodEntries obtained successfully") )
}

)

export {addMood,getMoods}
