'use client'
import axios from 'axios'
import { usePathname, useRouter } from 'next/navigation';
import React from 'react'

const Logout = () => {      
  const router = useRouter();
  const pathname = usePathname();
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
    <button className={`hover:underline hover:underline-offset-8 hover:scale-[1.03] hover:animate-pulse hover:transition-all hover:delay-300`} onClick={handleLogout}>Logout</button>
    </>
  )
}

export default Logout