import mongoose,{Schema} from "mongoose";


const affirmationSchema=new Schema({
    affirmation:{
        type:String,
        required:true
    }
},{timestamps:true})

export const Affirmation=mongoose.model("Affirmation",affirmationSchema)