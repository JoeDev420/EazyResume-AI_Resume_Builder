import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './pages/Layout'
import Dashboard from './pages/Dashboard'
import ResumeBuilder from './pages/ResumeBuilder'
import Preview from './pages/Preview'
import Login from './pages/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Premium from './pages/Premium'
import NotFound from './pages/NotFound'
import { ToastContainer } from "react-toastify";
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import Resumes from './pages/Resumes'


const App = () => {

  return (
    <div >
    
    <Routes>


      <Route path='/' element={<Home/>} />

      <Route path='app' element={<ProtectedRoute><Layout/></ProtectedRoute>}>

      <Route index element={<Dashboard/>}/>
      
      <Route path='builder/:resumeId' element={<ResumeBuilder/>}/>

      </Route>

      <Route path='resumes' element={<Resumes/>}/>

      <Route path='view/:resumeSlug' element={<Preview/>}/>
      
      <Route path='login' element={<Login/>}/>

      <Route path='Premium' element={<Premium/>}/>

      <Route path='forgot-password' element={<ForgotPassword/>}/>


      <Route path='reset-password' element={<ResetPassword/>}/>

      <Route path='*' element={<NotFound/>}/>


    </Routes>

    <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
      />

    </div>
  )
}

export default App