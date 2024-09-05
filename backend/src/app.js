import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"


export const app=express()


const corsOptions={
  origin:'https://mental-health-wallah-mhw.vercel.app',
  credentials: true
  }

app.use(cors(corsOptions))

app.use(cookieParser())

//option for preFlight request
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin','https://mental-health-wallah-mhw.vercel.app');  // Replace with your frontend domain
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Methods you allow
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Headers you allow
  res.sendStatus(200); // Respond with status 200 OK
});

app.use(express.json({
    limit:"16kb"
}))

app.use(express.urlencoded({extended:true,limit:"16kb"}))//extended true means object inside object


//routes import

import { userRouter } from "./routes/user.routes.js"

import moodRouter from "./routes/mood.routes.js"
//route declaration
  

app.use("/api/v1/users",userRouter);
app.use("/api/v1/moodTracker",moodRouter);


//error handling middleware should have 4 arguments this tells express that its an error handling middleware

app.use((err,req,res,next) => {
  console.error(err.stack); // Log the error stack for debugging
  // Set the response status code and message
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});


