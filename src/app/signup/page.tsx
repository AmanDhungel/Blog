'use client'
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";

type Inputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Page = () => {
const router = useRouter();
  const [inputs, setInputs] = useState<Inputs>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
})


const handleSignup = async() => {
    const {name, email, password} = inputs;
    if(!name || !email || !password){
      return toast.error('Please fill all the fields');
    }
if(inputs.password !== inputs.confirmPassword){
   return toast.error('confirm Passwords do not match with the Password');
}
const data : AxiosResponse<Inputs> = await axios.post<Inputs>('/api/signup', {name, email, password})

console.log(data)
toast.success('User successfully Created');
router.push('/login');
}

  return (
    <div className='flex flex-col m-auto items-center h-[90vh] gap-2 justify-center'>
        <h1 className='text-4xl text-bold tracking-wider font-bold mb-10'>Sign Up</h1>
               <input type="email" name='email' id='email' placeholder='Email' onChange={(e) => setInputs((prev) => ({ ...prev, email: e.target.value }))}   className='p-3 bg-slate-900 rounded'/>
               <input type="text" name='name' id='name' placeholder='Username'  onChange={(e) => setInputs((prev) => ({ ...prev, name: e.target.value }))}  className='p-3 bg-slate-900 rounded'/>
               <input type="password" name='password' id='password' placeholder='Password'  onChange={(e) => setInputs((prev) => ({ ...prev, password: e.target.value }))}  className='p-3 bg-slate-900 rounded'/>
               <input type="password" name='cPassword' id='cPassword'  onChange={(e) => setInputs((prev) => ({ ...prev, confirmPassword: e.target.value }))}  className='p-3 bg-slate-900 rounded' placeholder='Confirm Password'/>
            <button className="bg-blue-500 hover:bg-blue-700 p-3 text-white font-bold py-
            2 px-4 rounded" onClick={handleSignup}>Sign Up</button>
    </div>
  )
}

export default Page

