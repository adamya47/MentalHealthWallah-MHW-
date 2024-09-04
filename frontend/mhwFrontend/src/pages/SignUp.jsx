import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from "axios"
import {useDispatch} from 'react-redux'
import { login } from '../store/userSlice.js'
import { useNavigate } from 'react-router-dom'

function SignUp() {

const dispatch=useDispatch();
const{register,handleSubmit,formState:{errors}}=useForm();
const [fault,setFault]=useState("")
const[loading,setLoading]=useState(false)
const[visible,setVisible]=useState(false)
const navigate=useNavigate()

const signUpFunc=async(data)=>{
    try {
        setLoading(true)
        setFault("")
        const user= await axios.post(`https://mhw-backend.vercel.app/api/v1/users/register`,data,{withCredentials:true})

         if(user){
            const userData=await axios.get(`https://mhw-backend.vercel.app/api/v1/users/currentUser`,{withCredentials:true})
            if(userData){
            dispatch(login(userData.data))
          
        navigate("/home")
            setLoading(false)
         }
         }

    } catch (error) {
        setLoading(false)
        if(error && error.response && error.response.data && error.response.data.message){
          setFault(error.response.data.message)
        }else{
          setFault(error.message)
        }
        
        console.log(error)
      }

}

  return loading?(<div className="flex justify-center items-center min-h-screen">
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin"></div>
      <p className="text-blue-500 mt-4 text-lg">Loading...</p>
    </div>
  </div>)
  :
   (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
  <div className="mx-auto max-w-lg">
    <h1 className="text-center text-2xl font-bold text-teal-600 sm:text-3xl">Get started today</h1>

    <p className='text-center text-lg '>Already have an account?<span className='text-lg  text-teal-600 hover:underline hover:cursor-pointer ' onClick={()=>navigate("/login")}>Click here</span></p>

    
    

    <form onSubmit={handleSubmit(signUpFunc)} className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">

      <p className="text-center text-lg font-medium">Create your account</p>

      <div>
        <label htmlFor="username" className="sr-only">Username</label>

        <div className="relative">
          <input
            type="text"
            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            placeholder="Enter username"
            {...register("username",{required:"Username is required"})}
          />

         {errors.username && (<p className='text-red-500'>{errors.username.message}</p>)}
        </div>
      </div>

      <div>
        <label htmlFor="password" className="sr-only">Password</label>

        <div className="relative">
          <input
            type={visible?"text":"password"}
            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            placeholder="Enter password"
            {...register("password",{required:"Password is required"})}
          />
                   {errors.password && (<p className='text-red-500'>{errors.password.message}</p>)}


<span className="absolute inset-y-0 end-0 grid place-content-center px-4 hover:cursor-pointer"
  onClick={()=>setVisible(prev=>!prev)}
 >
            <svg 
              xmlns="http://www.w3.org/2000/svg"
              className="size-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </span>
        </div>
      </div>

      <button
        type="submit"
        className="block w-full rounded-lg bg-teal-600 px-5 py-3 text-sm font-medium text-white"
      >
        Sign in
      </button>
{fault && (<p className='text-red-500'>{fault}</p>)}
      
    </form>
  </div>
</div>
  )
}

export default SignUp