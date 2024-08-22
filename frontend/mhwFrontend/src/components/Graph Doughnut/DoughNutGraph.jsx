import React from 'react'
import { Doughnut } from 'react-chartjs-2';
import{Chart as ChartJS,Tooltip,Legend,ArcElement } from "chart.js"

function DoughNutGraph({dataFromUser}) {
  //ref notes


ChartJS.register(Tooltip,Legend,ArcElement)

const chartData={

 labels:["Happy","Sad","Neutral"],

 datasets:[
{
    data:dataFromUser,
    label:"Frequency",
    hoverOffset:4,
    backgroundColor:[
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)'
    ]
},


 ]


}

const chartOptions={
  responsive:true,//to change size of graph according to window size
  
  plugins:{

   legend:{
    display:true,
    position:"top",
    labels:{
      color:"white"
     }

   },
  
     
  }
   
  

//tooltip:by default is enabled
  }









  return (
    <Doughnut data={chartData} options={chartOptions}/>
  )
}

export default DoughNutGraph