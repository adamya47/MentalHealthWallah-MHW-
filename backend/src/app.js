import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"


export const app=express()

app.use(cookieParser())

app.use(cors({
origin:process.env.CORS_ORIGIN,
credentials:true
}))

app.use(express.json({
    limit:"16kb"
}))

app.use(express.urlencoded({extended:true,limit:"16kb"}))//extended true means object inside object


//routes import

import { userRouter } from "./routes/user.routes.js"

//route declaration
  

app.use("/api/v1/users",userRouter)



//error handling middleware should have 4 arguments this tells express that its an error handling middleware

app.use((err,req,res,next) => {
  console.error(err.stack); // Log the error stack for debugging
  // Set the response status code and message
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});
