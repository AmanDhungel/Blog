'use client'; 
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

interface LoginData{
  email: string;
  password: string;
}

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>('');
  const [password, setPassword] = useState<string | null>('');

  const handleLogin = async () => {
    if(email == '' || password == ''){
     return toast.error('Please fill in all fields');
    }

    if(!email?.includes('@')){
      return toast.error('Please enter a valid email');
    }
     const response : AxiosResponse<LoginData> = await axios.post<LoginData>('/api/login', {email: email, password: password});   
     toast.success("You are logged in")
     router.push('/user/myBlogs'); 
     router.refresh();
  };

const enterOnPassword = (e : {key: string}) => {
  if(e.key === 'Enter'){
    onSubmit ();
    }
}

const mutation = useMutation({
  mutationFn: handleLogin
})

const {isPending, isSuccess, error} =mutation;

const onSubmit = async () => {
  mutation.mutate();
}


console.log(isPending, isSuccess, error)

  return (
    <div className="flex flex-col m-auto items-center h-[90vh] gap-2 justify-center">
      <h1 className="text-4xl text-bold tracking-wider font-bold mb-10">Login</h1>
      <input
        type="email"
        placeholder="Enter Your Email"
        id="email"
        onChange={(e) => setEmail(e.target.value)}
        name="email"
        className="p-3 bg-slate-900 rounded text-white"
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
        onClick={onSubmit}
        disabled={isPending}
      >
      {isPending? 'logging In' :  'Login'}
      </button>
      {error ? <p className='text-red-500 mt-5'>{error.response.data.message}</p> : ''}
    </div>
  );
}


export default LoginPage;


