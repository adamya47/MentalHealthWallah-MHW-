import React from 'react'
import axios from 'axios'
import {  useForm } from 'react-hook-form'





function AssessmentPage() {


 const{handleSubmit,register,formState:{errors}}=useForm();

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
  <form>
 
 <div className='flex flex-col items-center bg-gray-100'>
 
 {
    questions.map((question,index)=>{

       return (
        <div key={index} className="bg-gray-200 h-70 w-96 m-4 border rounded-2xl flex-wrap">

       <div className='flex flex-col '>

     <p className='text-xl font-serif'>Q.  {question.question}</p>
     {
       question.options.map((option,optionIndex)=>{

            return (
                <label key={optionIndex} className='mt-1 text-sm text-black text-2xl font-semibold hover:cursor-pointer'>
         
         <input type='radio'  value={optionIndex-1} name={index} {...register(`${index}`,{required:true} )} ></input>
         <span>{option}</span>
         
                </label>

            )


        })

    }
       </div>
       </div>

        )


    })
 }


 </div>
 


  </form>
  )
}

export default AssessmentPage