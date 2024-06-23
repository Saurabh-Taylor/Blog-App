import { useEffect, useState } from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import authService from "./appwrite/auth.service";

import {  login , logout } from "./store/authSlice";

import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from 'react-router-dom';


function App() {

  const [loading, setLoading] = useState(true)

  const dispatch = useDispatch()

  useEffect(() => {

    authService.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login({userData}))
      }else{
        dispatch(logout())
      }
    }).catch((err)=> console.log("error at useEffect at::" ,  err))
    .finally(()=> setLoading(false))
  }, [])
  
  if(loading){
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-red-500 flex flex-wrap content-between  "> 
      <div className='w-full  block' >
        <Header/>
        {/* <main> <Outlet/> </main> */}
        <Footer/>
      </div> 
    </div>
    )
}

export default App
