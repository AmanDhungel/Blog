'use client'
import Link from 'next/link'
import '../globals.css'
import Logout from './Logout'
import { usePathname, useRouter } from 'next/navigation'


const Navbar = ({value} : any) => {

  const pathname = usePathname();
  console.log(pathname);


  return (
    <div className='flex text-xl tracking-wider justify-end gap-4 mr-5 mt-3 p-3'>
      {
        value &&
        value.value ? 
        <>
        <Link href='/blogs' className={`${pathname == '/blogs' ? 'text-amber-600 underline underline-offset-8' :''} hover:underline hover:underline-offset-8 hover:scale-[1.03] hover:animate-pulse hover:transition-all`}>Blogs</Link>
        <Link href='/user/myBlogs' className={`${pathname == '/user/myBlogs' ? 'text-amber-600 underline underline-offset-8' :''} hover:underline hover:underline-offset-8 hover:scale-[1.03] hover:animate-pulse hover:transition-all`}>MyBlogs</Link>
        <Link href='/user/addBlog' className={`${pathname == '/user/addBlog' ? 'text-amber-600 underline underline-offset-8' :''} hover:underline hover:underline-offset-8 hover:scale-[1.03] hover:animate-pulse hover:transition-all`}>AddBlog</Link>
        <Logout/>
        </>
        :
        (
          <>
          <Link href='/login' className={`${pathname == '/login' ? 'text-amber-600 underline underline-offset-8' :''} hover:underline hover:underline-offset-8 hover:scale-[1.03] hover:animate-pulse hover:transition-all`}>Login</Link>
          <Link href='/signup' className={`${pathname == '/signup' ? 'text-amber-600 underline underline-offset-8' :''} hover:underline hover:underline-offset-8 hover:scale-[1.03] hover:animate-pulse hover:transition-all`}>Singup</Link>
          <Link href='/blogs' className={`${pathname == '/blogs' ? 'text-amber-600 underline underline-offset-8' :''} hover:underline hover:underline-offset-8 hover:scale-[1.03] hover:animate-pulse hover:transition-all`}>Blogs</Link>
          </>
        )
      }
    </div>
  )
}

export default Navbar