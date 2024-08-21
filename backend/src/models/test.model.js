import mongoose,{Schema} from "mongoose";

const testSchema=new Schema({
    result:{
        type:String,
        required:true
    }
},{timestamps:true})

export const Test=mongoose.model("Test",testSchema)