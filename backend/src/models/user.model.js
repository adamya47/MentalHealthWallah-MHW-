import mongoose,{Schema} from "mongoose"
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"

const userSchema=new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        index:true
    },
password:{
    type:String,
    required:true,
    trim:true,
},

moodEnteries:[{
    type:Schema.Types.ObjectId,
    ref:"Mood"
}],

mentalResult:[{
    type:Schema.Types.ObjectId,
    ref:"Assessment"
}],

refreshToken:{
type:String,
}

},{timestamps:true})



userSchema.pre("save",async function(next){

if(!this.isModified("password"))return next();

this.password=await bcrypt.hash(this.password,10)

})



userSchema.methods.isPasswordCorrect=async function(password){

    return await bcrypt.compare(password,this.password);

}


userSchema.methods.generateAccessToken=async function(){
try {
    
    return jwt.sign({
        _id:this._id,
         username:this.username,
         password:this.password,
    
     },
     process.env.ACCESS_TOKEN_SECRET,
     {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY 
     }
    )
    
    
} catch (error) {
    console.log(error)
    
}
}


userSchema.methods.generateRefreshToken=async function(){

    return  jwt.sign({_id:this._id},process.env.REFRESH_TOKEN_SECRET,{
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    })
}



 export const User=mongoose.model("User",userSchema)