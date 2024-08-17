import React, { useState } from 'react'
import axios from 'axios'
import {  useForm } from 'react-hook-form'
import ResultPopUp from '../components/ResultPopUp';
import { useNavigate } from 'react-router-dom';
import DoughNutGraph from '../components/Graph Doughnut/DoughNutGraph';





function AssessmentPage() {

const navigate=useNavigate();
 const{handleSubmit,register,formState:{errors}}=useForm();

 const[result,setresult]=useState("");
const[recommendation,setrecommendation]=useState("");;
const[onlineSource,setonlineSource] =useState("");

const[PopUp,setPopUp]=useState(false)



 const onSub=async(data)=>{
 console.log(data);
//data is an obj

let ans=0;

Object.keys(data).forEach(key=>ans += data[key]-0);
console.log(ans);



if(ans>=0 && ans <=4){
    setresult(`You scored ${ans} i.e between 0 and 4, indicating minimal or no depression`)
    setrecommendation("It’s great that you’re feeling well! Continue to maintain a healthy lifestyle and monitor your mood")
    setonlineSource("https://www.nhs.uk/mental-health/self-help/guides-tools-and-activities/five-steps-to-mental-wellbeing/")
}
else if(ans>=5 && ans <=9){
    setresult(`You scored ${ans} i.e between 5 and 9, indicating mild depression`);
    setrecommendation("Mild depression can often be managed with lifestyle changes and self-care.Consider increasing physical activity, improving sleep habits, and engaging in social activities");
    setonlineSource("https://www.headspace.com/");
}
else if(ans>=10 && ans <=14){
    setresult(`You scored ${ans} i.e between 10 and 14, indicating moderate depression.`)
    setrecommendation("Moderate depression might benefit from structured interventions like therapy or guided self-help.Consider online therapy or self-help programs, and make an appointment with a healthcare provider to discuss your symptoms.");
    setonlineSource("https://www.betterhelp.com/");
}
else if(ans>=15 && ans <=19){
    setresult(`You scored ${ans} i.e between 15 and 19, indicating moderately severe depression.`)
    setrecommendation("It’s important to seek professional help. A combination of medication and therapy is often recommended for moderately severe depression.");
    setonlineSource("https://www.talkspace.com/");
}
else{
    setresult(`You scored ${ans} i.e between 20 and 27, indicating severe depression.`);
    setrecommendation("Immediate help is crucial. Severe depression requires prompt intervention from mental health professionals.Reach out to a mental health specialist or healthcare provider immediately. If you are in crisis, seek emergency assistance.");
    setonlineSource("https://www.crisistextline.org/");
}
setPopUp(true)

console.log(result,recommendation,onlineSource)


 }

const questions=[
    {
        question:"Little interest or pleasure in doing things",
        options:["Not at all","Several days","More than half the days","Nearly every day"]

    
    },
    {
        question:"Feeling down, depressed, or hopeless",
        options:["Not at all","Several days","More than half the days","Nearly every day"],
    
    },
    {
        question:"Trouble falling or staying asleep, or sleeping too much",
        options:["Not at all","Several days","More than half the days","Nearly every day"],
    
    },
    {
        question:"Feeling tired or having little energy",
        options:["Not at all","Several days","More than half the days","Nearly every day"],
    
    },
    {
        question:"Poor appetite or overeating",
        options:["Not at all","Several days","More than half the days","Nearly every day"],
    
    },
    {
        question:"Feeling bad about yourself or that you are a failure or have let yourself or your family down",
        options:["Not at all","Several days","More than half the days","Nearly every day"],
    
    },
    {
        question:"Trouble concentrating on things, such as reading the newspaper or watching television",
        options:["Not at all","Several days","More than half the days","Nearly every day"],
    
    },
    {
        question:"Moving or speaking so slowly that other people could have noticed. Or the opposite being so figety or restless that you have been moving around a lot more than usual",
        options:["Not at all","Several days","More than half the days","Nearly every day"],
    
    },
    {
        question:"Thoughts that you would be better off dead, or of hurting yourself",
        options:["Not at all","Several days","More than half the days","Nearly every day"],
    
    },




]






  return (
    <>

  <form onSubmit={handleSubmit(onSub)}> 
 


 <div className='flex flex-col items-center bg-gray-100'>
    <h1 className='text-3xl sm:text-4xl font-light text-gray-800 underline'>Depression Severity Assessment (PHQ-9)</h1>
    <div className='h-72 w-48'>
 <DoughNutGraph/>
 </div>
 <p className='text-2xl  font-light text-gray-800'>
 Over the last 2 weeks, how often have you been
bothered by any of the following problems?</p>


 
 {
    questions.map((question,index)=>{

       return (
        <div key={index} className="bg-gray-200 h-70 w-96 m-4 border rounded-2xl flex-wrap">

       <div className='flex flex-col '>

     <p className='text-xl font-light text-black'>Q.  {question.question}</p>
     {
       question.options.map((option,optionIndex)=>{

            return (
                <label key={optionIndex} className='mt-1 text-sm text-black text-2xl font-semibold hover:cursor-pointer'>
         
         <input type='radio'  value={optionIndex} name={index} {...register(`${index}`,{required:"Please fill"} )} ></input>
         <span>{option}</span>
         
                </label>

            )


        })

    }
     
       </div>

      

       {errors[index] && <p className='text-red-500'>{errors[index].message}</p>}


       </div>

        )



    })
 }



<ResultPopUp show={PopUp} recc={recommendation} result={result} website={onlineSource} />

<button type='submit'
  className="group flex items-center justify-between gap-4 rounded-lg border border-current px-3 py-1 text-white-600 transition-colors hover:bg-gray-600 focus:outline-none focus:ring active:bg-indigo-500"
>
  <span className="font-medium transition-colors group-hover:text-white"> Get Results </span>

  <span
    className="shrink-0 rounded-full border border-gray-600 bg-white p-2 group-active:border-gray-500"
  >
    <svg
      className="size-5 rtl:rotate-180"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M17 8l4 4m0 0l-4 4m4-4H3"
      />
    </svg>
  </span>
</button>
 </div>
 


  </form>
  </>
  )
}

export default AssessmentPage