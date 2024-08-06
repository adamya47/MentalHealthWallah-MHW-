import { ApiError } from "../utillities/ApiError.js";
import { ApiResponse } from "../utillities/ApiResponse.js";
import { asyncHandler } from "../utillities/asyncHandler.js";
import axios from "axios"

const analyzeInput=asyncHandler(async(req,res)=>{

   
    const{userResponse}=req.body;
 
    if(userResponse===""){
        throw new ApiError(400,"Nothing to analyse");
    }

    const text = `Please provide a detailed paragraph of mental health analysis and treatment of the following statement : "${userResponse}"`;
    
    const anaylsedResponse= await axios.post(process.env.AI_API_URL,
        {inputs:text
    },{headers:{
        Authorization:`Bearer ${process.env.AI_API_KEY}`
    }});

    if(!anaylsedResponse){
        throw new ApiError(400,"Failed to obtain analysed response")
    }

    const analysedData=anaylsedResponse.data;
 
    if(!analysedData){
        throw new ApiError(500,"Some issue while analysing response try again")
    }
   
    if(analysedData){
        res.status(200).json(new ApiResponse(200,analysedData,"Data obtained"))
    }

})


export {analyzeInput}