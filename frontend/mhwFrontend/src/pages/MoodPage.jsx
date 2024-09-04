import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import DoughNutGraph from '../components/Graph Doughnut/DoughNutGraph';
import axios from 'axios';


function MoodPage() {
    const{handleSubmit,register,setValue,formState:{errors}}=useForm();
    const[chartData,setChartData]=useState([0,0,0])
    const apiURL=process.env.REACT_APP_API_URL;

//yeh sirf start me ek baar render hoga to obtain previous data 

const fetchData=async()=>{

    try {
        const response=await axios.get(`${apiURL}/api/v1/moodTracker/getAllMoods`,{withCredentials:true});
        const dataArray=response.data.data ;

            
const arr=dataArray.reduce((acc,field)=>{

if(field==="Happy")acc[0]+=1;
if(field==="Sad")acc[1]+=1;
if(field==="Neutral")acc[2]+=1;

return acc;//VVP imp step

},[0,0,0])


setChartData(arr)

            
    } catch (error) {
        console.log(error)
    }

}

    useEffect(()=>{

        fetchData();
        

    },[])


    

    const[happy,setHappy]=useState(false)
    const[sad,setSad]=useState(false)
    const[neutral,setNeutral]=useState(false)

    const happyFunc=()=>{

        setHappy(prev=>prev?prev:true)
        setSad(false)
        setNeutral(false)
        setValue("moodEntry","Happy")
    }
    const SadFunc=()=>{
        setHappy(false)
        setSad(prev=>prev?prev:true)
        setNeutral(false)
        setValue("moodEntry","Sad")
    }
    const NeutralFunc=()=>{
        setHappy(false)
        setSad(false)
        setNeutral(prev=>prev?prev:true)
        setValue("moodEntry","Neutral")
    }



    const submitFunc=async(data)=>{

try {
    

const response=await axios.post("/api/v1/moodTracker/addMood",data,{withCredentials:true});
if(response.data){
    fetchData()
}
setHappy(false);
setSad(false);
setNeutral(false);
setValue("moodEntry","")
} catch (error) {
    console.log("error while submmiting ",error)
}



    }
  

  return (
   
 
    <div className='w-full h-full bg-gradient-to-r from-teal-400 to-teal-800'>


<h1 className='text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight  '>Mood Tracker</h1>
<p className='text-2xl sm:text-2xl md:text-2xl font-extrabold tracking-tight text-gray-900 leading-tight flex justify-center'>Select your current mood</p>
        <div className='flex justify-center items-center'>    

     {/* concept i learned here -transition-all: This adds a smooth transition for all properties that change on hover (e.g., padding, border width). */}


        <span className={`text-9xl hover:cursor-pointer rounded-full transition-all hover:border-4 hover:border-white hover:p-4 ${happy?"border-4 border-x-cyan-700 p-4":""}`}
        onClick={()=>happyFunc()}
        >😊</span>

<span className={`text-9xl hover:cursor-pointer rounded-full transition-all hover:border-4 hover:border-white hover:p-4 ${sad?"border-4 border-x-cyan-700 p-4":""}`}
    onClick={()=>SadFunc()}
    >😔</span>

    <span className={`text-9xl hover:cursor-pointer rounded-full transition-all hover:border-4 hover:border-white hover:p-4 ${neutral?"border-4 border-x-cyan-700 p-4":""}`}
    onClick={()=>NeutralFunc()}
    >😐</span>
     
   
        </div>
        
            <form onSubmit={handleSubmit(submitFunc)}>

            <div className='flex justify-center mt-9'>
                <input type='hidden' {...register("moodEntry",{required:"Select your current mood "})}/>
            <button className="bg-gradient-to-r from-red-500 to-red-700 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:from-red-600 hover:to-red-800 hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105 ">
      Submit
    </button>

   
        </div>
        {errors.moodEntry && (<p className="text-red-600 font-bold flex justify-center">{errors.moodEntry.message}</p>)}
            </form>
       
<div className='w-full flex justify-center mt-4' >

   <div className='w-1/3 '>
   <DoughNutGraph dataFromUser={chartData}/>
   </div>

</div>
        

      </div>


  )



}

export default MoodPage