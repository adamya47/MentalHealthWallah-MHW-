import Card from "./components/Card"
import CardL from "./components/CardL"
import Footer from "./components/Footer"
import MiddleIntro from "./components/MiddleIntro"
import { Outlet } from "react-router-dom"

import Navbar from "./components/Navbar"
import AssessmentPage from "./pages/AssessmentPage"
import SignUp from "./pages/SignUp"


function App() {
  

  return (
   <>
   <Navbar/>
   
   <Outlet/>
 
   
   <Footer/>
   </>
  )
}

export default App
