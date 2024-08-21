import { Schema } from "mongoose";
import mongoose from "mongoose";



const moodSchema=new Schema({
    mood:{
        type:String,
        enum:["Sad","Happy","Neutral"],
        required:true
    }
})

export const Mood=mongoose.model("Mood",moodSchema)

