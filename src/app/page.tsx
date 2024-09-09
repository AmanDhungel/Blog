import Hero from './_ui/Hero'
import Toastify from '../app/_ui/Toastify.jsx'
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     <Hero/>
     <Toastify/>
    </main>
  );
}
