import React, { useEffect } from 'react'
import {  useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuth';

interface props{
    children:React.ReactNode
}
const Auth = ({children}:props) => {

    const {userId,token}=useAuthStore();
const navigate=useNavigate()
    useEffect(()=>{
  if(!userId||!token){
navigate("/login")
  }
    },[token,userId])


   
  return (
    <>
    {userId&&token&&children}
    </>
  )
}

export default Auth;