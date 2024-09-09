'use client'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React from 'react'

const Hero = () => {
    useGSAP(() => {
      gsap.to('#h1', {
        x:0,
        opacity: 1
      })
    }, [])
  return (
    <div>
 <h1 id='h1' className="text-4xl bg-clip-text bg-gradient-to-r text-transparent from-emerald-600 to-emerald-400 font-extrabold opacity-0 -translate-x-[10rem]">Welcome <span className="text-white">To the Blog App</span></h1>
    <span id='h1' className="absolute mx-auto flex border w-fit bg-gradient-to-r top-[9rem] blur-xl from-emerald-600 to-emerald-400 opacity-0 -translate-x-[10rem]  bg-clip-text text-4xl box-content font-extrabold text-transparent text-center select-none">
    Welcome To the Blog App
  </span>
    </div>
  )
}

export default Hero