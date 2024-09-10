'use client'; 
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
    if(email == '' || password == ''){
     return toast.error('Please fill in all fields');
    }
     const response = await axios.post('/api/login', {email: email, password: password});   
     toast.success("You are logged in")
     window.location.href = '/user/myBlogs'; 
    } catch (error : any) {
      toast.error(error.response.data.message)
    }
  };

const enterOnPassword = (e : any) => {
  if(e.key === 'Enter'){
    handleLogin();
    }
}


  return (
    <div className="flex flex-col m-auto items-center h-[90vh] gap-2 justify-center">
      <h1 className="text-4xl text-bold tracking-wider font-bold mb-10">Login</h1>
      <input
        type="email"
        placeholder="Enter Your Email"
        id="email"
        onChange={(e) => setEmail(e.target.value)}
        name="email"
        className="p-3 bg-slate-900 rounded"
        onKeyDown={enterOnPassword}
      />
      <input
        type="password"
        placeholder="Enter Your Password"
        id="password"
        onChange={(e) => setPassword(e.target.value)}
        name="password"
        className="p-3 bg-slate-900 rounded"
        onKeyDown={enterOnPassword}
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 p-3 text-white font-bold py-2 px-4 rounded"
        type="submit"
        onClick={handleLogin}
      >
        Login
      </button>
      
    </div>
  );
}


export default LoginPage;


