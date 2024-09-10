'use client'
import axios from 'axios'
import React from 'react'
import { toast, ToastContainer } from 'react-toastify';

const Logout = () => {      
  async function handleLogout(){
    try {
      const logout = await axios.post('/api/logout');
      toast.success('logged Out Successfully')
      window.location.href = '/login';
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
    <button onClick={handleLogout}>Logout</button>
    </>
  )
}

export default Logout