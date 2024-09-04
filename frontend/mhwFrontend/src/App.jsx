import Footer from "./components/Footer"
import { Outlet, useNavigate } from "react-router-dom"
import Navbar from "./components/Navbar"
import { useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import axios from "axios"
import { logout } from "./store/userSlice"



function App() {

  const navigate=useNavigate();
  const dispatch=useDispatch();

  useEffect(()=>{
 
   (async()=>{


      try {


        const currentUser=await axios.get("https://mhw-backend.vercel.app/api/v1/users/currentUser")
 
    if(currentUser){
      navigate("home")
    }else{
      navigate("mhw")
      dispatch(logout())
    }
      
      }
       catch (error) {
    navigate("mhw")
    dispatch(logout())
  console.log(error)
        
      }


    })()

    
  },[navigate,dispatch])

  return (
   <>
   <Navbar/>

<Outlet/>
   
   <Footer/>
   </>
  )
}

export default App
