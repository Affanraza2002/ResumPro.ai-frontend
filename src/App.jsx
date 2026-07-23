import React, { useEffect } from 'react'
import {  Route, Routes } from 'react-router-dom'
import Home from './pages/Home'  
import Layout from './pages/Layout'
import Dashboard from './pages/Dashboard';
import ResumeBuilder from './pages/ResumeBuilder';
import Preview from './pages/Preview';
import Login from './pages/Login';
import { useDispatch } from 'react-redux';
import api from './configs/api.js';
import { login,setLoading } from './app/features/authSlice.js';
import { Toaster } from 'react-hot-toast';


const App = () => {


  const dispatch = useDispatch();

  const getUserData = async () =>{
    const token = localStorage.getItem('token');
    try {
      if(token){
        const {data} = await api.get('/users/data',{headers:{
          Authorization:token}
        
        })
        if(data.user){
          dispatch(login({token,user:data.user})) ;
        }
        dispatch(setLoading(false))
      }else{
        dispatch(setLoading(false))
        
      }
    } catch (error) {
      dispatch(setLoading(false))
      console.log(error.message)

    }
  }

useEffect(()=>{
   getUserData();
},[])


  return (
 <>
 <Toaster
   position="top-right"
   toastOptions={{
     duration: 4000,
     style: {
       fontSize: '14px',
       fontWeight: '500',
       padding: '14px 18px',
       minWidth: '300px',
       borderRadius: '14px',
       boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
     },
     success: {
       style: {
         background: '#f0fdf4',
         color: '#166534',
         border: '1px solid #bbf7d0',
       },
       iconTheme: { primary: '#16a34a', secondary: '#dcfce7' },
     },
     error: {
       style: {
         background: '#fef2f2',
         color: '#991b1b',
         border: '1px solid #fecaca',
       },
       iconTheme: { primary: '#dc2626', secondary: '#fee2e2' },
     },
   }}
 />
  <Routes>
 <Route path='/' element={<Home/>}/>
 <Route path='app' element={<Layout/> } >
   <Route index element={<Dashboard/>}/>
    <Route path='builder/:resumeId' element={<ResumeBuilder/>}/>
 </Route>
 <Route path='view/:resumeId' element={<Preview/>}/>


  </Routes>
 </>
  )
}

export default App