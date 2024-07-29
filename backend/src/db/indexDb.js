import mongoose from "mongoose";


export const connectDB= async ()=>{
    
    try {
   const res = await  mongoose.connect(process.env.MONGODB_URI)
   console.log(`MONGODB CONNECTED AND TO DB HOST  ${res.connection.host}`)

       } 
catch (error) {
    console.log("DB CONNECTION FAILED ",error);
       process.exit(1);
}
}