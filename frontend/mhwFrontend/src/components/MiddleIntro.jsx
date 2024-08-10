import React from 'react'
import { useNavigate } from 'react-router-dom'

function MiddleIntro() {

  const navigate=useNavigate();
  return (
    <section class="bg-teal-500 text-black">
  <div class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
    <div class="mx-auto max-w-lg text-center">

    <h2 class="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">
    MHW FOR YOUR MHW
   
  </h2>
  <p class="text-3xl sm:text-4xl font-light text-gray-800">
   Mental Health Wallah 

    
    </p>
    <p class="text-3xl sm:text-4xl font-light text-gray-800">
   
   for your 
    
    </p>
    <p class="text-3xl sm:text-4xl font-light text-gray-800">
   
    Mental Health Wellness
    
    </p>

    </div>
    <h2 class="mt-4 text-xl font-extrabold tracking-tight text-gray-900 leading-tight">we provide</h2>


    <div class="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">

      <div
        class="block rounded-xl border border-gray-600 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10 hover:bg-sky-400 hover:cursor-pointer"
         onClick={()=>navigate("/testPHQ9")}
      >
         <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      height="64px"
      width="64px"
    
    >
      <path d="M12 3L1 9l11 6 9-4.91V17h2V9M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" />
    </svg>
      

        <h2 class="mt-4 text-xl font-bold text-black">Mental Health Assessment</h2>

        <p class="mt-1 text-sm text-black text-2xl font-semibold">
        It is designed to evaluate the severity of depression through the administration of the Patient Health Questionnaire-9 (PHQ-9).
        It is based on diagnostic criteria for depression as per the DSM-IV (Diagnostic and Statistical Manual of Mental Disorders, Fourth Edition).
        </p>
      </div>
      <a
        class="block rounded-xl border border-gray-600 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10 hover:bg-sky-400"
        href="#"
      >
     
     <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      height="64px"
      width="64px"
     
    >
      <path d="M10 20a10 10 0 110-20 10 10 0 010 20zm0-2a8 8 0 100-16 8 8 0 000 16zM6.5 9a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm7 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm2.16 3a6 6 0 01-11.32 0h11.32z" />
    </svg>

        <h2 class="mt-4 text-xl font-bold text-black">Mood Tracker</h2>

        <p class="mt-1 text-sm text-black text-2xl font-semibold">
        A mood tracker function monitors individual moods, visualizes trends graphically, and provides tailored suggestions based on mood patterns for better emotional management.
        </p>
      </a>
      <a
        class="block rounded-xl border border-gray-600 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10 hover:bg-sky-400"
        href="#"
      >
     
    

<svg
      viewBox="0 0 512 512"
      fill="currentColor"
      height="64px"
      width="64px"
      
    >
      <path d="M184 0c30.9 0 56 25.1 56 56v400c0 30.9-25.1 56-56 56-28.9 0-52.7-21.9-55.7-50.1-5.2 1.4-10.7 2.1-16.3 2.1-35.3 0-64-28.7-64-64 0-7.4 1.3-14.6 3.6-21.2C21.4 367.4 0 338.2 0 304c0-31.9 18.7-59.5 45.8-72.3C37.1 220.8 32 207 32 192c0-30.7 21.6-56.3 50.4-62.6C80.8 123.9 80 118 80 112c0-29.9 20.6-55.1 48.3-62.1 3-28 26.8-49.9 55.7-49.9zm144 0c28.9 0 52.6 21.9 55.7 49.9C411.5 56.9 432 82 432 112c0 6-.8 11.9-2.4 17.4 28.8 6.2 50.4 31.9 50.4 62.6 0 15-5.1 28.8-13.8 39.7 27.1 12.8 45.8 40.4 45.8 72.3 0 34.2-21.4 63.4-51.6 74.8 2.3 6.6 3.6 13.8 3.6 21.2 0 35.3-28.7 64-64 64-5.6 0-11.1-.7-16.3-2.1-3 28.2-26.8 50.1-55.7 50.1-30.9 0-56-25.1-56-56V56c0-30.9 25.1-56 56-56z" />
    </svg>

      

        <h2 class="mt-4 text-xl font-bold text-black">AI ChatBot-"Dost"</h2>

        <p class="mt-1 text-sm text-black text-2xl font-semibold">
        An AI chatbot called "Dost" allows you to have interactive conversations, providing instant responses, personalized assistance.
        </p>
      </a>


     

      

      

      

    
    </div>

  
  </div>
</section>
  )
}

export default MiddleIntro