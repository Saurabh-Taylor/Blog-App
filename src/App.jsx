import { useEffect, useState } from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import authService from "./appwrite/auth.service";
import {  login , logout } from "./store/authSlice";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { BrowserRouter, Outlet } from 'react-router-dom';
import Loader from './components/Loader';



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
    return <div>
      <Loader/>
    </div>
  }

  return (
    <div className="min-h-screen flex flex-wrap content-between"> 
      <div className='w-full  block' >
        <Header/>
        <main> <Outlet/> </main>
        <Footer/>
      </div> 
    </div>
    )
}

export default App
