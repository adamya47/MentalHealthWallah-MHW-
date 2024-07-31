import 'dotenv/config' //DO THIS step ASAP always
import { app } from './app.js';
import { connectDB } from './db/indexDb.js';



           //can be done if connectDb return a promise
connectDB().then(()=> app.listen(process.env.PORT || 3000 ,()=>console.log("SERVER LISTENING TO PORT ",process.env.PORT))
                        
) .catch(err=>console.log("DB CONNECTION FAILED",err)) ;




    





