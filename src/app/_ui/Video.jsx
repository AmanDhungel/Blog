import React from 'react'
import hero from '../../../public/assest/hero2.mp4'

const Video = () => {
  return (
    <video width="320" muted loop playsInline autoPlay height="240">
    <source src={hero} type="video/mp4"/>
  </video>
  )
}

export default Video