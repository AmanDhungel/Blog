import Link from 'next/link'
import '../globals.css'
import { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import Logout from './Logout'

const Navbar = (req: NextRequest) => {
  const value = cookies().get('token')!;
  

  return (
    <div className='flex text-xl tracking-wider justify-end gap-4 mr-5 mt-3'>
      {
        value &&
        value.value ? 
        <>
        <Link href='/blogs'>Blogs</Link>
        <Link href='/user/myBlogs'>MyBlogs</Link>
        <Link href='/user/addBlog'>AddBlog</Link>
        <Logout/>
        </>
        :
        (
          <>
          <Link href='/login'>Login</Link>
          <Link href='/signup'>Singup</Link>
          <Link href='/blogs'>Blogs</Link>
          </>
        )
      }
    </div>
  )
}

export default Navbar