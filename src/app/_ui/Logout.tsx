'use client'
import axios from 'axios'
import { useRouter } from 'next/navigation';
import React from 'react'
import { toast, ToastContainer } from 'react-toastify';

const Logout = () => {      
  const router = useRouter();
  async function handleLogout(){
    try {
      const logout = await axios.post('/api/logout');
      router.push('/login');
      router.refresh();
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