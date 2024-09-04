import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { store } from './store/store.js'
import { Provider } from 'react-redux'
import { createBrowserRouter, createRoutesFromElements, RouterProvider,Route } from 'react-router-dom'
import MiddleIntro from './components/MiddleIntro.jsx'
import AssessmentPage from './pages/AssessmentPage.jsx'
import SignUp from './pages/SignUp.jsx'
import Login from './pages/Login.jsx'
import Intro from './pages/Intro.jsx'
import MoodPage from './pages/MoodPage.jsx'
import BreathingExercise from './components/BreathingExercise.jsx'


const router=createBrowserRouter(createRoutesFromElements(

<Route path="/" element={<App/>}>
<Route path="mhw" element={<Intro/>}/>
<Route path="signup" element={<SignUp/>}/>
<Route path="login" element={<Login/>}/>

<Route path="home" element={<MiddleIntro/>}/>

<Route path="testPHQ9" element={<AssessmentPage/>}/>
<Route path="moodTracker" element={<MoodPage/>}/>
<Route path="pauseAndReflect" element={<BreathingExercise/>}/>
<Route path="*" element={<h1>NO SUCH URL EXISTS DEAR :X ;D</h1>}/>
</Route>

))
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store ={store}>

    <RouterProvider router={router}></RouterProvider>

    </Provider>
    
  </React.StrictMode>
)
