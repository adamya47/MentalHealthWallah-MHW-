import React, { useState, useEffect } from 'react';
import AudioPlayer from 'react-h5-audio-player';

const BreathingExercise = () => {

    const[back,setBack]=useState("bg-gradient-to-r to-teal-200 from-blue-800")

    const[sound,setSound]=useState("/weightless.mp3")
    const sounds=["/Om.mp3","/weightless.mp3","/birds.mp3"]
     
    const options=["bg-gradient-to-r to-yellow-200 from-blue-800","bg-gradient-to-r to-teal-200 from-blue-800","bg-gradient-to-r to-teal-200 from-teal-800"]

    const backChange=(int)=>{
        setBack(options[int]);
        setSound(sounds[int])
    }

  const [step, setStep] = useState(0);
  const [breathing, setBreathing] = useState(false);

  //steps,0 pe inhale 1 for hold,at 2 exhale

  useEffect(
    () => {
    if (breathing) {
      const interval = setInterval(() => {
        console.log("yes");
        setStep((prev) => (prev+ 1) % 3);
      }, 4000); 
      
      return () => clearInterval(interval);
    }
  },

  [breathing]);



  const startBreathing = () => {
    setBreathing(true);
  };

  const stopBreathing = () => {
    setBreathing(false);
    setStep(0);
  };

  return (

 <div className={`h-auto ${back}`}>

 <div className={`flex flex-col items-center mt-20 ${back}`}>
<div className='flex flex-row justify-around'>

<h2 class="text-3xl sm:text-3xl md:text-3xl font-extrabold tracking-tight text-gray-900 leading-tight mb-9">
Box Breathing(4-4-4) calms the mind, reduces stress, and improves focus.
</h2>
<div className="space-x-4 ml-10">
        <button
          onClick={() => backChange(0)}
          className="px-4 py-2 bg-red-300 hover:bg-red-400 text-white font-bold rounded transition"
        >
          Vibrant
        </button>

        
        <button
          onClick={() => backChange(1)}
          className="px-4 py-2 bg-blue-300 hover:bg-blue-400 text-white font-bold rounded transition"
        >
          Relax
        </button>

       
        <button
          onClick={() => backChange(2)}
          className="px-4 py-2 bg-green-300 hover:bg-green-400 text-white font-bold rounded transition"
        >
          Nature</button> </div>


</div>


<div className="flex flex-col items-center justify-center p-4">
  <div
    className={`transition-transform duration-1000 ease-in-out w-36 h-36 rounded-full bg-blue-300 mb-6 flex items-center justify-center
    ${step === 0 ? 'scale-125' : step === 1 ? 'scale-110' : 'scale-100'}`}
  >

    <span className="text-3xl font-bold text-blue-800">{step === 0 ? '🌬️' : step === 1 ? '⏸️' : '💨'}</span>
  </div>
  
  <p className="text-3xl sm:text-3xl md:text-3xl font-extrabold tracking-tight text-gray-900 leading-tight mb-9">
    {step === 0 ? 'Inhale...' : step === 1 ? 'Hold...' : 'Exhale...'}
  </p>
  
  <button
  onClick={breathing ? stopBreathing : startBreathing}
  className="mt-4 px-6 py-3 w-32 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-white rounded-full shadow-lg hover:shadow-xl hover:from-blue-500 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
>
  {breathing ? 'Stop' : 'Start'}
</button>

</div>
</div>

{breathing?

   (<AudioPlayer
        autoPlay
        src={sound}
        onEnded={(e) => {
            e.target.play(); 
          }}
   className='hidden'
      />):null }

</div>

   
  );
};

export default BreathingExercise;
