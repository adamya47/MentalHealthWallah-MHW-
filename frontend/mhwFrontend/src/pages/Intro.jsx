import React from 'react'
import { useNavigate } from 'react-router-dom'

function Intro() {

    const navigate=useNavigate()





  return (
    <div><section className="bg-gradient-to-r from-gray-600  to-gray-800 text-white">
    <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
      <div className="mx-auto max-w-3xl text-center">
        <h1
          className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl"
        >
         MHW FOR
  
          <span className="sm:block">YOUR MHW  </span>
        </h1>
  
        <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
         "Mental Health Wallah for your Mental Health Wellness"
         <h1 className="sm:block bg-gradient-to-r from-green-300 via-blue-500 to-purple-600">"Heal, Grow, and Flourish" </h1>
        </p>
  
        <div className="mt-8 flex flex-wrap justify-center gap-4" onClick={()=>navigate("/signup")}>
          <a
            className="block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto 
            hover:cursor-pointer"
            
          >
            Get Started
          </a>
  
        </div>
      </div>
    </div>
  </section></div>
  )
}

export default Intro