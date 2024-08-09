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


const router=createBrowserRouter(createRoutesFromElements(

<Route path="/" element={<App/>}>

<Route path="signup" element={<SignUp/>}/>
<Route path="login" element={<Login/>}/>

<Route path="home" element={<MiddleIntro/>}/>

<Route path="/testPHQ9" element={<AssessmentPage/>}/>


</Route>

))
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store ={store}>

    <RouterProvider router={router}></RouterProvider>

    </Provider>
    
  </React.StrictMode>
)
